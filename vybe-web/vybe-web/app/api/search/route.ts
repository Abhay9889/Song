import { NextRequest, NextResponse } from 'next/server';
import { searchTracks } from '@/lib/jamendo';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  if (!q.trim()) return NextResponse.json([]);
  try {
    const tracks = await searchTracks(q, 40);
    return NextResponse.json(tracks);
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
