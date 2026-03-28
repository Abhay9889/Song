import { Suspense } from 'react';
import HeroSection from '@/components/ui/HeroSection';
import TrendingSection from '@/components/ui/TrendingSection';
import GenresSection from '@/components/ui/GenresSection';
import NewReleasesSection from '@/components/ui/NewReleasesSection';
import StatsBar from '@/components/ui/StatsBar';
import { getTrending, getNewReleases } from '@/lib/jamendo';
import { Track } from '@/lib/types';

export const revalidate = 3600;

export default async function HomePage() {
  let trending: Track[] = [];
  let newReleases: Track[] = [];

  try {
    [trending, newReleases] = await Promise.all([
      getTrending(50),
      getNewReleases(40),
    ]);
  } catch {
    // show empty state — client can retry
  }

  return (
    <div className="relative">
      {/* Hero with 3D scene */}
      <HeroSection featuredTrack={trending[0] ?? null} />

      {/* Stats bar */}
      <StatsBar />

      {/* Trending tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <TrendingSection tracks={trending} />
          <NewReleasesSection tracks={newReleases} />
        </div>
      </section>

      {/* Genres */}
      <GenresSection />
    </div>
  );
}
