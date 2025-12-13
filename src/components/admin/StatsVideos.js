export default function StatsVideos({ videos }) {
  const totalViews = videos.reduce((sum, v) => sum + (v.viewCount || 0), 0);
  const totalLikes = videos.reduce((sum, v) => sum + (v.likeCount || 0), 0);
  const hdVideos = videos.filter((v) => v.definition === "hd").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-red-900/50 to-red-950/50 backdrop-blur-sm p-6 rounded-xl border border-red-800/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-300 text-sm font-medium">Total Videos</p>
            <p className="text-4xl font-bold text-white mt-2">{videos.length}</p>
          </div>
          <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 backdrop-blur-sm p-6 rounded-xl border border-blue-800/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-300 text-sm font-medium">Total Views</p>
            <p className="text-4xl font-bold text-white mt-2">{(totalViews / 1000000).toFixed(1)}M</p>
          </div>
          <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-900/50 to-green-950/50 backdrop-blur-sm p-6 rounded-xl border border-green-800/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-300 text-sm font-medium">Total Likes</p>
            <p className="text-4xl font-bold text-white mt-2">{(totalLikes / 1000).toFixed(0)}K</p>
          </div>
          <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-900/50 to-purple-950/50 backdrop-blur-sm p-6 rounded-xl border border-purple-800/30 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-sm font-medium">HD Videos</p>
            <p className="text-4xl font-bold text-white mt-2">{hdVideos}</p>
            <p className="text-purple-400 text-xs mt-1">{videos.length > 0 ? ((hdVideos / videos.length) * 100).toFixed(0) : 0}% of total</p>
          </div>
          <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

