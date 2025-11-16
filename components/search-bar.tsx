'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onCatalogChange: (catalog: string) => void
}

export default function SearchBar({ onSearch, onCatalogChange }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedCatalog, setSelectedCatalog] = useState('all')

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  const handleCatalogChange = (catalog: string) => {
    setSelectedCatalog(catalog)
    onCatalogChange(catalog)
    if (query) {
      onSearch(query)
    }
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search movies, shows..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-gray-400 flex-shrink-0">🎬</span>
        {['all', 'moviebox', 'movies4u'].map((catalog) => (
          <button
            key={catalog}
            onClick={() => handleCatalogChange(catalog)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition ${
              selectedCatalog === catalog
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {catalog === 'all' ? 'All Providers' : catalog.charAt(0).toUpperCase() + catalog.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
