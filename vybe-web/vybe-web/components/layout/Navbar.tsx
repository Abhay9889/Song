'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Music2, Compass, Github, ExternalLink } from 'lucide-react';
import SearchBar from '../ui/SearchBar';

const NAV = [
  { href: '/',         label: 'Home',     icon: Music2  },
  { href: '/discover', label: 'Discover', icon: Compass },
];

export default function Navbar() {
  const path = usePathname();
  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/40
      bg-void/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-DEFAULT to-cyan-DEFAULT
            flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.5)]
            group-hover:shadow-[0_0_20px_rgba(124,58,237,0.7)] transition-shadow">
            <Music2 size={16} className="text-white" />
          </div>
          <span className="font-display font-black text-white text-lg tracking-widest">VYBE</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={`relative px-4 py-2 rounded-xl text-sm font-body font-medium transition-colors
                ${path === href ? 'text-white' : 'text-muted hover:text-white'}`}>
              <span className="flex items-center gap-1.5">
                <Icon size={15} />
                {label}
              </span>
              {path === href && (
                <motion.div layoutId="nav-indicator"
                  className="absolute inset-0 rounded-xl bg-purple-600/20 border border-purple-500/40"
                  transition={{ type: 'spring', bounce: 0.25 }} />
              )}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <SearchBar />
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          <a href="https://devportal.jamendo.com" target="_blank" rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted hover:text-white
              transition-colors border border-border/60 rounded-lg px-3 py-1.5 font-body
              hover:border-purple-500/40">
            Powered by Jamendo
            <ExternalLink size={11} />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer"
            className="p-2 text-muted hover:text-white transition-colors">
            <Github size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
