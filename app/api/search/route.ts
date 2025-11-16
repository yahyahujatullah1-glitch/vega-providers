import { searchMovies } from '@/lib/vega-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const provider = searchParams.get('provider') || 'moviebox';

    console.log("[v0] API route /search - query:", query, "provider:", provider);

    if (!query) {
      return NextResponse.json({ error: 'Search query required' }, { status: 400 });
    }

    const results = await searchMovies(query, provider);
    
    return NextResponse.json({ 
      success: true,
      data: results,
      count: results.length 
    });
  } catch (error) {
    console.error("[v0] Search API error:", error);
    return NextResponse.json({ 
      error: 'Search failed',
      success: false 
    }, { status: 500 });
  }
}
