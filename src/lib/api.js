/**
 * Centralized API fetch utility for the main website.
 * Provides timeout protection, graceful fallback telemetry, and diagnostics.
 */

const RAW_API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env.VITE_API_URL || '' : '';
// Strip trailing slash if present
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

const RAW_WORKER_API_URL = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env.VITE_WORKER_API_URL || '' : '';
const WORKER_BASE_URL = RAW_WORKER_API_URL.replace(/\/+$/, '');

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  isConfigured: Boolean(API_BASE_URL),
};

export const WORKER_API_CONFIG = {
  baseUrl: WORKER_BASE_URL,
  isConfigured: Boolean(WORKER_BASE_URL),
};

/**
 * Fetch data from the admin panel API with error handling and timeout.
 * @param {string} endpoint - API endpoint path (e.g., '/hero', '/portfolio')
 * @param {object} options - Optional fetch options
 * @param {number} [timeoutMs=3500] - Request timeout in milliseconds
 * @returns {Promise<{data: any, error: string|null, isLive: boolean, source: 'live'|'fallback'}>}
 */
export async function fetchAPI(endpoint, options = {}, timeoutMs = 3500) {
  if (!API_BASE_URL) {
    if (import.meta.env?.DEV) {
      console.info(`[API INFO] No VITE_API_URL configured. Using local fallback for "${endpoint}".`);
    }
    return { data: null, error: 'No API configured', isLive: false, source: 'fallback' };
  }

  // Ensure clean leading slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    clearTimeout(timer);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      if (import.meta.env?.DEV) {
        console.warn(`[API WARN] ${endpoint} returned HTTP ${response.status}. Using local fallback.`, errorText);
      }
      return { data: null, error: `API returned ${response.status}`, isLive: false, source: 'fallback' };
    }

    const data = await response.json();
    return { data, error: null, isLive: true, source: 'live' };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err.name === 'AbortError';
    const message = isTimeout ? 'Request timed out' : (err.message || 'Network error');
    if (import.meta.env?.DEV) {
      console.warn(`[API FALLBACK] Endpoint "${endpoint}" unreachable (${message}). Seamlessly rendering local fallback data.`);
    }
    return { data: null, error: message, isLive: false, source: 'fallback' };
  }
}

/**
 * POST data to the admin panel API with timeout protection.
 * @param {string} endpoint - API endpoint path
 * @param {object} body - Request body
 * @returns {Promise<{data: any, error: string|null, isLive: boolean}>}
 */
export async function postAPI(endpoint, body, timeoutMs = 5000) {
  return fetchAPI(
    endpoint,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    timeoutMs
  );
}

