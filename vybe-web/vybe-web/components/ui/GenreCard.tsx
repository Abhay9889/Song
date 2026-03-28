'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Genre } from '@/lib/types';

export default function GenreCard({ genre, index }: { genre: Genre; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link href={`/discover?genre=${genre.tag}`}
        className={`relative block rounded-2xl overflow-hidden h-32 bg-gradient-to-br ${genre.gradient}
          border border-white/10 shadow-lg group cursor-pointer`}>
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <span className="text-3xl mb-1">{genre.emoji}</span>
          <h3 className="font-display text-white font-bold text-sm leading-tight">{genre.name}</h3>
          <p className="text-white/70 text-[10px] font-body mt-0.5 hidden group-hover:block transition-all">
            {genre.desc}
          </p>
        </div>
        {/* Shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
          bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%]
          group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none" />
      </Link>
    </motion.div>
  );
}
