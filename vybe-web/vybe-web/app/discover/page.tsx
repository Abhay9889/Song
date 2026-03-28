'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Search, X, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Track, GENRES } from '@/lib/types';
import TrackCard from '@/components/ui/TrackCard';
import GenreCard from '@/components/ui/GenreCard';

const MOODS = [
  { label: 'Energetic', tag: 'energetic', emoji: '⚡', color: 'from-yellow-500 to-orange-500' },
  { label: 'Calm',      tag: 'relaxing',  emoji: '🌊', color: 'from-teal-500 to-blue-500'   },
  { label: 'Happy',     tag: 'happy',     emoji: '😊', color: 'from-yellow-400 to-pink-400'  },
  { label: 'Melancholic', tag: 'melancholic', emoji: '🌙', color: 'from-indigo-600 to-purple-800' },
  { label: 'Focus',     tag: 'instrumental', emoji: '🎯', color: 'from-slate-500 to-gray-700' },
  { label: 'Party',     tag: 'party',     emoji: '🎉', color: 'from-pink-500 to-purple-500'  },
  { label: 'Romantic',  tag: 'romantic',  emoji: '💕', color: 'from-rose-500 to-pink-400'    },
];

type FilterType = 'genre' | 'mood' | 'search';

export default function DiscoverPage() {
  const searchParams   = useSearchParams();
  const defaultGenre   = searchParams.get('genre') ?? '';

  const [tracks, setTracks]       = useState<Track[]>([]);
  const [loading, setLoading]     = useState(false);
  const [query, setQuery]         = useState('');
  const [activeGenre, setActiveGenre] = useState(defaultGenre);
  const [activeMood, setActiveMood]   = useState('');
  const [filterType, setFilterType]   = useState<FilterType | null>(defaultGenre ? 'genre' : null);
  const [debTimer, setDebTimer]       = useState<ReturnType<typeof setTimeout> | null>(null);

  const fetchTracks = useCallback(async (type: FilterType, value: string) => {
    setLoading(true); setTracks([]);
    try {
      let url = '';
      if (type === 'genre')  url = `/api/genre/${encodeURIComponent(value)}`;
      if (type === 'mood')   url = `/api/genre/${encodeURIComponent(value)}`;
      if (type === 'search') url = `/api/search?q=${encodeURIComponent(value)}`;
      if (!url) return;
      const res  = await fetch(url);
      const data = await res.json();
      setTracks(Array.isArray(data) ? data : []);
    } catch { setTracks([]); }
    finally { setLoading(false); }
  }, []);

  // Auto-load genre from URL
  useEffect(() => {
    if (defaultGenre) fetchTracks('genre', defaultGenre);
  }, [defaultGenre, fetchTracks]);

  const handleGenreClick = (tag: string) => {
    setActiveGenre(tag); setActiveMood(''); setQuery('');
    setFilterType('genre');
    fetchTracks('genre', tag);
  };

  const handleMoodClick = (tag: string) => {
    setActiveMood(tag); setActiveGenre(''); setQuery('');
    setFilterType('mood');
    fetchTracks('mood', tag);
  };

  const handleSearch = (v: string) => {
    setQuery(v);
    if (debTimer) clearTimeout(debTimer);
    if (!v.trim()) { setTracks([]); setFilterType(null); return; }
    setDebTimer(setTimeout(() => {
      setActiveGenre(''); setActiveMood('');
      setFilterType('search');
      fetchTracks('search', v);
    }, 400));
  };

  const clearFilter = () => {
    setActiveGenre(''); setActiveMood(''); setQuery('');
    setFilterType(null); setTracks([]);
  };

  return (
    <div className="relative min-h-screen bg-void bg-grid">
      {/* Purple ambient glow */}
      <div className="fixed top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px]
        bg-purple-DEFAULT/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-DEFAULT to-pink-DEFAULT
            flex items-center justify-center">
            <Compass size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-black text-3xl text-white">Discover</h1>
            <p className="text-muted text-sm font-body">Explore by genre, mood, or search</p>
          </div>
        </motion.div>

        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-8 max-w-2xl">
          <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all
            bg-card/80 backdrop-blur-md
            ${filterType === 'search' ? 'border-purple-500/80 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
              : 'border-border/60 hover:border-purple-500/40'}`}>
            {loading && filterType === 'search'
              ? <Loader2 size={18} className="text-purple-light animate-spin shrink-0" />
              : <Search  size={18} className="text-muted shrink-0" />
            }
            <input value={query} onChange={e => handleSearch(e.target.value)}
              placeholder="Search any artist, track, or keyword…"
              className="flex-1 bg-transparent text-white placeholder:text-muted text-sm font-body outline-none" />
            {query && (
              <button onClick={clearFilter} className="text-muted hover:text-white transition-colors">
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Mood Chips */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="mb-10">
          <p className="text-muted text-xs font-body uppercase tracking-widest mb-3">Set the Mood</p>
          <div className="flex flex-wrap gap-3">
            {MOODS.map(m => (
              <button key={m.tag} onClick={() => handleMoodClick(m.tag)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body
                  font-medium border transition-all duration-200
                  ${activeMood === m.tag
                    ? `bg-gradient-to-r ${m.color} text-white border-transparent shadow-lg scale-105`
                    : 'bg-card/60 border-border/50 text-ghost hover:border-purple-500/40 hover:text-white'}`}>
                <span>{m.emoji}</span>
                {m.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active filter chip */}
        <AnimatePresence>
          {filterType && (activeGenre || activeMood || query) && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 mb-6">
              <span className="text-muted text-xs font-body">Showing:</span>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600/20
                border border-purple-500/40 text-purple-light text-xs font-body">
                {activeGenre || activeMood || query}
                <button onClick={clearFilter} className="hover:text-white transition-colors">
                  <X size={12} />
                </button>
              </span>
              {!loading && tracks.length > 0 && (
                <span className="text-muted text-xs font-body">{tracks.length} tracks</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results or Genre Grid */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 rounded-2xl skeleton" />
            ))}
          </div>
        ) : tracks.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="space-y-2">
            {tracks.map((track, i) => (
              <motion.div key={track.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.35 }}>
                <TrackCard track={track} queue={tracks} index={i} rank={i} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Genre Grid */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-muted text-xs font-body uppercase tracking-widest mb-4">Or Browse by Genre</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {GENRES.map((genre, i) => (
                <div key={genre.tag} onClick={() => handleGenreClick(genre.tag)} className="cursor-pointer">
                  <GenreCard genre={genre} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
