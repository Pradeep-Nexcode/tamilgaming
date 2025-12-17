"use client";
import { useState } from "react";

export default function EditPlaylistModal({ playlist, onClose }) {
    const [title, setTitle] = useState(playlist.title || "");
    const [description, setDescription] = useState(
        playlist.description || ""
    );
    const [isFeatured, setIsFeatured] = useState(
        playlist.isFeatured || false
    );
    const [isMurugesanWorld, setIsMurugesanWorld] = useState(
        playlist.isMurugesanWorld || false
    );
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/playlists/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    playlistId: playlist.playlistId,
                    updates: {
                        title,
                        description,
                        isFeatured,
                        isMurugesanWorld,
                    },
                }),
            });

            const data = await res.json();

            if (data.success) {
                // alert("✅ Playlist updated");
                onClose();
                // window.location.reload(); // simple refresh
            } else {
                alert("❌ Update failed");
            }
        } catch (err) {
            alert("❌ Error updating playlist");
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="bg-gray-900 w-full max-w-lg rounded-xl p-6 space-y-4">
                <h2 className="text-xl text-white font-semibold">
                    Edit Playlist
                </h2>

                {/* Title */}
                <div>
                    <label className="text-gray-400 text-sm">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full mt-1 bg-gray-800 text-white px-4 py-2 rounded"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="text-gray-400 text-sm">Description</label>
                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full mt-1 bg-gray-800 text-white px-4 py-2 rounded"
                    />
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                    <span className="text-gray-300">Featured Playlist</span>
                </div>

                {/* isMurugesanWorld */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={isMurugesanWorld}
                        onChange={(e) => setIsMurugesanWorld(e.target.checked)}
                    />
                    <span className="text-gray-300">Murugesan World Playlist</span>
                </div>


                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 text-white rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
