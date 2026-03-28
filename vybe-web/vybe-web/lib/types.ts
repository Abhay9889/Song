export interface Track {
  id: string;
  name: string;
  duration: number;
  artist_id: string;
  artist_name: string;
  album_id: string;
  album_name: string;
  album_image: string;
  audio: string;
  audiodownload: string;
  image: string;
  releasedate: string;
  tags: string;
  license_ccurl?: string;
  musicinfo?: {
    vocalinstrumental?: string;
    speed?: string;
    tags?: { genres?: string[]; instruments?: string[]; vartags?: string[] };
  };
}

export interface JamendoResponse {
  headers: { status: string; code: number; results_count: number };
  results: Track[];
}

export interface Genre {
  name: string;
  tag: string;
  gradient: string;
  emoji: string;
  desc: string;
}

export const GENRES: Genre[] = [
  { name: 'Electronic',  tag: 'electronic', gradient: 'from-purple-600 to-cyan-400',  emoji: '🎛️', desc: 'Synths, beats & digital dreams' },
  { name: 'Pop',         tag: 'pop',        gradient: 'from-pink-500 to-orange-400',  emoji: '🎤', desc: 'Catchy hooks & pure energy' },
  { name: 'Rock',        tag: 'rock',       gradient: 'from-red-600 to-orange-500',   emoji: '🎸', desc: 'Raw power & electric feel' },
  { name: 'Jazz',        tag: 'jazz',       gradient: 'from-amber-500 to-yellow-300', emoji: '🎷', desc: 'Smooth grooves & improvisation' },
  { name: 'Ambient',     tag: 'ambient',    gradient: 'from-teal-500 to-blue-400',    emoji: '🌌', desc: 'Atmospheric soundscapes' },
  { name: 'Hip-Hop',     tag: 'hiphop',     gradient: 'from-green-500 to-emerald-400',emoji: '🎧', desc: 'Bars, beats & culture' },
  { name: 'Classical',   tag: 'classical',  gradient: 'from-blue-600 to-indigo-400',  emoji: '🎻', desc: 'Timeless orchestral masterpieces' },
  { name: 'Folk',        tag: 'folk',       gradient: 'from-lime-600 to-green-400',   emoji: '🪕', desc: 'Stories & acoustic warmth' },
  { name: 'Cinematic',   tag: 'film',       gradient: 'from-slate-600 to-blue-500',   emoji: '🎬', desc: 'Epic scores & emotional arcs' },
  { name: 'Lounge',      tag: 'lounge',     gradient: 'from-violet-600 to-purple-400',emoji: '🎹', desc: 'Chill vibes & smooth textures' },
];
