const API_URL = import.meta.env.VITE_ANILIST_API_URL || 'https://graphql.anilist.co';

export async function anilistRequest(query, variables = {}, signal) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables }),
    signal,
  });
  if (!response.ok) throw new Error(`AniList request failed (${response.status})`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors.map((error) => error.message).join('; '));
  return payload.data;
}

const SEARCH_QUERY = `query ($search: String, $page: Int, $perPage: Int) { Page(page: $page, perPage: $perPage) { media(search: $search, type: ANIME, sort: POPULARITY_DESC) { id idMal title { english romaji native } description(asHtml: false) coverImage { extraLarge large color } bannerImage genres averageScore episodes seasonYear format status siteUrl } } }`;
const TRENDING_QUERY = `query ($page: Int, $perPage: Int) { Page(page: $page, perPage: $perPage) { media(type: ANIME, sort: TRENDING_DESC) { id idMal title { english romaji native } description(asHtml: false) coverImage { extraLarge large color } bannerImage genres averageScore episodes seasonYear format status siteUrl } } }`;
const DETAIL_QUERY = `query ($id: Int) { Media(id: $id, type: ANIME) { id idMal title { english romaji native } description(asHtml: false) coverImage { extraLarge large color } bannerImage genres averageScore meanScore popularity favourites episodes duration seasonYear season format status siteUrl startDate { year month day } endDate { year month day } studios(isMain: true) { nodes { name } } staff(perPage: 8, sort: RELEVANCE) { edges { role node { name { full } } } } characters(perPage: 8, sort: ROLE) { edges { role node { id name { full } image { large } } } } relations { edges { relationType(version: 2) node { id title { english romaji } coverImage { large } type format } } } recommendations(perPage: 8, sort: RATING) { nodes { mediaRecommendation { id title { english romaji } coverImage { large } averageScore } } } } }`;

export async function searchAnime(search, { page = 1, perPage = 20, signal } = {}) {
  const data = await anilistRequest(SEARCH_QUERY, { search, page, perPage }, signal);
  return data.Page.media;
}
export async function getTrendingAnime({ page = 1, perPage = 20, signal } = {}) {
  const data = await anilistRequest(TRENDING_QUERY, { page, perPage }, signal);
  return data.Page.media;
}
export async function getAnimeDetails(id, signal) {
  const data = await anilistRequest(DETAIL_QUERY, { id: Number(id) }, signal);
  return data.Media;
}
export function displayTitle(media) {
  return media?.title?.english || media?.title?.romaji || media?.title?.native || 'Untitled anime';
}
