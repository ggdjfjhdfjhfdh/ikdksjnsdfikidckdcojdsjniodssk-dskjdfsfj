import { validate as uuidValidate } from 'uuid';
import { createHash } from 'crypto';

export class MetadataValidator {
    static async validateIncidentDetails(incidentType, details) {
        const validationRules = {
            'Ataque DDoS': {
                required: ['target_domain', 'attack_vector', 'peak_bps', 'peak_pps', 'duration'],
                optional: ['mitigation_status', 'attack_source_ips']
            },
            'Brecha de datos': {
                required: ['affected_systems', 'data_types', 'estimated_records'],
                optional: ['exfiltration_method', 'detection_method']
            },
            'Malware/Ransomware': {
                required: ['infected_systems', 'malware_type', 'infection_vector'],
                optional: ['ransom_amount', 'ransom_currency', 'ransom_wallet']
            },
            'Phishing': {
                required: ['phishing_url', 'campaign_type', 'target_group'],
                optional: ['email_subjects', 'attachment_types']
            },
            'Acceso no autorizado': {
                required: ['compromised_accounts', 'entry_point', 'detected_actions'],
                optional: ['source_ips', 'accessed_systems']
            },
            'Vulnerabilidad crítica': {
                required: ['vulnerability_type', 'affected_systems', 'cvss_score'],
                optional: ['cve_id', 'patch_status']
            }
        };

        const rules = validationRules[incidentType];
        if (!rules) {
            return {
                success: false,
                errors: ['Tipo de incidente no válido']
            };
        }

        const errors = [];

        // Validar campos requeridos
        for (const field of rules.required) {
            if (!details[field]) {
                errors.push(`Campo requerido faltante: ${field}`);
            }
        }

        // Validaciones específicas por tipo
        switch (incidentType) {
            case 'Ataque DDoS':
                if (details.peak_bps && !this.isValidNumber(details.peak_bps)) {
                    errors.push('peak_bps debe ser un número válido');
                }
                if (details.peak_pps && !this.isValidNumber(details.peak_pps)) {
                    errors.push('peak_pps debe ser un número válido');
                }
                break;

            case 'Brecha de datos':
                if (details.estimated_records && !this.isValidNumber(details.estimated_records)) {
                    errors.push('estimated_records debe ser un número válido');
                }
                if (details.data_types && !Array.isArray(details.data_types)) {
                    errors.push('data_types debe ser un array');
                }
                break;

            case 'Malware/Ransomware':
                if (details.infected_systems && !Array.isArray(details.infected_systems)) {
                    errors.push('infected_systems debe ser un array');
                }
                if (details.ransom_amount && !this.isValidNumber(details.ransom_amount)) {
                    errors.push('ransom_amount debe ser un número válido');
                }
                break;

            case 'Phishing':
                if (details.phishing_url && !this.isValidUrl(details.phishing_url)) {
                    errors.push('phishing_url debe ser una URL válida');
                }
                break;

            case 'Vulnerabilidad crítica':
                if (details.cvss_score && !this.isValidCvssScore(details.cvss_score)) {
                    errors.push('cvss_score debe ser un número entre 0.0 y 10.0');
                }
                if (details.cve_id && !this.isValidCveId(details.cve_id)) {
                    errors.push('cve_id debe tener el formato CVE-YYYY-NNNNN');
                }
                break;
        }

        return {
            success: errors.length === 0,
            errors
        };
    }

    static validateTicketMetadata(metadata) {
        const errors = [];
        const warnings = [];

        // Validar estructura básica
        if (!metadata) {
            errors.push('No se proporcionaron metadatos');
            return { isValid: false, errors, warnings };
        }

        // Validar headers sospechosos
        if (metadata.headers) {
            this.validateHeaders(metadata.headers, warnings);
        }

        // Validar campos básicos
        this.validateBasicFields(metadata, errors, warnings);

        // Validar información de conexión
        if (metadata.network_metadata) {
            this.validateNetworkMetadata(metadata.network_metadata, errors, warnings);
        }

        // Validar hardware_metadata
        if (metadata.hardware_metadata) {
            this.validateHardwareMetadata(metadata.hardware_metadata, errors, warnings);
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            sanitizedMetadata: this.sanitizeMetadata(metadata)
        };
    }

    static validateClientMetadata(metadata, errors, warnings) {
        if (!metadata.browser) {
            warnings.push('Falta información del navegador');
        }
        if (!metadata.os) {
            warnings.push('Falta información del sistema operativo');
        }
        if (!metadata.device) {
            warnings.push('Falta información del dispositivo');
        }

        // Validar datos sensibles
        if (this.containsSensitiveData(metadata)) {
            errors.push('Los metadatos contienen información sensible');
        }
    }

    static validateTechnicalMetadata(metadata, errors, warnings) {
        if (!metadata.request) {
            errors.push('Faltan datos de la petición');
        }
        if (!metadata.performance) {
            warnings.push('Faltan métricas de rendimiento');
        }
    }

