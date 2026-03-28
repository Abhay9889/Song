'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Track } from '@/lib/types';
import TrackCard from './TrackCard';

export default function TrendingSection({ tracks }: { tracks: Track[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? tracks : tracks.slice(0, 10);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-DEFAULT to-pink-DEFAULT
            flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-white">Trending Now</h2>
            <p className="text-muted text-xs font-body mt-0.5">Most popular right now</p>
          </div>
        </div>
        <button onClick={() => setShowAll(s => !s)}
          className="text-xs font-body text-purple-light hover:text-white transition-colors border
            border-purple-500/30 px-3 py-1.5 rounded-lg hover:border-purple-500/60">
          {showAll ? 'Show Less' : `See All (${tracks.length})`}
        </button>
      </div>

      <div className="space-y-2">
        {visible.map((track, i) => (
          <motion.div key={track.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}>
            <TrackCard track={track} queue={tracks} index={i} rank={i} />
          </motion.div>
        ))}
      </div>

      {!showAll && tracks.length > 10 && (
        <button onClick={() => setShowAll(true)}
          className="w-full mt-4 py-3 rounded-2xl border border-border/40 text-muted text-sm
            font-body hover:border-purple-500/40 hover:text-white transition-all duration-200
            bg-card/30 hover:bg-purple-600/10">
          + {tracks.length - 10} more tracks
        </button>
      )}
    </div>
  );
}
