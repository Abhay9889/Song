'use client';
import { motion } from 'framer-motion';

const STATS = [
  { value: '600K+',  label: 'Free Tracks'      },
  { value: '400K+',  label: 'Artists'           },
  { value: '100%',   label: 'Creative Commons'  },
  { value: '0',      label: 'Ads / Data Sold'   },
];

export default function StatsBar() {
  return (
    <div className="border-y border-border/30 bg-card/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center">
              <p className="font-display font-black text-3xl sm:text-4xl
                bg-gradient-to-r from-purple-light to-cyan-DEFAULT bg-clip-text text-transparent">
                {value}
              </p>
              <p className="text-muted text-sm font-body mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
