// Recolector de metadatos del cliente
class ClientMetadataCollector {
    static async collectAll() {
        return {
            device: await this.getDeviceInfo(),
            network: await this.getNetworkInfo(),
            browser: this.getBrowserInfo(),
            hardware: await this.getHardwareInfo(),
            performance: await this.getPerformanceInfo()
        };
    }

    static async getDeviceInfo() {
        return {
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth,
                pixelRatio: window.devicePixelRatio,
                orientation: window.screen.orientation?.type
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            maxTouchPoints: navigator.maxTouchPoints,
            pdfViewerEnabled: navigator.pdfViewerEnabled,
            vendor: navigator.vendor
        };
    }

    static async getNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return {
            onLine: navigator.onLine,
            connection: connection ? {
                type: connection.type,
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            } : null,
            webRTC: await this.checkWebRTCSupport()
        };
    }

    static getBrowserInfo() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            doNotTrack: navigator.doNotTrack,
            cookieEnabled: navigator.cookieEnabled,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            appCodeName: navigator.appCodeName,
            productSub: navigator.productSub,
            buildID: navigator.buildID,
            webdriver: navigator.webdriver
        };
    }

    static async getHardwareInfo() {
        const gl = document.createElement('canvas').getContext('webgl');
        return {
            gpu: gl ? {
                vendor: gl.getParameter(gl.VENDOR),
                renderer: gl.getParameter(gl.RENDERER),
                webglVersion: gl.getParameter(gl.VERSION)
            } : null,
            cores: navigator.hardwareConcurrency,
            memory: navigator.deviceMemory,
            battery: await this.getBatteryInfo(),
            audio: await this.getAudioCapabilities(),
            video: await this.getVideoCapabilities()
        };
    }

    static async getPerformanceInfo() {
        const timing = performance.timing;
        const navigation = performance.getEntriesByType('navigation')[0];

        return {
            timing: {
                navigationStart: timing.navigationStart,
                loadEventEnd: timing.loadEventEnd,
                domComplete: timing.domComplete,
                redirectCount: navigation?.redirectCount,
                type: navigation?.type,
                loadTime: timing.loadEventEnd - timing.navigationStart,
                domReadyTime: timing.domComplete - timing.domLoading
            },
            memory: performance.memory ? {
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                usedJSHeapSize: performance.memory.usedJSHeapSize
            } : null,
            resources: this.getResourceMetrics()
        };
    }

    // Utility methods
    static async getBatteryInfo() {
        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                return {
                    charging: battery.charging,
                    level: battery.level,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async getAudioCapabilities() {
        if (navigator.mediaDevices?.enumerateDevices) {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                return {
                    inputDevices: devices.filter(d => d.kind === 'audioinput').length,
                    outputDevices: devices.filter(d => d.kind === 'audiooutput').length
                };
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async getVideoCapabilities() {
        if (navigator.mediaDevices?.enumerateDevices) {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                return {
                    inputDevices: devices.filter(d => d.kind === 'videoinput').length
                };
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async checkWebRTCSupport() {
        return {
            RTCPeerConnection: 'RTCPeerConnection' in window,
            getUserMedia: navigator.mediaDevices && 'getUserMedia' in navigator.mediaDevices
        };
    }

    static getResourceMetrics() {
        const resources = performance.getEntriesByType('resource');
        return {
            count: resources.length,
            types: this.countResourceTypes(resources),
            totalSize: this.calculateTotalSize(resources),
            loadTimes: this.calculateLoadTimes(resources)
        };
    }

    static countResourceTypes(resources) {
        return resources.reduce((acc, r) => {
            const type = r.initiatorType;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
    }

    static calculateTotalSize(resources) {
        return resources.reduce((total, r) => total + (r.transferSize || 0), 0);
    }

    static calculateLoadTimes(resources) {
        return resources.reduce((acc, r) => {
            acc.total += r.duration;
            acc.max = Math.max(acc.max, r.duration);
            acc.min = Math.min(acc.min, r.duration);
            return acc;
        }, { total: 0, max: 0, min: Infinity });
    }
}

export default ClientMetadataCollector;