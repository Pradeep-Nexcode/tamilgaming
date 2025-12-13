export default function StatsPlaylists({ playlists }) {
  const totalPlaylistVideos = playlists.reduce((sum, p) => sum + (p.itemCount || 0), 0);
  const largest = playlists.length > 0 ? Math.max(...playlists.map((p) => p.itemCount || 0)) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-green-900/50 to-green-950/50 backdrop-blur-sm p-6 rounded-xl border border-green-800/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-300 text-sm font-medium">Total Playlists</p>
            <p className="text-4xl font-bold text-white mt-2">{playlists.length}</p>
          </div>
          <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 backdrop-blur-sm p-6 rounded-xl border border-blue-800/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-sm font-medium">Total Videos</p>
            <p className="text-4xl font-bold text-white mt-2">{totalPlaylistVideos}</p>
            <p className="text-blue-400 text-xs mt-1">Across all playlists</p>
          </div>
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900/50 to-purple-950/50 backdrop-blur-sm p-6 rounded-xl border border-purple-800/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-sm font-medium">Avg Videos</p>
            <p className="text-4xl font-bold text-white mt-2">{playlists.length > 0 ? Math.round(totalPlaylistVideos / playlists.length) : 0}</p>
            <p className="text-purple-400 text-xs mt-1">Per playlist</p>
          </div>
          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-900/50 to-orange-950/50 backdrop-blur-sm p-6 rounded-xl border border-orange-800/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-300 text-sm font-medium">Largest Playlist</p>
            <p className="text-4xl font-bold text-white mt-2">{largest}</p>
            <p className="text-orange-400 text-xs mt-1">Videos</p>
          </div>
          <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

