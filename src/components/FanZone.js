'use client';

const FanZone = () => {
  const fanArt = [
    {
      id: 1,
      title: "Murugesan's Streaming Setup",
      artist: "@TamilFan2024",
      game: "Streamer Life Simulator 2",
      likes: 234,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Epic Prison Break Scene",
      artist: "@SimulatorArt",
      game: "Prison Escape Simulator",
      likes: 189,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Virtual Life Adventures",
      artist: "@LifeSimFan",
      game: "Life Simulator",
      likes: 156,
      image: "/api/placeholder/300/200"
    }
  ];

  const memes = [
    {
      id: 1,
      title: "When Murugesan tries to escape prison for the 50th time",
      game: "Prison Escape Simulator",
      upvotes: 567,
      comments: 23
    },
    {
      id: 2,
      title: "Murugesan's reaction to becoming a millionaire streamer",
      game: "Streamer Life Simulator 2",
      upvotes: 432,
      comments: 18
    },
    {
      id: 3,
      title: "Job Simulator: When the boss asks you to work overtime",
      game: "Job Simulator",
      upvotes: 389,
      comments: 15
    }
  ];

  const highlights = [
    {
      id: 1,
      title: "Best Streaming Moments Compilation",
      game: "Streamer Life Simulator 2",
      duration: "12:34",
      views: "45K"
    },
    {
      id: 2,
      title: "Top 10 Prison Escape Fails",
      game: "Prison Escape Simulator",
      duration: "8:56",
      views: "38K"
    },
    {
      id: 3,
      title: "Funniest Job Interview Moments",
      game: "Job Simulator",
      duration: "6:42",
      views: "29K"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simulator <span className="text-orange-400">Fan Zone</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Community creations, memes, and highlights celebrating Murugesan&apos;s simulator adventures.
          </p>
        </div>

        {/* Fan Art Gallery */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Simulator Art Gallery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fanArt.map((art) => (
              <div
                key={art.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-video bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl">🎨</span>
                </div>
                <div className="p-4">
                  <h4 className="text-white font-semibold mb-2">{art.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">by {art.artist}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-400 text-xs bg-orange-500/20 px-2 py-1 rounded">
                      {art.game}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center">
                      ❤️ {art.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prison Break Memes */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Simulator Memes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {memes.map((meme) => (
              <div
                key={meme.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="text-center mb-4">
                  <span className="text-6xl">😂</span>
                </div>
                <h4 className="text-white font-medium mb-3 text-center leading-relaxed">
                  {meme.title}
                </h4>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-orange-400 bg-orange-500/20 px-2 py-1 rounded text-xs">
                    {meme.game}
                  </span>
                  <div className="flex space-x-4 text-gray-400">
                    <span>⬆️ {meme.upvotes}</span>
                    <span>💬 {meme.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Highlights */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Community Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight) => (
              <div
                key={highlight.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🎬</span>
                  <span className="text-gray-400 text-sm">{highlight.duration}</span>
                </div>
                <h4 className="text-white font-semibold mb-3">{highlight.title}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-orange-400 text-xs bg-orange-500/20 px-2 py-1 rounded">
                    {highlight.game}
                  </span>
                  <span className="text-gray-400 text-sm">
                    👁️ {highlight.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Share Your Creations!</h3>
            <p className="text-gray-300 mb-6">
              Create fan art, memes, or highlight videos featuring Murugesan&apos;s simulator adventures and get featured in our community showcase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF8A5B 100%)', color: '#FFFFFF'}}>
                Submit Fan Art
              </button>
              <button className="px-6 py-3 rounded-lg font-medium border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-300 hover:scale-105">
                Share Meme
              </button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">#SimulatorLegend</span>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">#MurugasanMemes</span>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">#TamilGaming</span>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">#SimulatorFan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FanZone;