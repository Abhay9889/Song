import { JamendoResponse, Track } from './types';

const BASE = 'https://api.jamendo.com/v3.0';
const CLIENT_ID = process.env.JAMENDO_CLIENT_ID ?? 'YOUR_CLIENT_ID';

async function jamendoFetch(path: string, params: Record<string, string | number> = {}): Promise<JamendoResponse> {
  const p = new URLSearchParams({
    client_id: CLIENT_ID,
    format: 'json',
    imagesize: '500',
    include: 'musicinfo',
    ...Object.fromEntries(Object.entries(params).map(([k,v]) => [k, String(v)])),
  });
  const res = await fetch(`${BASE}${path}?${p}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Jamendo error ${res.status}`);
  return res.json();
}

export async function getTrending(limit = 50): Promise<Track[]> {
  const data = await jamendoFetch('/tracks/', { order: 'popularity_total', limit });
  return data.results;
}

export async function getNewReleases(limit = 40): Promise<Track[]> {
  const data = await jamendoFetch('/tracks/', { order: 'releasedate_desc', limit });
  return data.results;
}

export async function getByGenre(tag: string, limit = 40): Promise<Track[]> {
  const data = await jamendoFetch('/tracks/', { tags: tag, order: 'popularity_total', limit });
  return data.results;
}

export async function searchTracks(q: string, limit = 40): Promise<Track[]> {
  const data = await jamendoFetch('/tracks/', { search: q, limit });
  return data.results;
}

export async function getByMood(mood: string, limit = 30): Promise<Track[]> {
  const data = await jamendoFetch('/tracks/', { tags: mood, order: 'popularity_total', limit });
  return data.results;
}

export function fmtDuration(s: number): string {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
