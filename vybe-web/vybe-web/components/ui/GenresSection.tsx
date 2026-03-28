'use client';
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';
import { GENRES } from '@/lib/types';
import GenreCard from './GenreCard';

export default function GenresSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-border/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-DEFAULT to-purple-DEFAULT
          flex items-center justify-center">
          <LayoutGrid size={16} className="text-white" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl text-white">Browse by Genre</h2>
          <p className="text-muted text-sm font-body">Find your perfect sound</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {GENRES.map((genre, i) => (
          <GenreCard key={genre.tag} genre={genre} index={i} />
        ))}
      </div>
    </section>
  );
}
