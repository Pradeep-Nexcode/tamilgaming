export default function TabSwitcher({ activeTab, onChange, videoCount = 0, playlistCount = 0 }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange("videos")}
        className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
          activeTab === "videos"
            ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
            : "bg-black/40 text-gray-400 hover:text-white border border-red-900/30"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Videos ({videoCount})
        </div>
      </button>

      <button
        onClick={() => onChange("playlists")}
        className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
          activeTab === "playlists"
            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
            : "bg-black/40 text-gray-400 hover:text-white border border-red-900/30"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Playlists ({playlistCount})
        </div>
      </button>
    </div>
  );
}

