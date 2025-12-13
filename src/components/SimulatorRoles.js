'use client';
import { useState } from 'react';
import VideoShowcase from './VideoShowcase';

const SimulatorRoles = ({ simulatorGames, loading = false, isUsingMockData = false }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredGames = selectedFilter === 'all' 
    ? simulatorGames 
    : simulatorGames.filter(game => game.id === selectedFilter);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simulator <span className="text-orange-400">Roles</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Explore Murugesan&apos;s diverse roles across different simulator games, each bringing unique comedy and entertainment.
          </p>
          {!loading && (
            <div className="flex items-center justify-center gap-2 text-sm">
              {isUsingMockData ? (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                  ⚠️ Using demo videos - Add YouTube API key for real content
                </span>
              ) : (
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                  ✓ Real Tamil Gaming videos loaded
                </span>
              )}
            </div>
          )}
        </div>

        {/* Show message if no real videos available */}
        {simulatorGames.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Real Videos Available</h3>
            <p className="text-white/70 max-w-md mx-auto mb-6">
              {isUsingMockData 
                ? "Add your YouTube API key to load real Tamil Gaming simulator videos."
                : "No simulator videos found on Tamil Gaming channel. Check back later for new content!"}
            </p>
            {isUsingMockData && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-yellow-400 text-sm">
                  💡 Add YOUTUBE_API_KEY to your .env.local file to fetch real videos
                </p>
              </div>
            )}
          </div>
        )}

        {/* Filter Buttons - only show if we have games */}
        {simulatorGames.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedFilter === 'all'
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Simulators
            </button>
            {simulatorGames.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedFilter(game.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedFilter === game.id
                    ? 'text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                style={{
                  background: selectedFilter === game.id 
                    ? `linear-gradient(135deg, ${game.color}, ${game.color}80)` 
                    : undefined
                }}
              >
                {game.icon} {game.title}
              </button>
            ))}
          </div>
        )}

        {/* Games Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Game Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                    style={{background: `linear-gradient(135deg, ${game.color}, ${game.color}80)`}}
                  >
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                    <p className="text-orange-400 font-medium">{game.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Comedy Level</div>
                  <div className="text-lg font-bold text-orange-400">{game.comedyLevel}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">{game.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{game.videos}</div>
                  <div className="text-sm text-gray-400">Videos</div>
                </div>
                <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{game.views}</div>
                  <div className="text-sm text-gray-400">Views</div>
                </div>
              </div>

              {/* YouTube Video Embed */}
              <VideoShowcase game={game} loading={loading} />

              {/* Achievements */}
              <div className="space-y-2 mb-4">
                <h4 className="text-white font-semibold">Key Achievements:</h4>
                <div className="flex flex-wrap gap-2">
                  {game.achievements?.map((achievement, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>

              {/* Real Data Display */}
              <div className="mt-4 p-3 bg-gray-700/30 rounded-lg border-l-4 border-orange-500">
                <p className="text-sm text-gray-300">
                  <span className="text-orange-400 font-medium">Real Data:</span> {game.realData}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimulatorRoles;