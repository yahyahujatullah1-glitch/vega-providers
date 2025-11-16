'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-600/20">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-white">
            V
          </div>
          <h1 className="text-2xl font-bold text-white hidden sm:block">
            VegaFlix
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-300 hover:text-white transition">Home</a>
          <a href="#" className="text-gray-300 hover:text-white transition">Browse</a>
          <a href="#" className="text-gray-300 hover:text-white transition">Trending</a>
        </nav>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 p-4">
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-gray-300 hover:text-white transition">Home</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Browse</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Trending</a>
          </nav>
        </div>
      )}
    </header>
  )
}
