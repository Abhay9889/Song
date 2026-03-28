'use client';
import Image from 'next/image';
import { Play, Pause, Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Track } from '@/lib/types';
import { fmtDuration } from '@/lib/jamendo';
import { usePlayerStore } from '../player/PlayerStore';

interface Props {
  track: Track;
  queue: Track[];
  index: number;
  rank?: number;
}

export default function TrackCard({ track, queue, index, rank }: Props) {
  const { currentTrack, isPlaying, setTrack, togglePlay } = usePlayerStore();
  const isActive = currentTrack?.id === track.id;

  const handleClick = () => {
    if (isActive) togglePlay();
    else setTrack(track, queue, index);
  };

  const imgSrc = track.album_image || track.image || `https://picsum.photos/seed/${track.id}/200`;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`group relative flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 border
        ${isActive
          ? 'bg-purple-600/20 border-purple-500/60 shadow-[0_0_20px_rgba(124,58,237,0.3)]'
          : 'bg-card/60 border-border/40 hover:bg-white/5 hover:border-purple-500/30'
        }`}
    >
      {/* Rank */}
      {rank !== undefined && (
        <span className="w-6 text-center text-xs font-display text-muted shrink-0">
          {isActive && isPlaying ? (
            <span className="flex justify-center gap-[2px] items-end h-4">
              {[0,1,2].map(i => (
                <span key={i} className="w-[3px] bg-purple-light rounded-full animate-pulse"
                  style={{ height: `${40 + i*20}%`, animationDelay: `${i*0.2}s` }} />
              ))}
            </span>
          ) : String(rank + 1).padStart(2, '0')}
        </span>
      )}

      {/* Album Art */}
      <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden">
        <Image src={imgSrc} alt={track.name} fill sizes="48px" className="object-cover" unoptimized />
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} bg-black/50`}>
          {isActive && isPlaying
            ? <Pause size={18} className="text-purple-light" />
            : <Play  size={18} className="text-white fill-white" />
          }
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`font-body font-semibold truncate text-sm leading-tight
          ${isActive ? 'text-purple-light' : 'text-white group-hover:text-purple-light'} transition-colors`}>
          {track.name}
        </p>
        <p className="text-muted text-xs truncate mt-0.5">{track.artist_name}</p>
      </div>

      {/* Genre tag */}
      {track.musicinfo?.tags?.genres?.[0] && (
        <span className="hidden md:block text-[10px] px-2 py-0.5 rounded-full border border-border/60
          text-muted shrink-0 font-body">
          {track.musicinfo.tags.genres[0]}
        </span>
      )}

      {/* Duration */}
      <div className="flex items-center gap-1 shrink-0 text-muted">
        <Clock size={11} />
        <span className="text-xs font-body">{fmtDuration(track.duration)}</span>
      </div>
    </motion.div>
  );
}
