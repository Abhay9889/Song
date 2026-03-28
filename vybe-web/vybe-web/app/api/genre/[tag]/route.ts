import { NextRequest, NextResponse } from 'next/server';
import { getByGenre } from '@/lib/jamendo';

export async function GET(_req: NextRequest, { params }: { params: { tag: string } }) {
  try {
    const tracks = await getByGenre(params.tag, 40);
    return NextResponse.json(tracks);
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
