import { getMovieDetails } from '@/lib/vega-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const link = searchParams.get('link') || '';
    const provider = searchParams.get('provider') || 'moviebox';

    console.log("[v0] API route /movies/details - link:", link, "provider:", provider);

    if (!link) {
      return NextResponse.json({ error: 'Link required' }, { status: 400 });
    }

    const details = await getMovieDetails(link, provider);
    
    if (!details) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      data: details 
    });
  } catch (error) {
    console.error("[v0] Details API error:", error);
    return NextResponse.json({ 
      error: 'Failed to fetch movie details',
      success: false 
    }, { status: 500 });
  }
}