    static validateSecurityMetadata(metadata, errors, warnings) {
        // Verificar el entorno
        const isDevelopment = process.env.NODE_ENV === 'development';

        if (!metadata.connection) {
            warnings.push('Falta información de conexión');
        } else {
            // En producción, la conexión no cifrada es un error
            // En desarrollo, es solo una advertencia
            if (!metadata.connection.encrypted) {
                if (isDevelopment) {
                    warnings.push('La conexión no está cifrada (desarrollo)');
                } else if (process.env.ALLOW_INSECURE !== 'true') {
                    warnings.push('La conexión no está cifrada');
                }
            }

            // Advertencias sobre el protocolo
            if (metadata.connection.protocol === 'http') {
                warnings.push('Se recomienda usar HTTPS para mayor seguridad');
            }
        }

        // Evaluación de riesgos
        if (metadata.riskAssessment) {
            if (metadata.riskAssessment.isKnownProxy) {
                warnings.push('Conexión detectada a través de proxy');
            }
            if (metadata.riskAssessment.isTorExit) {
                warnings.push('Conexión detectada desde nodo de salida Tor');
            }
            if (metadata.riskAssessment.suspiciousHeaders?.length > 0) {
                warnings.push('Headers sospechosos detectados: ' +
                    metadata.riskAssessment.suspiciousHeaders.join(', '));
            }
        }
    }

    static validateNetworkMetadata(metadata, errors, warnings) {
        if (!metadata.ip || !this.isValidIp(metadata.ip.address)) {
            errors.push('Dirección IP inválida o faltante');
        }
        if (!metadata.geo) {
            warnings.push('Falta información de geolocalización');
        }
    }

    static validateHardwareMetadata(metadata, errors, warnings) {
        // Solo advertencias para hardware ya que no es crítico
        if (!metadata.client) {
            warnings.push('Falta información de hardware del cliente');
        }
        if (!metadata.server) {
            warnings.push('Falta información de hardware del servidor');
        }
    }

    static sanitizeMetadata(metadata) {
        const sanitized = JSON.parse(JSON.stringify(metadata));

        // Eliminar datos sensibles
        this.removeSensitiveData(sanitized);

        // Truncar strings largos
        this.truncateLongStrings(sanitized);

        // Normalizar formatos
        this.normalizeFormats(sanitized);

        return sanitized;
    }

    // Utility methods
    static isValidIp(ip) {
        const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
        const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return ipv4Regex.test(ip) || ipv6Regex.test(ip);
    }

    static containsSensitiveData(obj) {
        const sensitivePatterns = [
            /password/i,
            /secret/i,
            /token/i,
            /api[_-]?key/i,
            /auth/i,
            /credit[_-]?card/i,
            /ssn/i,
            /social[_-]?security/i
        ];

        return this.searchPatterns(obj, sensitivePatterns);
    }

    static searchPatterns(obj, patterns) {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                if (this.searchPatterns(obj[key], patterns)) {
                    return true;
                }
            } else if (typeof obj[key] === 'string') {
                if (patterns.some(pattern => pattern.test(key))) {
                    return true;
                }
            }
        }
        return false;
    }

    static removeSensitiveData(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                this.removeSensitiveData(obj[key]);
            } else if (this.containsSensitiveData({ [key]: obj[key] })) {
                delete obj[key];
            }
        }
    }

    static truncateLongStrings(obj, maxLength = 1000) {
        for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].length > maxLength) {
                obj[key] = obj[key].substring(0, maxLength) + '...';
            } else if (typeof obj[key] === 'object') {
                this.truncateLongStrings(obj[key], maxLength);
            }
        }
    }

    static normalizeFormats(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'string') {
                // Normalizar fechas
                if (this.isISODate(obj[key])) {
                    obj[key] = new Date(obj[key]).toISOString();
                }
                // Normalizar UUIDs
                if (this.isUUID(obj[key])) {
                    obj[key] = obj[key].toLowerCase();
                }
            } else if (typeof obj[key] === 'object') {
                this.normalizeFormats(obj[key]);
            }
        }
    }

    static isISODate(str) {
        if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
        const d = new Date(str);
        return d instanceof Date && !isNaN(d) && d.toISOString() === str;
    }

    static isUUID(str) {
        return uuidValidate(str);
    }

    static hashSensitiveData(data) {
        return createHash('sha256').update(data).digest('hex');
    }

    static validateHeaders(headers, warnings) {
        const suspiciousHeaders = [];

        // Comprobar headers de proxy
        if (headers['x-forwarded-for'] || headers['forwarded'] || headers['via']) {
            suspiciousHeaders.push('proxy_headers');
        }

        // Comprobar headers de seguridad
        if (!headers['sec-fetch-site'] || !headers['sec-fetch-mode']) {
            suspiciousHeaders.push('non_ajax');
        }

        // Comprobar headers sospechosos
        if (headers['x-requested-with'] !== 'XMLHttpRequest') {
            suspiciousHeaders.push('non_ajax');
        }

        if (suspiciousHeaders.length > 0) {
            warnings.push('Headers sospechosos detectados: ' + suspiciousHeaders.join(', '));
        }
    }

    static validateBasicFields(metadata, errors, warnings) {
        if (!metadata.ip) {
            warnings.push('IP no disponible');
        }
        if (!metadata.browser) {
            warnings.push('Información del navegador no disponible');
        }
        if (!metadata.os) {
            warnings.push('Sistema operativo no detectado');
        }
    }
}

export default MetadataValidator;