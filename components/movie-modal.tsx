'use client'

import { useState, useEffect } from 'react'

interface MovieModalProps {
  movie: any
  onClose: () => void
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [streamLinks, setStreamLinks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [movieDetails, setMovieDetails] = useState<any>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        setDetailsLoading(true)
        setIsLoading(true)

        // Get movie details
        const detailsParams = new URLSearchParams();
        detailsParams.append('link', movie.link || movie.id);
        detailsParams.append('provider', movie.provider || 'moviebox');

        const detailsResponse = await fetch(`/api/movies/details?${detailsParams}`);
        const detailsData = await detailsResponse.json();
        if (detailsData.success) {
          setMovieDetails(detailsData.data);
        }

        // Get stream links
        const streamsParams = new URLSearchParams();
        streamsParams.append('link', movie.link || movie.id);
        streamsParams.append('provider', movie.provider || 'moviebox');

        const streamsResponse = await fetch(`/api/movies/streams?${streamsParams}`);
        const streamsData = await streamsResponse.json();
        if (streamsData.success) {
          setStreamLinks(streamsData.data || []);
        }
      } catch (err) {
        console.error('[v0] Error fetching data:', err)
      } finally {
        setDetailsLoading(false)
        setIsLoading(false)
      }
    }

    loadMovieData()
  }, [movie])

  const title = movieDetails?.title || movie?.title || 'Movie'
  const synopsis = movieDetails?.synopsis || movie?.description || ''
  const image = movieDetails?.image || movie?.image || ''

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 md:h-80 bg-gray-800 overflow-hidden" style={{
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full transition text-xl"
          >
            ✕
          </button>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-balance">{title}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {synopsis && (
            <p className="text-gray-300 mb-6 leading-relaxed">
              {synopsis}
            </p>
          )}

          {/* Stream Links */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Watch Now</h3>
            {isLoading ? (
              <p className="text-gray-400">Loading sources...</p>
            ) : streamLinks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {streamLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition justify-center"
                  >
                    ▶ {link.quality || 'Watch'} - {link.server}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No streaming sources available.</p>
            )}
          </div>

          {/* Info and Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                isFavorite
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {isFavorite ? '❤️' : '🤍'} {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg font-semibold transition">
              🔗 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
