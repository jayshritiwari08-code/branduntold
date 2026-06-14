import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const path = request.nextUrl.searchParams.get('path');

  // Validate secret token to prevent unauthorized cache purging
  const expectedSecret = process.env.REVALIDATION_SECRET || 'some_long_random_string';
  if (secret !== expectedSecret) {
    return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
  }

  if (!path) {
    return NextResponse.json({ message: 'Missing "path" parameter (e.g. /articles/slug-name)' }, { status: 400 });
  }

  try {
    // Purge Next.js cache for this route instantly
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: err.message || 'Revalidation failed' }, { status: 500 });
  }
}
