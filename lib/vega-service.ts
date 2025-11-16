// Mock service that simulates vega-providers functionality
// This allows the app to work without external dependencies

interface Post {
  id?: string;
  title: string;
  image: string;
  link: string;
  type?: string;
  provider?: string;
  description?: string;
  poster?: string;
}

interface Info {
  title: string;
  synopsis?: string;
  description?: string;
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

const mockMovies: Post[] = [
  {
    id: 'the-shawshank-redemption',
    title: 'The Shawshank Redemption',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=750&fit=crop',
    link: 'the-shawshank-redemption',
    type: 'movie',
    description: 'Two imprisoned men bond over a number of years.'
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    link: 'the-dark-knight',
    type: 'movie',
    description: 'Batman faces off against a criminal mastermind.'
  },
  {
    id: 'inception',
    title: 'Inception',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750&fit=crop',
    link: 'inception',
    type: 'movie',
    description: 'A skilled thief infiltrates dreams to steal secrets.'
  },
  {
    id: 'pulp-fiction',
    title: 'Pulp Fiction',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=750&fit=crop',
    link: 'pulp-fiction',
    type: 'movie',
    description: 'Multiple interconnected stories of crime in Los Angeles.'
  },
  {
    id: 'forrest-gump',
    title: 'Forrest Gump',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    link: 'forrest-gump',
    type: 'movie',
    description: 'A man with a low IQ witnesses key historical events.'
  },
  {
    id: 'the-matrix',
    title: 'The Matrix',
    image: 'https://images.unsplash.com/photo-1536440936383-f1d3a0dd42ef?w=500&h=750&fit=crop',
    link: 'the-matrix',
    type: 'movie',
    description: 'A computer hacker discovers the nature of his reality.'
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=750&fit=crop',
    link: 'interstellar',
    type: 'movie',
    description: 'A team of explorers travel through a wormhole in space.'
  },
  {
    id: 'fight-club',
    title: 'Fight Club',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop',
    link: 'fight-club',
    type: 'movie',
    description: 'An insomniac office worker joins a secret society.'
  }
];

export async function searchMovies(query: string, provider: string = 'moviebox'): Promise<Post[]> {
  console.log("[v0] Searching for movies:", query, "on provider:", provider);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter movies based on query
  const results = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.description?.toLowerCase().includes(query.toLowerCase())
  );
  
  console.log("[v0] Search results:", results.length);
  
  return results.map(movie => ({
    ...movie,
    provider: provider
  }));
}

export async function getMovieDetails(link: string, provider: string = 'moviebox'): Promise<Info | null> {
  console.log("[v0] Fetching movie details:", link, "from provider:", provider);
  
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const movieData = mockMovies.find(m => 
    m.link === link || m.link === link.replace('/movie/', '')
  );
  
  if (!movieData) {
    console.warn("[v0] Movie not found:", link);
    return null;
  }
  
  const details: Info = {
    title: movieData.title,
    synopsis: movieData.description || 'An epic story with stunning visuals and compelling narrative.',
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
  
  const baseLink = link.replace('/movie/', '');
  
  const streams: Stream[] = [
    {
      server: `${provider} - Server 1`,
      link: `https://example.com/watch/${baseLink}?provider=${provider}&quality=1080p`,
      quality: '1080p',
      type: 'streaming'
    },
    {
      server: `${provider} - Server 2`,
      link: `https://example.com/watch/${baseLink}?provider=${provider}&quality=720p`,
      quality: '720p',
      type: 'streaming'
    },
    {
      server: `${provider} - Download`,
      link: `https://example.com/download/${baseLink}?provider=${provider}`,
      quality: '1080p',
      type: 'download'
    }
  ];
  
  console.log("[v0] Stream links found:", streams.length);
  return streams;
}

export async function getProviderCatalog(provider: string = 'moviebox'): Promise<Post[]> {
  console.log("[v0] Fetching catalog for provider:", provider);
  
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockMovies.map(movie => ({
    ...movie,
    provider: provider
  }));
}

export function getAvailableProviders(): string[] {
  return ['moviebox', 'movies4u'];
}
