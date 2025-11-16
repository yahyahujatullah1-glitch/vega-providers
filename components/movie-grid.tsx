'use client'

import { useState, useEffect } from 'react'
import MovieCard from './movie-card'

interface MovieGridProps {
  searchQuery: string
  catalog: string
  onSelectMovie: (movie: any) => void
}

export default function MovieGrid({ searchQuery, catalog, onSelectMovie }: MovieGridProps) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true)
      setError('')
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) {
          queryParams.append('q', searchQuery);
        }
        if (catalog && catalog !== 'all') {
          queryParams.append('provider', catalog);
        }
        queryParams.append('provider', catalog !== 'all' ? catalog : 'moviebox');

        const response = await fetch(`/api/search?${queryParams}`);
        const data = await response.json();
        
        if (data.success) {
          setMovies(data.data || []);
        } else {
          setError('Failed to load movies');
        }
      } catch (err) {
        console.error('[v0] Error fetching movies:', err)
        setError('Failed to load movies. Please try again.')
        setMovies([])
      } finally {
        setIsLoading(false)
      }
    }

    if (searchQuery) {
      loadMovies()
    } else {
      setMovies([])
    }
  }, [searchQuery, catalog])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  if (movies.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No movies found. Try a different search.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={`${movie.id}-${movie.provider}`}
          movie={movie}
          onClick={() => onSelectMovie(movie)}
        />
      ))}
    </div>
  )
}
