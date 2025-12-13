'use client';
import { useSimulatorVideos } from '../hooks/useSimulatorVideos';
import Link from 'next/link';
import Image from 'next/image';

export default function SimulatorLibrary() {
  const { gameStats, groupedVideos, groupedPlaylists, loading, error, isUsingMockData } = useSimulatorVideos();

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            🎮 Murugesan&apos;s Simulator Universe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && !isUsingMockData) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            🎮 Murugesan&apos;s Simulator Universe
          </h2>
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-200 mb-4">Failed to load simulator games</p>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (gameStats.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            🎮 Murugesan&apos;s Simulator Universe
          </h2>
          <div className="bg-blue-900/50 border border-blue-500 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-blue-200 mb-4">No simulator games found</p>
            {isUsingMockData && (
              <p className="text-blue-300 text-sm">
                Configure your YouTube API key to see Tamil Gaming&apos;s simulator content
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white">
            🎮 Murugesan&apos;s Simulator Universe
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore all the lives Murugesan has lived across {gameStats.length} different simulator worlds.
            From farming to flying, from streaming to surviving - every role tells a story.
          </p>
          <div className="mt-8 flex justify-center space-x-8 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-400">
                {gameStats.reduce((sum, game) => sum + game.videoCount, 0)}
              </div>
              <div className="text-gray-300">Episodes</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">
                {gameStats.reduce((sum, game) => sum + game.playlistCount, 0)}
              </div>
              <div className="text-gray-300">Series</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-400">
                {gameStats.length}
              </div>
              <div className="text-gray-300">Games</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gameStats.map((game) => {
            const gameVideos = groupedVideos[game.gameType] || [];
            const gamePlaylists = groupedPlaylists[game.gameType] || [];
            const latestVideo = gameVideos[0];
            const thumbnail = latestVideo?.thumbnail || '/placeholder-game.jpg';

            return (
              <div
                key={game.gameType}
                className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-gray-500"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={thumbnail}
                    alt={game.name}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span 
                      className="text-4xl p-2 rounded-full bg-white/20 backdrop-blur-sm"
                      style={{ backgroundColor: `${game.color}20` }}
                    >
                      {game.icon}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {game.videoCount + game.playlistCount} items
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {game.name}
                  </h3>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                    {game.videoCount > 0 && (
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                        {game.videoCount} episodes
                      </span>
                    )}
                    {game.playlistCount > 0 && (
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        {game.playlistCount} series
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm mb-6 line-clamp-2">
                    Experience Murugesan&apos;s adventures in the world of {game.name.toLowerCase()}.
                    {latestVideo && ` Latest: "${latestVideo.title.substring(0, 50)}..."`}
                  </p>

                  <Link
                    href={`/simulators/${game.gameType}`}
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <span>Explore {game.name}</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {isUsingMockData && (
          <div className="mt-12 text-center">
            <div className="bg-yellow-900/50 border border-yellow-500 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-yellow-200 mb-2">🔑 Demo Mode Active</p>
              <p className="text-yellow-300 text-sm">
                Add your YouTube API key to .env.local to see real Tamil Gaming simulator content
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}