'use client'

export default function Hero() {
  return (
    <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-b from-black/50 to-black overflow-hidden">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundColor: '#1a1a2e'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent flex flex-col justify-end p-4 md:p-8">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
          Featured Content
        </h2>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl text-pretty">
          Discover the latest and greatest movies from multiple providers. Stream, watch, and enjoy unlimited entertainment.
        </p>
        
        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center justify-center">
            ▶ Play
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition flex items-center justify-center">
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  )
}
