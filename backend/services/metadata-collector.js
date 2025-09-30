import { networkInterfaces, cpus, totalmem, freemem } from 'os';
import dns from 'dns';
import { promisify } from 'util';
import { createHash } from 'crypto';
import whois from 'whois-json';
import axios from 'axios';

// Importaciones dinámicas con manejo de errores
let geoip, useragentParser, fileType;

try {
    const geoipModule = await import('geoip-lite');
    geoip = geoipModule.default;
} catch (error) {
    console.warn('⚠️ geoip-lite no está disponible:', error.message);
    geoip = { lookup: () => null };
}

try {
    const useragentModule = await import('express-useragent');
    useragentParser = new useragentModule.default.UserAgent();
} catch (error) {
    console.warn('⚠️ express-useragent no está disponible:', error.message);
    useragentParser = {
        parse: () => ({
            browser: 'unknown',
            version: 'unknown',
            os: 'unknown',
            platform: 'unknown',
            source: 'unknown'
        })
    };
}

try {
    const fileTypeModule = await import('file-type');
    fileType = fileTypeModule;
} catch (error) {
    console.warn('⚠️ file-type no está disponible:', error.message);
    fileType = { fileTypeFromBuffer: () => null };
}

const lookupDns = promisify(dns.lookup);
const reverseDns = promisify(dns.reverse);

class MetadataCollector {
    constructor(req) {
        this.req = req;
    }

    static async resolveHost(host) {
        try {
            const { address } = await lookupDns(host);
            return address;
        } catch (error) {
            console.warn(`⚠️ Error resolviendo host ${host}:`, error.message);
            return null;
        }
    }

    static async getAsnInfo(ip) {
        try {
            const response = await axios.get(`https://ipapi.co/${ip}/json/`);
            const { asn, org } = response.data;
            return { asn, organization: org };
        } catch (error) {
            console.warn(`⚠️ Error obteniendo información ASN para ${ip}:`, error.message);
            return null;
        }
    }

    static async getWhoisInfo(domain) {
        try {
            const whoisData = await whois(domain);
            return {
                registrar: whoisData.registrar,
                creationDate: whoisData.creationDate,
                expirationDate: whoisData.expirationDate,
                nameServers: whoisData.nameServers,
                status: whoisData.status
            };
        } catch (error) {
            console.warn(`⚠️ Error obteniendo WHOIS para ${domain}:`, error.message);
            return null;
        }
    }

    static async checkCdnWaf(host) {
        try {
            const response = await axios.head(`https://${host}`);
            const headers = response.headers;

            const cdnSignatures = {
                'cloudflare': ['cf-ray', 'cf-cache-status'],
                'akamai': ['x-akamai-transformed'],
                'fastly': ['fastly-io-info'],
                'cloudfront': ['x-amz-cf-id'],
                'sucuri': ['x-sucuri-id'],
                'incapsula': ['x-iinfo'],
            };

            const wafSignatures = {
                'cloudflare': ['cf-waf'],
                'sucuri': ['x-sucuri-waf'],
                'akamai': ['akamai-waf'],
                'incapsula': ['incap_ses'],
                'f5': ['x-f5-id'],
                'fortiweb': ['fortiwafsid'],
            };

            const protections = {
                cdn: Object.entries(cdnSignatures)
                    .filter(([cdn, sigs]) => sigs.some(sig => sig in headers))
                    .map(([cdn]) => cdn),
                waf: Object.entries(wafSignatures)
                    .filter(([waf, sigs]) => sigs.some(sig => sig in headers))
                    .map(([waf]) => waf)
            };

            return protections;
        } catch (error) {
            console.warn(`⚠️ Error verificando CDN/WAF para ${host}:`, error.message);
            return { cdn: [], waf: [] };
        }
    }

    async collectAllMetadata() {
        const networkInfo = await this.collectNetworkMetadata();
        const clientInfo = await this.collectClientMetadata();
        const technicalInfo = await this.collectTechnicalMetadata();
        const securityInfo = await this.collectSecurityMetadata();
        const hardwareInfo = await this.collectHardwareMetadata();

        return {
            // Flattened metadata structure
            ip: networkInfo?.ip?.address,
            city: networkInfo?.geo?.city,
            country: networkInfo?.geo?.country || 'ES',
            browser: `${clientInfo?.browser?.name || ''} ${clientInfo?.browser?.version || ''}`.trim(),
            os: `${clientInfo?.os?.name || ''} ${clientInfo?.os?.version || ''}`.trim(),
            device: clientInfo?.device?.type || technicalInfo?.platform,
            platform: technicalInfo?.platform,
            screen: technicalInfo?.screen,
            headers: technicalInfo?.headers,
            connection: networkInfo?.connection,
            performance: technicalInfo?.performance,
            security: {
                encryption: securityInfo?.connection?.encrypted,
                protocol: securityInfo?.connection?.protocol,
                suspicious_headers: this.checkSuspiciousHeaders()
            },

            // Original metadata structure for compatibility
            network_metadata: networkInfo,
            client_metadata: clientInfo,
            technical_metadata: technicalInfo,
            security_metadata: securityInfo,
            hardware_metadata: hardwareInfo
        };
    }

    async collectClientMetadata() {
        let ua;
        try {
            ua = useragentParser.parse(this.req.headers['user-agent'] || '');
        } catch (error) {
            console.warn('⚠️ Error al parsear user-agent:', error.message);
            ua = {
                browser: 'unknown',
                version: 'unknown',
                os: 'unknown',
                platform: 'unknown',
                isBot: false
            };
        }

        return {
            browser: {
                name: ua.browser || 'unknown',
                version: ua.version || 'unknown',
                isBot: !!ua.isBot,
                platform: ua.platform || 'unknown',
                engine: ua.engine || 'unknown'
            },
            os: {
                name: ua.os || 'unknown',
                version: ua.osVersion || 'unknown'
            },
            device: {
                type: ua.isMobile ? 'mobile' : ua.isTablet ? 'tablet' : 'desktop',
                brand: ua.platform,
                isMobile: ua.isMobile,
                isTablet: ua.isTablet
            },
            language: this.req.headers['accept-language'],
            timezone: this.req.headers['x-timezone'] || 'unknown',
            screen: {
                width: this.req.headers['x-screen-width'],
                height: this.req.headers['x-screen-height'],
                colorDepth: this.req.headers['x-screen-depth']
            }
        };
    }

