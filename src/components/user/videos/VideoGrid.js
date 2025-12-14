"use client";

import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

export default function VideoGrid({ search, world, sort, year }) {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);

    // Reset page on filter change
    useEffect(() => {
        setPage(1);
    }, [search, world, sort, year]);

    useEffect(() => {
        setLoading(true);

        const params = new URLSearchParams({
            search,
            world,
            sort,
            year,
            page,
            limit: 12,
        });

        fetch(`/api/videos?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setVideos(data.videos || []);
                setPagination(data.pagination);
                setLoading(false);
            });
    }, [search, world, sort, year, page]);

    return (
        <section className="bg-[var(--tamil-black)] pb-32">
            <div className="container mx-auto px-6 lg:px-12">
                {loading && (
                    <p className="font-terminal text-gray-500 text-lg">Loading…</p>
                )}

                {!loading && videos.length === 0 && (
                    <p className="font-terminal text-gray-500 text-lg">
                        No videos found.
                    </p>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {videos.map((video) => (
                        <VideoCard key={video.videoId} video={video} />
                    ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.pages > 1 && (
                    <div className="flex items-center justify-center gap-6 mt-16 font-pixel text-xs">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-4 py-2 border border-[var(--tamil-border)] disabled:opacity-30"
                        >
                            ← Prev
                        </button>

                        <span className="text-[var(--tamil-white-muted)]">
                            Page {pagination.page} / {pagination.pages}
                        </span>

                        <button
                            disabled={page === pagination.pages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 border border-[var(--tamil-border)] disabled:opacity-30"
                        >
                            Next →
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
