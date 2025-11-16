// Mock service that simulates vega-providers functionality
// This allows the app to work without external dependencies

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

// Mock movie database with realistic data
const mockMovies: Record<string, Post[]> = {
  the_shawshank_redemption: {
    title: 'The Shawshank Redemption',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop',
    link: '/movie/the-shawshank-redemption',
    type: 'movie'
  },
  the_dark_knight: {
    title: 'The Dark Knight',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    link: '/movie/the-dark-knight',
    type: 'movie'
  },
  inception: {
    title: 'Inception',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750&fit=crop',
    link: '/movie/inception',
    type: 'movie'
  },
  pulp_fiction: {
    title: 'Pulp Fiction',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=750&fit=crop',
    link: '/movie/pulp-fiction',
    type: 'movie'
  },
  forrest_gump: {
    title: 'Forrest Gump',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    link: '/movie/forrest-gump',
    type: 'movie'
  },
  the_matrix: {
    title: 'The Matrix',
    image: 'https://images.unsplash.com/photo-1536440936383-f1d3a0dd42ef?w=500&h=750&fit=crop',
    link: '/movie/the-matrix',
    type: 'movie'
  },
  interstellar: {
    title: 'Interstellar',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=750&fit=crop',
    link: '/movie/interstellar',
    type: 'movie'
  },
  fight_club: {
    title: 'Fight Club',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    link: '/movie/fight-club',
    type: 'movie'
  }
};

export async function searchMovies(query: string, provider: string = 'moviebox'): Promise<Post[]> {
  console.log("[v0] Searching for movies:", query, "on provider:", provider);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter movies based on query
  const results = Object.values(mockMovies).filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  
  console.log("[v0] Search results:", results.length);
  return results.map(movie => ({
    ...movie,
    type: provider
  }));
}

export async function getMovieDetails(link: string, provider: string = 'moviebox'): Promise<Info | null> {
  console.log("[v0] Fetching movie details:", link, "from provider:", provider);
  
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const movieKey = link.replace('/movie/', '');
  const movieData = Object.values(mockMovies).find(m => 
    m.link.includes(movieKey)
  );
  
  if (!movieData) {
    return null;
  }
  
  const details: Info = {
    title: movieData.title,
    synopsis: 'An epic story with stunning visuals and compelling narrative.',
    image: movieData.image,
    type: provider,
    imdbId: 'tt0000001',
    linkList: []
  };
  
  console.log("[v0] Movie details fetched:", details.title);
  return details;
}

export async function getStreamLinks(link: string, provider: string = 'moviebox'): Promise<Stream[]> {
  console.log("[v0] Fetching stream links:", link, "from provider:", provider);
  
  await new Promise(resolve => setTimeout(resolve, 250));
  
  const streams: Stream[] = [
    {
      server: 'Server 1',
      link: `https://example.com/watch/${link}`,
      quality: '1080p',
      type: 'streaming'
    },
    {
      server: 'Server 2',
      link: `https://example.com/download/${link}`,
      quality: '720p',
      type: 'download'
    },
    {
      server: 'Server 3',
      link: `https://example.com/stream/${link}`,
      quality: '480p',
      type: 'streaming'
    }
  ];
  
  console.log("[v0] Stream links found:", streams.length);
  return streams;
}

export async function getProviderCatalog(provider: string = 'moviebox'): Promise<any[]> {
  console.log("[v0] Fetching catalog for provider:", provider);
  
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return Object.values(mockMovies);
}

export function getAvailableProviders(): string[] {
  return ['moviebox', 'movies4u'];
}