    async collectTechnicalMetadata() {
        const clientIp = this.getClientIp();
        return {
            request: {
                method: this.req.method,
                url: this.req.url,
                protocol: this.req.protocol,
                host: this.req.get('host'),
                path: this.req.path,
                query: this.req.query,
                timestamp: new Date().toISOString()
            },
            headers: this.sanitizeHeaders(this.req.headers),
            performance: {
                serverTimestamp: Date.now(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                nodeVersion: process.version,
                processUptime: process.uptime()
            }
        };
    }

    async collectSecurityMetadata() {
        const clientIp = this.getClientIp();
        const xForwardedProto = this.req.get('x-forwarded-proto');

        return {
            connection: {
                encrypted: this.req.secure || xForwardedProto === 'https',
                cipher: this.req.get('ssl_cipher'),
                protocol: xForwardedProto || this.req.protocol,
                tlsVersion: this.req.get('ssl_protocol'),
                headers: {
                    'x-forwarded-proto': xForwardedProto,
                    'x-forwarded-ssl': this.req.get('x-forwarded-ssl'),
                    'x-forwarded-port': this.req.get('x-forwarded-port')
                }
            },
            authentication: {
                hasAuth: !!this.req.get('authorization'),
                authType: this.getAuthType(),
                tokenHash: this.getTokenHash()
            },
            headers: {
                cors: {
                    origin: this.req.get('origin'),
                    method: this.req.get('access-control-request-method'),
                    headers: this.req.get('access-control-request-headers')
                },
                security: {
                    contentSecurityPolicy: this.req.get('content-security-policy'),
                    xssProtection: this.req.get('x-xss-protection'),
                    frameOptions: this.req.get('x-frame-options')
                }
            },
            riskAssessment: {
                isKnownProxy: this.isKnownProxy(clientIp),
                isTorExit: this.isTorExit(clientIp),
                suspiciousHeaders: this.checkSuspiciousHeaders()
            }
        };
    }

    async collectNetworkMetadata() {
        const clientIp = this.getClientIp();
        let geoData = {};

        try {
            geoData = geoip.lookup?.(clientIp) || {};
        } catch (error) {
            console.warn('⚠️ Error al obtener datos de geolocalización:', error.message);
        }

        return {
            ip: {
                address: clientIp,
                forwarded: this.req.get('x-forwarded-for'),
                real: this.req.connection.remoteAddress
            },
            geo: geoData ? {
                country: geoData.country,
                region: geoData.region,
                city: geoData.city,
                ll: geoData.ll,
                timezone: geoData.timezone,
                range: geoData.range
            } : null,
            dns: {
                hostname: await this.getDnsInfo(clientIp),
                reverse: await this.getReverseDns(clientIp)
            },
            connection: {
                type: this.req.get('connection-type'),
                effectiveType: this.req.get('x-connection-type'),
                downlink: this.req.get('x-connection-speed'),
                rtt: this.req.get('x-connection-rtt')
            }
        };
    }

    async collectHardwareMetadata() {
        let serverInfo = {};
        try {
            serverInfo = {
                arch: process.arch,
                platform: process.platform,
                cores: cpus().length,
                memory: {
                    total: totalmem(),
                    free: freemem()
                },
                load: process.cpuUsage()
            };
        } catch (error) {
            console.warn('⚠️ Error al obtener datos del servidor:', error.message);
            serverInfo = {
                arch: 'unknown',
                platform: 'unknown',
                cores: 0,
                memory: { total: 0, free: 0 },
                load: { user: 0, system: 0 }
            };
        }

        return {
            client: {
                cores: this.req.get('x-device-cores'),
                memory: this.req.get('x-device-memory'),
                gpu: this.req.get('x-device-gpu'),
                platform: this.req.get('x-device-platform')
            },
            server: serverInfo
        };
    }

    // Utility methods
    getClientIp() {
        return this.req.get('x-forwarded-for')?.split(',')[0] ||
            this.req.connection.remoteAddress;
    }

    sanitizeHeaders(headers) {
        const sanitized = { ...headers };
        // Remove sensitive headers
        delete sanitized.authorization;
        delete sanitized.cookie;
        return sanitized;
    }

    getAuthType() {
        const auth = this.req.get('authorization') || '';
        if (auth.startsWith('Bearer ')) return 'Bearer';
        if (auth.startsWith('Basic ')) return 'Basic';
        return 'None';
    }

    getTokenHash() {
        const token = this.req.get('x-emergency-token');
        if (!token) return null;
        return createHash('sha256').update(token).digest('hex');
    }

    isKnownProxy(ip) {
        // Implementar lógica de detección de proxies conocidos
        return false;
    }

    isTorExit(ip) {
        // Implementar lógica de detección de nodos de salida Tor
        return false;
    }

    checkSuspiciousHeaders() {
        const suspicious = [];
        const headers = this.req.headers;

        if (headers['via'] || headers['x-forwarded-for']) {
            suspicious.push('proxy_headers');
        }
        if (headers['x-requested-with'] !== 'XMLHttpRequest') {
            suspicious.push('non_ajax');
        }
        return suspicious;
    }

    static async scanServices(host) {
        try {
            const response = await axios.get(`https://${host}`);
            const headers = response.headers;
            const services = [];

            // Detectar servicios web comunes
            if (headers.server) services.push(`Web: ${headers.server}`);
            if (headers['x-powered-by']) services.push(`Powered by: ${headers['x-powered-by']}`);

            // Verificar puertos comunes
            const commonPorts = [80, 443, 8080, 8443];
            const portScans = await Promise.all(commonPorts.map(async port => {
                try {
                    await axios.get(`http${port === 443 || port === 8443 ? 's' : ''}://${host}:${port}`, {
                        timeout: 2000
                    });
                    return `Port ${port}: open`;
                } catch (e) {
                    return null;
                }
            }));

            return [...services, ...portScans.filter(Boolean)];
        } catch (error) {
            console.warn(`⚠️ Error escaneando servicios para ${host}:`, error.message);
            return [];
        }
    }

    async getDnsInfo(ip) {
        try {
            const { hostname } = await lookupDns(ip);
            return hostname;
        } catch (e) {
            return null;
        }
    }

    async getReverseDns(ip) {
        try {
            const hostnames = await reverseDns(ip);
            return hostnames[0];
        } catch (e) {
            return null;
        }
    }
}

export default MetadataCollector;