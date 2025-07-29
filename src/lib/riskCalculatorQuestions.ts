import { RiskCalculatorTranslationKey } from './riskCalculatorTranslations';

export interface Question {
  id: string;
  category: string;
  questionKey: RiskCalculatorTranslationKey;
  weight: number;
  targetAudience?: 'individual' | 'business' | 'both';
}

export const businessQuestions: Question[] = [
  // Gestión de Identidades y Accesos (20%)
  { id: 'zero_trust', category: 'categoryIdentityAccess', questionKey: 'questionZeroTrust', weight: 12, targetAudience: 'business' },
  { id: 'privileged_access', category: 'categoryIdentityAccess', questionKey: 'questionPrivilegedAccess', weight: 10, targetAudience: 'business' },
  { id: 'mfa_adaptive', category: 'categoryIdentityAccess', questionKey: 'questionMfaAdaptive', weight: 8, targetAudience: 'business' },
  { id: 'identity_governance', category: 'categoryIdentityAccess', questionKey: 'questionIdentityGovernance', weight: 6, targetAudience: 'business' },
  { id: 'least_privilege', category: 'categoryIdentityAccess', questionKey: 'questionLeastPrivilege', weight: 4, targetAudience: 'both' },
  
  // Protección de Endpoints y Dispositivos (18%)
  { id: 'edr_solution', category: 'categoryEndpoints', questionKey: 'questionEdrSolution', weight: 10, targetAudience: 'business' },
  { id: 'device_encryption', category: 'categoryEndpoints', questionKey: 'questionDeviceEncryption', weight: 8, targetAudience: 'both' },
  { id: 'mobile_device_management', category: 'categoryEndpoints', questionKey: 'questionMobileDeviceManagement', weight: 6, targetAudience: 'business' },
  { id: 'endpoint_compliance', category: 'categoryEndpoints', questionKey: 'questionEndpointCompliance', weight: 5, targetAudience: 'business' },
  { id: 'usb_control', category: 'categoryEndpoints', questionKey: 'questionUsbControl', weight: 3, targetAudience: 'both' },
  
  // Seguridad de Red y Perímetro (16%)
  { id: 'ngfw_deployment', category: 'categoryNetworkPerimeter', questionKey: 'questionNgfwDeployment', weight: 8 },
  { id: 'network_microsegmentation', category: 'categoryNetworkPerimeter', questionKey: 'questionNetworkMicrosegmentation', weight: 7 },
  { id: 'dns_security', category: 'categoryNetworkPerimeter', questionKey: 'questionDnsSecurity', weight: 5 },
  { id: 'network_monitoring', category: 'categoryNetworkPerimeter', questionKey: 'questionNetworkMonitoring', weight: 4 },
  { id: 'secure_remote_access', category: 'categoryNetworkPerimeter', questionKey: 'questionSecureRemoteAccess', weight: 4 },
  
  // Protección de Datos y Cifrado (14%)
  { id: 'data_classification', category: 'categoryDataProtection', questionKey: 'questionDataClassification', weight: 8 },
  { id: 'dlp_solution', category: 'categoryDataProtection', questionKey: 'questionDlpSolution', weight: 6 },
  { id: 'encryption_at_rest', category: 'categoryDataProtection', questionKey: 'questionEncryptionAtRest', weight: 5 },
  { id: 'encryption_in_transit', category: 'categoryDataProtection', questionKey: 'questionEncryptionInTransit', weight: 4 },
  { id: 'key_management', category: 'categoryDataProtection', questionKey: 'questionKeyManagement', weight: 5 },
  
  // Detección y Respuesta (12%)
  { id: 'siem_solution', category: 'categoryDetectionResponse', questionKey: 'questionSiemSolution', weight: 8 },
  { id: 'threat_hunting', category: 'categoryDetectionResponse', questionKey: 'questionThreatHunting', weight: 6 },
  { id: 'incident_response_team', category: 'categoryDetectionResponse', questionKey: 'questionIncidentResponseTeam', weight: 5 },
  { id: 'forensic_capabilities', category: 'categoryDetectionResponse', questionKey: 'questionForensicCapabilities', weight: 3 },
  
  // Gestión de Vulnerabilidades (10%)
  { id: 'vulnerability_management', category: 'categoryVulnerabilityManagement', questionKey: 'questionVulnerabilityManagement', weight: 6 },
  { id: 'penetration_testing', category: 'categoryVulnerabilityManagement', questionKey: 'questionPenetrationTesting', weight: 5 },
  { id: 'patch_management', category: 'categoryVulnerabilityManagement', questionKey: 'questionPatchManagement', weight: 4 },
  { id: 'asset_inventory', category: 'categoryVulnerabilityManagement', questionKey: 'questionAssetInventory', weight: 3 },
  
  // Continuidad del Negocio y Recuperación (10%)
  { id: 'business_continuity_plan', category: 'categoryBusinessContinuity', questionKey: 'questionBusinessContinuityPlan', weight: 6 },
  { id: 'disaster_recovery', category: 'categoryBusinessContinuity', questionKey: 'questionDisasterRecovery', weight: 5 },
  { id: 'backup_immutable', category: 'categoryBusinessContinuity', questionKey: 'questionBackupImmutable', weight: 4, targetAudience: 'business' },
  { id: 'rto_rpo_compliance', category: 'categoryBusinessContinuity', questionKey: 'questionRtoRpoCompliance', weight: 3, targetAudience: 'business' }
];

