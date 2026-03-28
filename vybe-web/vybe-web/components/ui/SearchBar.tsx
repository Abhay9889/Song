'use client';
import { useState, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Track } from '@/lib/types';
import { usePlayerStore } from '../player/PlayerStore';
import Image from 'next/image';

export default function SearchBar() {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen]       = useState(false);
  const { setTrack }          = usePlayerStore();

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data: Track[] = await res.json();
      setResults(data.slice(0, 8));
    } catch { setResults([]); }
    finally { setLoading(false); }
  }, []);

  // Debounce
  const [debTimer, setDebTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const handleChange = (v: string) => {
    setQuery(v);
    if (debTimer) clearTimeout(debTimer);
    setDebTimer(setTimeout(() => search(v), 350));
  };

  const handleSelect = (track: Track) => {
    setTrack(track, results, results.indexOf(track));
    setOpen(false); setQuery(''); setResults([]);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300
        bg-card/80 backdrop-blur-md
        ${open ? 'border-purple-500/80 shadow-[0_0_20px_rgba(124,58,237,0.25)]' : 'border-border/60 hover:border-purple-500/40'}`}>
        {loading
          ? <Loader2 size={18} className="text-purple-light animate-spin shrink-0" />
          : <Search  size={18} className="text-muted shrink-0" />
        }
        <input
          value={query}
          onChange={e => { handleChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          placeholder="Search artists, songs, genres…"
          className="flex-1 bg-transparent text-white placeholder:text-muted text-sm font-body outline-none"
        />
        <AnimatePresence>
          {query && (
            <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              onClick={() => { setQuery(''); setResults([]); }}
              className="text-muted hover:text-white transition-colors">
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className="absolute top-full mt-2 w-full z-50 rounded-2xl border border-border/60
              bg-deep/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {results.map(track => (
              <button key={track.id} onMouseDown={() => handleSelect(track)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-600/15
                  transition-colors duration-150 text-left border-b border-border/30 last:border-0">
                <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 relative">
                  <Image src={track.album_image || track.image || `/api/placeholder/36/36`}
                    alt={track.name} fill sizes="36px" className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-body font-medium truncate">{track.name}</p>
                  <p className="text-muted text-xs truncate">{track.artist_name}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
