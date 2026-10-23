const API_URL = import.meta.env.VITE_JIKAN_API_URL || 'https://api.jikan.moe/v4';
const API_KEY = import.meta.env.VITE_JIKAN_API_KEY;

async function request(path, signal) {
  const headers = { Accept: 'application/json' };
  if (API_KEY) headers['X-API-Key'] = API_KEY;
  const response = await fetch(`${API_URL}${path}`, { headers, signal });
  if (!response.ok) throw new Error(`Jikan request failed (${response.status})`);
  return response.json();
}
export async function searchJikanAnime(query, { page = 1, signal } = {}) {
  const params = new URLSearchParams({ q: query, page: String(page), limit: '20', type: 'tv' });
  const result = await request(`/anime?${params}`, signal);
  return result.data || [];
}
export async function getJikanAnimeDetails(id, signal) {
  const result = await request(`/anime/${encodeURIComponent(id)}/full`, signal);
  return result.data || null;
}
export async function getJikanSeasonNow({ page = 1, signal } = {}) {
  const result = await request(`/seasons/now?page=${page}`, signal);
  return result.data || [];
}