export const individualQuestions: Question[] = [
  // Seguridad Personal Básica
  { id: 'personal_antivirus', category: 'categoryPersonalProtection', questionKey: 'questionPersonalAntivirus', weight: 8, targetAudience: 'individual' },
  { id: 'personal_mfa', category: 'categoryPersonalProtection', questionKey: 'questionPersonalMfa', weight: 10, targetAudience: 'individual' },
  { id: 'password_manager', category: 'categoryPersonalProtection', questionKey: 'questionPasswordManager', weight: 9, targetAudience: 'individual' },
  { id: 'software_updates', category: 'categoryPersonalProtection', questionKey: 'questionSoftwareUpdates', weight: 7, targetAudience: 'individual' },
  { id: 'secure_browsing', category: 'categoryPersonalProtection', questionKey: 'questionSecureBrowsing', weight: 6, targetAudience: 'individual' },
  
  // Protección de Datos Personales
  { id: 'personal_backups', category: 'categoryPersonalData', questionKey: 'questionPersonalBackups', weight: 8, targetAudience: 'individual' },
  { id: 'cloud_security', category: 'categoryPersonalData', questionKey: 'questionCloudSecurity', weight: 6, targetAudience: 'individual' },
  { id: 'personal_encryption', category: 'categoryPersonalData', questionKey: 'questionPersonalEncryption', weight: 7, targetAudience: 'individual' },
  { id: 'social_media_privacy', category: 'categoryPersonalData', questionKey: 'questionSocialMediaPrivacy', weight: 5, targetAudience: 'individual' },
  
  // Seguridad en Comunicaciones
  { id: 'secure_messaging', category: 'categoryCommunications', questionKey: 'questionSecureMessaging', weight: 6, targetAudience: 'individual' },
  { id: 'email_security', category: 'categoryCommunications', questionKey: 'questionEmailSecurity', weight: 7, targetAudience: 'individual' },
  { id: 'public_wifi_security', category: 'categoryCommunications', questionKey: 'questionPublicWifiSecurity', weight: 8, targetAudience: 'individual' },
  
  // Dispositivos y Acceso
  { id: 'device_locking', category: 'categoryDevices', questionKey: 'questionDeviceLocking', weight: 6, targetAudience: 'individual' },
  { id: 'app_permissions', category: 'categoryDevices', questionKey: 'questionAppPermissions', weight: 5, targetAudience: 'individual' },
  { id: 'device_tracking', category: 'categoryDevices', questionKey: 'questionDeviceTracking', weight: 4, targetAudience: 'individual' },
  
  // Concienciación y Educación
  { id: 'phishing_awareness', category: 'categoryAwareness', questionKey: 'questionPhishingAwareness', weight: 8, targetAudience: 'individual' },
  { id: 'security_news', category: 'categoryAwareness', questionKey: 'questionSecurityNews', weight: 4, targetAudience: 'individual' },
  { id: 'incident_response', category: 'categoryAwareness', questionKey: 'questionIncidentResponse', weight: 6, targetAudience: 'individual' }
];