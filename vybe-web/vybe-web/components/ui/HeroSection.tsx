'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Headphones, Zap, Shield, ChevronDown } from 'lucide-react';
import { Track } from '@/lib/types';
import { usePlayerStore } from '../player/PlayerStore';

const HeroScene = dynamic(() => import('../three/HeroScene'), { ssr: false });

const PILLS = [
  { icon: Zap,       text: '600K+ Free Tracks'  },
  { icon: Shield,    text: 'Zero Data Sold'      },
  { icon: Headphones,text: 'No Ads. Ever.'       },
];

export default function HeroSection({ featuredTrack }: { featuredTrack: Track | null }) {
  const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

  const handlePlay = () => {
    if (!featuredTrack) return;
    if (currentTrack?.id === featuredTrack.id) togglePlay();
    else setTrack(featuredTrack);
  };

  const sceneIsPlaying = currentTrack != null && isPlaying;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-void bg-grid">
      {/* Deep radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]
          rounded-full bg-purple-DEFAULT/8 blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px]
          rounded-full bg-cyan-DEFAULT/6 blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px]
          rounded-full bg-pink-DEFAULT/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full
        grid lg:grid-cols-2 gap-12 items-center py-20">

        {/* ── Left: Text ─────────────────────────────────────── */}
        <div className="space-y-8">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 text-xs font-body font-semibold
              px-3 py-1.5 rounded-full border border-purple-500/40 bg-purple-600/10 text-purple-light">
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
              Creative Commons · 100% Legal · Always Free
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="font-display font-black leading-none">
              <span className="block text-5xl sm:text-7xl text-white">YOUR</span>
              <span className="block text-5xl sm:text-7xl bg-gradient-to-r from-purple-light via-cyan-DEFAULT to-pink-DEFAULT
                bg-clip-text text-transparent text-glow mt-1">MUSIC.</span>
              <span className="block text-5xl sm:text-7xl text-white mt-1">YOUR VYBE.</span>
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-ghost font-body text-lg max-w-md leading-relaxed">
            Stream over 600,000 Creative Commons tracks. Powered by AI mood detection.
            Zero ads, zero tracking, zero compromise.
          </motion.p>

          {/* Pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3">
            {PILLS.map(({ icon: Icon, text }, i) => (
              <span key={i} className="flex items-center gap-2 text-xs font-body px-3 py-2
                rounded-full bg-card/80 border border-border/60 text-ghost">
                <Icon size={13} className="text-cyan-DEFAULT" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center">
            {featuredTrack && (
              <button onClick={handlePlay}
                className="group flex items-center gap-3 px-6 py-3.5 rounded-2xl font-body font-semibold
                  bg-gradient-to-r from-purple-DEFAULT to-cyan-dark text-white
                  shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)]
                  transition-all duration-300 hover:scale-105">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Play size={16} className="fill-white text-white ml-0.5" />
                </span>
                Play Featured Track
              </button>
            )}
            <Link href="/discover"
              className="px-6 py-3.5 rounded-2xl font-body font-semibold border border-purple-500/50
                text-white hover:bg-purple-600/15 transition-all duration-300 hover:border-purple-500">
              Browse Genres →
            </Link>
          </motion.div>

          {/* Featured track mini info */}
          {featuredTrack && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-border/40
                backdrop-blur-sm max-w-xs">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                <Image src={featuredTrack.album_image || featuredTrack.image || '/placeholder.png'}
                  alt={featuredTrack.name} fill sizes="40px" className="object-cover" unoptimized />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted font-body">Featured Now</p>
                <p className="text-white text-sm font-body font-medium truncate">{featuredTrack.name}</p>
                <p className="text-muted text-xs truncate">{featuredTrack.artist_name}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Right: 3D Scene ─────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative h-[500px] lg:h-[600px] w-full">
          <HeroScene isPlaying={sceneIsPlaying} />

          {/* Floating labels */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-8 right-8 px-3 py-2 rounded-xl bg-card/80 backdrop-blur-md
              border border-cyan-DEFAULT/30 text-cyan-DEFAULT text-xs font-body shadow-[0_0_15px_rgba(0,217,255,0.2)]">
            🎵 Live Stream
          </motion.div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 left-4 px-3 py-2 rounded-xl bg-card/80 backdrop-blur-md
              border border-pink-DEFAULT/30 text-pink-DEFAULT text-xs font-body shadow-[0_0_15px_rgba(255,45,135,0.2)]">
            🔓 Always Free
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted flex flex-col items-center gap-1">
        <span className="text-xs font-body">Scroll to explore</span>
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
