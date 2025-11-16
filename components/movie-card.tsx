'use client'

import { useState } from 'react'

interface MovieCardProps {
  movie: any
  onClick: () => void
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const movieImage = movie.image || movie.poster
  
  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-video">
        {movieImage ? (
          <img 
            src={movieImage || "/placeholder.svg"}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-semibold text-gray-400 p-4"
            style={{
              backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {movie.title}
          </div>
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center transition-all">
            <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition text-2xl">
              ▶
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <p className="text-white font-semibold text-sm line-clamp-2">{movie.title}</p>
          {movie.type && (
            <p className="text-gray-300 text-xs mt-1">{movie.type}</p>
          )}
        </div>

        {movie.provider && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded capitalize">
            {movie.provider}
          </span>
        )}
      </div>
    </div>
  )
}
