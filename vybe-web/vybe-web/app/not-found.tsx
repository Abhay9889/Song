'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6">
        <h1 className="font-display font-black text-8xl bg-gradient-to-r from-purple-light to-cyan-DEFAULT
          bg-clip-text text-transparent">404</h1>
        <p className="text-ghost font-body text-xl">This vibe doesn't exist... yet.</p>
        <Link href="/"
          className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-DEFAULT to-cyan-dark
            text-white font-body font-semibold hover:scale-105 transition-transform">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
