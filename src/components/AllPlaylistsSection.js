'use client';

import { useAllPlaylists } from '../hooks/useAllPlaylists';
import Link from 'next/link';
import { useState } from 'react';

export default function AllPlaylistsSection() {
  const { playlists, loading, error, isUsingMockData, totalCount } = useAllPlaylists();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, name, videos

  // Filter playlists based on search term
  const filteredPlaylists = playlists.filter(playlist =>
    playlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort playlists based on selected criteria
  const sortedPlaylists = [...filteredPlaylists].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      case 'name':
        return a.title.localeCompare(b.title);
      case 'videos':
        return b.itemCount - a.itemCount;
      case 'newest':
      default:
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDescription = (description, maxLength = 120) => {
    if (!description) return 'No description available';
    return description.length > maxLength 
      ? description.substring(0, maxLength) + '...' 
      : description;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">All Playlists</h2>
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <span className="text-gray-300">Loading playlists...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && !isUsingMockData) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">All Playlists</h2>
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-300 mb-2">Failed to load playlists</p>
              <p className="text-gray-400 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            All Playlists
            <span className="text-blue-400 ml-2">({totalCount})</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore all playlist collections from Tamil Gaming channel
          </p>
          {isUsingMockData && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-900/50 border border-yellow-500 rounded-lg">
              <span className="text-yellow-300 text-sm">📡 Using mock data - Check your internet connection</span>
            </div>
          )}
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search playlists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-gray-300 text-sm">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="videos">Most Videos</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-gray-300">
              Found {sortedPlaylists.length} playlist{sortedPlaylists.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Playlists Grid */}
        {sortedPlaylists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? 'No playlists found' : 'No playlists available'}
            </h3>
            <p className="text-gray-400">
              {searchTerm ? 'Try adjusting your search terms' : 'Check back later for new content'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/480x360/1f2937/9ca3af?text=No+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {playlist.itemCount} videos
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-blue-600 rounded-full p-3 transform hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 hover:text-blue-400 transition-colors">
                    {playlist.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                    {formatDescription(playlist.description)}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{formatDate(playlist.publishedAt)}</span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      {playlist.channelTitle}
                    </span>
                  </div>
                  
                  {/* Action Button */}
                  <Link
                    href={`/simulators?playlist=${playlist.id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    View Playlist
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button (for future pagination) */}
        {sortedPlaylists.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-400">
              Showing all {sortedPlaylists.length} playlists
            </p>
          </div>
        )}
      </div>
    </section>
  );
}