// Central place to configure backend endpoint for audio processing
// Example: export const BACKEND_URL = 'http://localhost:8000';
// For a VM, put your public IP or domain, ensure port is open and CORS allowed.
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
