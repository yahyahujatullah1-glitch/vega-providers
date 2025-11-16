import { getStreamLinks } from '@/lib/vega-service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const link = searchParams.get('link') || '';
    const provider = searchParams.get('provider') || 'moviebox';

    console.log("[v0] API route /movies/streams - link:", link, "provider:", provider);

    if (!link) {
      return NextResponse.json({ error: 'Link required' }, { status: 400 });
    }

    const streams = await getStreamLinks(link, provider);
    
    return NextResponse.json({ 
      success: true,
      data: streams,
      count: streams.length 
    });
  } catch (error) {
    console.error("[v0] Streams API error:", error);
    return NextResponse.json({ 
      error: 'Failed to fetch streams',
      success: false 
    }, { status: 500 });
  }
}
