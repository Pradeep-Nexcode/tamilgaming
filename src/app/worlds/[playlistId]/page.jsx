"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function WorldDetail() {
  const { playlistId } = useParams();

  const [world, setWorld] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!playlistId) return;

    fetch(`/api/worlds/${playlistId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorld(data.world);
        setVideos(data.videos || []);
      });
  }, [playlistId]);

  if (!world) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading world…
      </div>
    );
  }

  return (
    <section className="bg-[var(--tamil-black)] text-white min-h-screen">

      {/* HERO */}
      <div className="relative h-screen overflow-hidden">
        {world.thumbnail && (
          <Image
            src={world.thumbnail}
            alt={world.title}
            fill
            priority
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 container mx-auto px-6 h-full flex items-end pb-20">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: world.color }}
            >
              {world.label}
            </p>

            <h1 className="text-3xl md:text-5xl font-black mb-6">
              {world.title}
            </h1>

            <p className="text-sm text-white/70 max-w-xl">
              {world.description}
            </p>
          </div>
        </div>
      </div>

      {/* VIDEOS GRID */}
      <div className="container mx-auto px-6 pb-24">
        <h2 className="text-xl font-black mb-10">
          Moments from this World
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.videoId}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-white/10 hover:border-[var(--tamil-orange)] transition"
            >
              <div className="relative h-48 overflow-hidden">
                {video.thumbnail && (
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                )}
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs text-white/50 mt-2">
                  {new Date(video.publishedAt).getFullYear()}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
