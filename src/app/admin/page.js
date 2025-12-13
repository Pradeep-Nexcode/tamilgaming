"use client";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import TabSwitcher from "@/components/admin/TabSwitcher";
import StatsVideos from "@/components/admin/StatsVideos";
import StatsPlaylists from "@/components/admin/StatsPlaylists";
import FiltersBar from "@/components/admin/FiltersBar";
import VideoCard from "@/components/admin/VideoCard";
import PlaylistCard from "@/components/admin/PlaylistCard";

export default function AdminVideosPage() {
  const [activeTab, setActiveTab] = useState("videos");
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);
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

  const loadPlaylists = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/playlists");
      const data = await res.json();
      setPlaylists(data.playlists || []);
    } catch (error) {
      console.error("Error loading playlists:", error);
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

  const syncPlaylists = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/playlists/sync", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Synced: ${data.newPlaylistsAdded} new playlists added!`);
        loadPlaylists();
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
    loadPlaylists();
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

  let filteredPlaylists = playlists.filter((p) => (p.title || "").toLowerCase().includes(search.toLowerCase()));
  filteredPlaylists.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      case "oldest":
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      case "videos":
        return (b.itemCount || 0) - (a.itemCount || 0);
      default:
        return 0;
    }
  });

  const shownCount = activeTab === "videos" ? filteredVideos.length : filteredPlaylists.length;
  const totalCount = activeTab === "videos" ? videos.length : playlists.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-950 to-black">
      <AdminHeader activeTab={activeTab} syncing={syncing} onSyncVideos={syncVideos} onSyncPlaylists={syncPlaylists} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <TabSwitcher activeTab={activeTab} onChange={setActiveTab} videoCount={videos.length} playlistCount={playlists.length} />

        {activeTab === "videos" ? <StatsVideos videos={videos} /> : <StatsPlaylists playlists={playlists} />}

        <FiltersBar
          activeTab={activeTab}
          search={search}
          onSearchChange={setSearch}
          filterQuality={filterQuality}
          onFilterQualityChange={setFilterQuality}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          shownCount={shownCount}
          totalCount={totalCount}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin h-12 w-12 text-red-600 mb-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-gray-400 text-lg">Loading {activeTab}...</p>
          </div>
        ) : activeTab === "videos" ? (
          filteredVideos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No videos found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.videoId} video={video} />
              ))}
            </div>
          )
        ) : filteredPlaylists.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No playlists found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.playlistId} playlist={playlist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

