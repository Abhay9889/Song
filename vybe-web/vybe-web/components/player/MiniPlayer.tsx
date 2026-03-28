'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,
  Volume2, VolumeX, ChevronUp, ChevronDown, Heart,
} from 'lucide-react';
import { usePlayerStore } from './PlayerStore';
import { fmtDuration } from '@/lib/jamendo';

export default function MiniPlayer() {
  const {
    currentTrack, isPlaying, progress, duration, volume, isMuted, isShuffled, repeatMode,
    togglePlay, next, prev, toggleShuffle, toggleRepeat, setVolume, toggleMute, setProgress,
  } = usePlayerStore();

  const [expanded, setExpanded] = useState(false);

  if (!currentTrack) return null;

  const imgSrc = currentTrack.album_image || currentTrack.image || `https://picsum.photos/seed/${currentTrack.id}/200`;
  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setProgress(ratio * duration);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        {/* Progress Bar */}
        <div className="h-0.5 bg-border/60 cursor-pointer group" onClick={seek}>
          <motion.div className="h-full bg-gradient-to-r from-purple-DEFAULT via-cyan-DEFAULT to-pink-DEFAULT
            relative group-hover:h-1 transition-all"
            style={{ width: `${pct}%` }}>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white
              opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
          </motion.div>
        </div>

        {/* Main Bar */}
        <div className="bg-deep/95 backdrop-blur-2xl border-t border-border/40 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">

            {/* Expand / Track Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 cursor-pointer
                shadow-[0_0_12px_rgba(124,58,237,0.4)]" onClick={() => setExpanded(e => !e)}>
                <Image src={imgSrc} alt={currentTrack.name} fill sizes="44px"
                  className={`object-cover transition-transform duration-700 ${isPlaying ? 'animate-spin-slow' : ''}`} unoptimized />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-body font-semibold truncate leading-tight">
                  {currentTrack.name}
                </p>
                <p className="text-muted text-xs truncate">{currentTrack.artist_name}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={toggleShuffle} className={`p-2 rounded-lg transition-colors
                ${isShuffled ? 'text-cyan-DEFAULT' : 'text-muted hover:text-white'}`}>
                <Shuffle size={16} />
              </button>
              <button onClick={prev} className="p-2 text-ghost hover:text-white transition-colors">
                <SkipBack size={20} />
              </button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-DEFAULT to-cyan-DEFAULT
                  flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)]
                  hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-shadow">
                {isPlaying
                  ? <Pause  size={18} className="text-white" />
                  : <Play   size={18} className="text-white fill-white ml-0.5" />
                }
              </motion.button>
              <button onClick={next} className="p-2 text-ghost hover:text-white transition-colors">
                <SkipForward size={20} />
              </button>
              <button onClick={toggleRepeat} className={`p-2 rounded-lg transition-colors
                ${repeatMode !== 'none' ? 'text-purple-light' : 'text-muted hover:text-white'}`}>
                {repeatMode === 'one' ? <Repeat1 size={16} /> : <Repeat size={16} />}
              </button>
            </div>

            {/* Time + Volume */}
            <div className="hidden md:flex items-center gap-3 flex-1 justify-end min-w-0">
              <span className="text-muted text-xs font-body shrink-0">
                {fmtDuration(Math.floor(progress))} / {fmtDuration(Math.floor(duration))}
              </span>
              <button onClick={toggleMute} className="text-muted hover:text-white transition-colors shrink-0">
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input type="range" min={0} max={1} step={0.01} value={isMuted ? 0 : volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="w-20 accent-purple-DEFAULT shrink-0" />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
