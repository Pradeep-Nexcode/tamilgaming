import Image from "next/image";

export default function VideoCard({ video }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-red-900/30 shadow-xl hover:shadow-2xl hover:border-red-600/50 transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <Image width={480} height={270} src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-white">{video.duration}</div>
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded text-xs font-bold ${video.definition === "hd" ? "bg-red-600 text-white" : "bg-gray-600 text-white"}`}>{video.definition?.toUpperCase()}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-white text-lg line-clamp-2 group-hover:text-red-400 transition-colors">{video.title}</h3>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {Number(video.viewCount || 0).toLocaleString()}
          </div>

          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            {Number(video.likeCount || 0).toLocaleString()}
          </div>

          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            {Number(video.commentCount || 0).toLocaleString()}
          </div>
        </div>

        <p className="text-xs text-gray-500">{new Date(video.publishedAt).toLocaleDateString()}</p>

        <a href={video.url} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-red-600 to-red-700 text-white text-center px-4 py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium">Watch on YouTube →</a>
      </div>
    </div>
  );
}

