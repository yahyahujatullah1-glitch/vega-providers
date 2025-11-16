'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Hero from '@/components/hero'
import MovieGrid from '@/components/movie-grid'
import MovieModal from '@/components/movie-modal'
import SearchBar from '@/components/search-bar'

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCatalog, setSelectedCatalog] = useState('all')

  return (
    <main className="min-h-screen bg-black">
      <Header />
      {!searchQuery && <Hero />}
      <div className="px-4 md:px-8 py-8">
        <SearchBar 
          onSearch={setSearchQuery}
          onCatalogChange={setSelectedCatalog}
        />
        {searchQuery ? (
          <MovieGrid 
            searchQuery={searchQuery}
            catalog={selectedCatalog}
            onSelectMovie={setSelectedMovie}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Search for movies or shows to get started</p>
          </div>
        )}
      </div>
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  )
}
