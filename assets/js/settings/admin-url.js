/**
 * Wrapper for the wcSettings global, which sets defaults if data is missing.
 *
 * Only settings used by blocks are defined here. Component settings are left out.
 */
const adminUrl = wcSettings.adminUrl || '';

export default adminUrl;
