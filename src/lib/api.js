/**
 * Centralized API fetch utility for the main website.
 * All components should use this instead of raw fetch() calls.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetch data from the admin panel API with error handling.
 * @param {string} endpoint - API endpoint path (e.g., '/hero', '/portfolio')
 * @param {object} options - Optional fetch options
 * @returns {Promise<{data: any, error: string|null}>}
 */
export async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error(`API Error [${response.status}] ${endpoint}:`, errorText);
      return { data: null, error: `API returned ${response.status}` };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    console.error(`Network Error fetching ${endpoint}:`, err);
    return { data: null, error: err.message || 'Network error' };
  }
}

/**
 * POST data to the admin panel API.
 * @param {string} endpoint - API endpoint path
 * @param {object} body - Request body
 * @returns {Promise<{data: any, error: string|null}>}
 */
export async function postAPI(endpoint, body) {
  return fetchAPI(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
