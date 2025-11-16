// Service to integrate with vega-providers for real movie data
import axios from 'axios';

interface Post {
  title: string;
  image: string;
  link: string;
  type?: string;
}

interface Info {
  title: string;
  synopsis?: string;
  image: string;
  imdbId?: string;
  type: string;
  linkList?: any[];
}

interface Stream {
  server: string;
  link: string;
  type?: string;
  quality?: string;
}

// Note: Requires vega-providers package to be installed: npm install vega-providers
const vegaProviders = require('vega-providers');

// Provider configuration
const PROVIDERS = {
  moviebox: 'moviebox',
  movies4u: 'movies4u'
};

export async function searchMovies(query: string, provider: string = 'moviebox'): Promise<Post[]> {
  try {
    console.log("[v0] Searching for movies:", query, "on provider:", provider);
    
    // Initialize provider context
    const providerContext = {
      axios,
      cheerio: require('cheerio')
    };

    // Get the provider handler
    const providerHandler = vegaProviders.getProvider(provider);
    
    if (!providerHandler) {
      console.error("[v0] Provider not found:", provider);
      return [];
    }

    // Search using the provider's getSearchPosts function
    const results = await providerHandler.getSearchPosts({
      searchQuery: query,
      page: 1,
      providerValue: provider,
      signal: new AbortController().signal,
      providerContext
    });

    console.log("[v0] Search results:", results.length);
    return results || [];
  } catch (error) {
    console.error("[v0] Error searching movies:", error);
    return [];
  }
}

export async function getMovieDetails(link: string, provider: string = 'moviebox'): Promise<Info | null> {
  try {
    console.log("[v0] Fetching movie details:", link, "from provider:", provider);
    
    const providerContext = {
      axios,
      cheerio: require('cheerio')
    };

    const providerHandler = vegaProviders.getProvider(provider);
    
    if (!providerHandler) {
      console.error("[v0] Provider not found:", provider);
      return null;
    }

    // Get metadata using the provider's getMeta function
    const metadata = await providerHandler.getMeta({
      link,
      providerContext
    });

    console.log("[v0] Movie details fetched:", metadata?.title);
    return metadata || null;
  } catch (error) {
    console.error("[v0] Error fetching movie details:", error);
    return null;
  }
}

export async function getStreamLinks(link: string, provider: string = 'moviebox'): Promise<Stream[]> {
  try {
    console.log("[v0] Fetching stream links:", link, "from provider:", provider);
    
    const providerContext = {
      axios,
      cheerio: require('cheerio')
    };

    const providerHandler = vegaProviders.getProvider(provider);
    
    if (!providerHandler) {
      console.error("[v0] Provider not found:", provider);
      return [];
    }

    // Get streaming links using the provider's getStream function
    const streams = await providerHandler.getStream({
      link,
      type: 'movie',
      signal: new AbortController().signal,
      providerContext
    });

    console.log("[v0] Stream links found:", streams?.length);
    return streams || [];
  } catch (error) {
    console.error("[v0] Error fetching stream links:", error);
    return [];
  }
}

export async function getProviderCatalog(provider: string = 'moviebox'): Promise<any[]> {
  try {
    console.log("[v0] Fetching catalog for provider:", provider);
    
    const providerHandler = vegaProviders.getProvider(provider);
    
    if (!providerHandler || !providerHandler.catalog) {
      console.error("[v0] Provider catalog not found:", provider);
      return [];
    }

    return providerHandler.catalog;
  } catch (error) {
    console.error("[v0] Error fetching catalog:", error);
    return [];
  }
}

export function getAvailableProviders(): string[] {
  return Object.values(PROVIDERS);
}
