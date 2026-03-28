import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import MiniPlayer from '@/components/player/MiniPlayer';
import AudioEngine from '@/components/player/AudioEngine';

export const metadata: Metadata = {
  title: 'VYBE — Free Music, Your Way',
  description: 'Stream 600,000+ Creative Commons tracks free forever. Privacy-first. No ads. No data sold.',
  keywords: ['free music', 'streaming', 'creative commons', 'jamendo', 'no ads'],
  openGraph: {
    title: 'VYBE Music',
    description: 'Free music streaming. Privacy-first. Zero ads.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-void text-white antialiased">
        <AudioEngine />
        <Navbar />
        <main className="pt-16 pb-24">{children}</main>
        <MiniPlayer />
      </body>
    </html>
  );
}
