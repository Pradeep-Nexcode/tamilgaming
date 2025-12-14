"use client"

import { useState } from 'react'
import VideosHeader from '@/components/user/videos/VideosHeader';
import VideosSearchBar from '@/components/user/videos/VideosSearchBar';
import VideosFilters from '@/components/user/videos/VideosFilters';
// import VideoCard from '@/components/user/videos/VideoCard';
import VideoGrid from '@/components/user/videos/VideoGrid';
// import VideoCard from '@/components/user/videos/VideoCard';


export default function VideosPage() {

  const [search, setSearch] = useState("");
  const [world, setWorld] = useState("All");
  const [sort, setSort] = useState("new");
  const [year, setYear] = useState("All");
  return (
    <main className="min-h-screen bg-gray-50">
      <VideosHeader />

      <VideosSearchBar value={search} onChange={setSearch} />

      <VideosFilters
        world={world}
        setWorld={setWorld}
        sort={sort}
        setSort={setSort}
        year={year}
        setYear={setYear}
      />

      <VideoGrid
        search={search}
        world={world}
        sort={sort}
        year={year}
      />
    </main>
  );
}