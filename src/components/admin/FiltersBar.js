export default function FiltersBar({
  activeTab,
  search,
  onSearchChange,
  filterQuality,
  onFilterQualityChange,
  sortBy,
  onSortByChange,
  shownCount,
  totalCount
}) {
  return (
    <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-red-900/30 shadow-xl">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder={`🔍 Search ${activeTab}...`}
            className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {activeTab === "videos" && (
          <select
            value={filterQuality}
            onChange={(e) => onFilterQualityChange(e.target.value)}
            className="px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
          >
            <option value="all">All Quality</option>
            <option value="hd">HD Only</option>
            <option value="sd">SD Only</option>
          </select>
        )}

        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          {activeTab === "videos" ? (
            <>
              <option value="views">Most Viewed</option>
              <option value="likes">Most Liked</option>
            </>
          ) : (
            <option value="videos">Most Videos</option>
          )}
        </select>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
        <span>Showing {shownCount} of {totalCount} {activeTab}</span>
      </div>
    </div>
  );
}

