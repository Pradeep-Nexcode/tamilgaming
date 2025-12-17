import Image from "next/image";
import EditPlaylistModal from "./playlist/EditPlaylistModal";
import { useState } from "react";


export default function PlaylistCard({ playlist }) {

  const [open, setOpen] = useState(false);
  return (

    <>    <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-green-900/30 shadow-xl hover:shadow-2xl hover:border-green-600/50 transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <Image width={480} height={270} src={playlist.thumbnail} alt={playlist.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 bg-black/80 px-3 py-1.5 rounded text-xs font-bold text-white flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {Number(playlist.itemCount || 0)} videos
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-white text-lg line-clamp-2 group-hover:text-green-400 transition-colors">{playlist.title}</h3>

        {playlist.description && (
          <p className="text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
        )}

        <p className="text-xs text-gray-500">Created on {new Date(playlist.publishedAt).toLocaleDateString()}</p>

        <a href={playlist.url} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-center px-4 py-2.5 rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium">View Playlist →</a>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => setOpen(true)}
        className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
      >
        Edit
      </button>
    </div>

      {open && (
        <EditPlaylistModal
          playlist={playlist}
          onClose={() => setOpen(false)}
        />

      )
      }
    </>
  );
}

