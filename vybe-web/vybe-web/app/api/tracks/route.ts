import { NextRequest, NextResponse } from 'next/server';
import { getTrending, getNewReleases } from '@/lib/jamendo';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') ?? 'trending';
  try {
    const tracks = type === 'new' ? await getNewReleases(40) : await getTrending(50);
    return NextResponse.json(tracks);
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
