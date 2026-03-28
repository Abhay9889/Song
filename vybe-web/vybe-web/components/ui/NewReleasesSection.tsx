'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Track } from '@/lib/types';
import TrackCard from './TrackCard';

export default function NewReleasesSection({ tracks }: { tracks: Track[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? tracks : tracks.slice(0, 10);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-DEFAULT to-blue-500
            flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-white">New Releases</h2>
            <p className="text-muted text-xs font-body mt-0.5">Fresh from the artists</p>
          </div>
        </div>
        <button onClick={() => setShowAll(s => !s)}
          className="text-xs font-body text-cyan-DEFAULT hover:text-white transition-colors border
            border-cyan-DEFAULT/30 px-3 py-1.5 rounded-lg hover:border-cyan-DEFAULT/60">
          {showAll ? 'Show Less' : `See All (${tracks.length})`}
        </button>
      </div>

      <div className="space-y-2">
        {visible.map((track, i) => (
          <motion.div key={track.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.4 }}>
            <TrackCard track={track} queue={tracks} index={i} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
