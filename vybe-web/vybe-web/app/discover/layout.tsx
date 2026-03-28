import { Suspense } from 'react';
export default function DiscoverLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen bg-void" />}>{children}</Suspense>;
}
