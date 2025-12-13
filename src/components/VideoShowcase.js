'use client';

export default function VideoShowcase({ game, loading = false }) {
  if (loading) {
    return (
      <div className="mt-4 space-y-3">
        <div className="aspect-video rounded-lg overflow-hidden bg-black/20 animate-pulse flex items-center justify-center">
          <div className="text-white/40">Loading video...</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-3 bg-white/20 rounded animate-pulse w-32"></div>
          <div className="h-6 bg-white/20 rounded animate-pulse w-24"></div>
        </div>
      </div>
    );
  }

  if (!game.youtubeVideoId) {
    return null;
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="aspect-video rounded-lg overflow-hidden bg-black/20">
        <iframe
          src={`https://www.youtube.com/embed/${game.youtubeVideoId}`}
          title={game.realVideoTitle || game.title}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-white/60">Tamil Gaming • Simulator Series</span>
          {game.isRealVideo && (
            <span className="text-xs text-green-400 font-medium">✓ Real Video</span>
          )}
        </div>
        <a 
          href={`https://www.youtube.com/watch?v=${game.youtubeVideoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs rounded-full hover:from-red-700 hover:to-red-800 transition-colors"
        >
          Watch Full Video
        </a>
      </div>
      {game.realVideoTitle && game.realVideoTitle !== game.title && (
        <div className="text-xs text-white/50 italic">
          Original: {game.realVideoTitle}
        </div>
      )}
    </div>
  );
}