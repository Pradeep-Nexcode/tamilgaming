"use client";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import FiltersBar from "@/components/admin/FiltersBar";
import VideoCard from "@/components/admin/VideoCard";

export default function AdminVideosOnlyPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");
  const [filterQuality, setFilterQuality] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const loadVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (error) {
      console.error("Error loading videos:", error);
    }
    setLoading(false);
  };

  const syncVideos = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/videos/sync", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Synced: ${data.newVideosAdded} new videos added!`);
        loadVideos();
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      alert(`❌ Sync failed: ${error.message}`);
    }
    setSyncing(false);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  let filteredVideos = videos.filter((v) => (v.title || "").toLowerCase().includes(search.toLowerCase()));
  if (filterQuality !== "all") {
    filteredVideos = filteredVideos.filter((v) => v.definition === filterQuality);
  }
  filteredVideos.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      case "oldest":
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      case "views":
        return (b.viewCount || 0) - (a.viewCount || 0);
      case "likes":
        return (b.likeCount || 0) - (a.likeCount || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
      <AdminHeader activeTab="videos" syncing={syncing} onSyncVideos={syncVideos} onSyncPlaylists={() => {}} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <FiltersBar
          activeTab="videos"
          search={search}
          onSearchChange={setSearch}
          filterQuality={filterQuality}
          onFilterQualityChange={setFilterQuality}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          shownCount={filteredVideos.length}
          totalCount={videos.length}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin h-12 w-12 text-red-600 mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-400 text-lg">Loading videos...</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No videos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.videoId} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

