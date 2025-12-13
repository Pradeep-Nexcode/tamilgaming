'use client';
import { useSimulatorVideos } from '../hooks/useSimulatorVideos';

export default function HeroSection() {
  const { videos, playlists, gameStats, loading, isUsingMockData } = useSimulatorVideos();
  
  const totalVideos = videos.length;
  const totalPlaylists = playlists.length;
  const totalGames = gameStats.length;
  const latestVideo = videos[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Hero Content */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-6 animate-pulse">
            MURUGESAN
          </h1>
          <div className="text-2xl md:text-4xl font-semibold text-white mb-4 animate-fade-in-up">
            <span className="text-yellow-400">Farmer.</span>{' '}
            <span className="text-blue-400">Pilot.</span>{' '}
            <span className="text-green-400">Streamer.</span>{' '}
            <span className="text-red-400">Police.</span>{' '}
            <span className="text-purple-400">Prisoner.</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
            <span className="text-yellow-400 font-bold">Murugesan lives all lives.</span> 
            Experience every simulator adventure through the eyes of Tamil Gaming&apos;s legendary character.
          </p>
          
          {/* Dynamic Counter */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-4 border border-yellow-500/30 max-w-2xl mx-auto mb-8">
            <p className="text-lg text-white">
              <span className="text-yellow-400 font-bold">
                Tamil Gaming has played {loading ? '...' : `${totalGames}+`} simulators
              </span>
              {' '}with Murugesan across {loading ? '...' : totalVideos} epic episodes!
            </p>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-bold text-yellow-400 mb-2">
              {loading ? '...' : totalVideos}
            </div>
            <div className="text-gray-300 text-lg">Episodes</div>
            <div className="text-gray-400 text-sm mt-2">
              {isUsingMockData ? 'Demo data' : 'Live content'}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {loading ? '...' : totalPlaylists}
            </div>
            <div className="text-gray-300 text-lg">Series</div>
            <div className="text-gray-400 text-sm mt-2">
              Complete collections
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {loading ? '...' : `${totalGames}+`}
            </div>
            <div className="text-gray-300 text-lg">Games</div>
            <div className="text-gray-400 text-sm mt-2">
              Different simulators
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              ∞
            </div>
            <div className="text-gray-300 text-lg">Lives</div>
            <div className="text-gray-400 text-sm mt-2">
              Endless possibilities
            </div>
          </div>
        </div>

        {/* Latest Video Highlight */}
        {latestVideo && !loading && (
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8 max-w-2xl mx-auto">
            <div className="text-sm text-yellow-400 mb-2">🔥 LATEST ADVENTURE</div>
            <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
              {latestVideo.title}
            </h3>
            <div className="text-gray-400 text-sm">
              {new Date(latestVideo.publishedAt).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => document.getElementById('simulator-library')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            🎮 Explore All Simulators
          </button>
          <a
            href="https://www.youtube.com/@TamilGaming"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
          >
            📺 Watch on YouTube
          </a>
        </div>

        {/* API Status */}
        {isUsingMockData && (
          <div className="mt-8 bg-yellow-900/50 border border-yellow-500/50 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-yellow-200 text-sm">
              🔑 Demo mode - Add YouTube API key to see live Tamil Gaming content
            </p>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}