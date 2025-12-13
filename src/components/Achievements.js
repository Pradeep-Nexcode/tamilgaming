'use client';
import { useSimulatorVideos } from '../hooks/useSimulatorVideos';
import { detectGameType } from '../utils/gameDetection';

export default function Achievements() {
  const { videos, playlists, gameStats, loading, isUsingMockData } = useSimulatorVideos();

  // Calculate achievements from video data
  const calculateAchievements = () => {
    if (!videos.length) return null;

    // Most popular video (by view count if available, otherwise first video)
    const mostPopularVideo = videos.reduce((prev, current) => {
      const prevViews = parseInt(prev.statistics?.viewCount || '0');
      const currentViews = parseInt(current.statistics?.viewCount || '0');
      return currentViews > prevViews ? current : prev;
    }, videos[0]);

    // Most popular game type
    const gameTypeCounts = {};
    videos.forEach(video => {
      const gameType = detectGameType(video.title, video.description || '');
      if (!gameTypeCounts[gameType.name]) {
        gameTypeCounts[gameType.name] = { count: 0, gameType, totalViews: 0 };
      }
      gameTypeCounts[gameType.name].count++;
      gameTypeCounts[gameType.name].totalViews += parseInt(video.statistics?.viewCount || '0');
    });

    const mostPopularGame = Object.values(gameTypeCounts).reduce((prev, current) => {
      return current.count > prev.count ? current : prev;
    }, Object.values(gameTypeCounts)[0]);

    // Total views across all videos
    const totalViews = videos.reduce((sum, video) => {
      return sum + parseInt(video.statistics?.viewCount || '0');
    }, 0);

    // Years active
    const years = videos.map(video => new Date(video.publishedAt).getFullYear());
    const yearsActive = Math.max(...years) - Math.min(...years) + 1;

    // Longest series (most videos in a game type)
    const longestSeries = Object.values(gameTypeCounts).reduce((prev, current) => {
      return current.count > prev.count ? current : prev;
    }, Object.values(gameTypeCounts)[0]);

    return {
      totalJobs: gameStats.length,
      totalEpisodes: videos.length,
      totalSeries: playlists.length,
      totalViews,
      yearsActive,
      mostPopularVideo,
      mostPopularGame,
      longestSeries
    };
  };

  const achievements = calculateAchievements();

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const achievementsList = [
    {
      id: 'master-simulator',
      title: 'Master Simulator',
      description: `Conquered ${achievements?.totalJobs || 0}+ different simulator games`,
      icon: '🏆',
      color: 'from-yellow-400 to-orange-500',
      unlocked: (achievements?.totalJobs || 0) >= 5
    },
    {
      id: 'content-creator',
      title: 'Content Creator Extraordinaire',
      description: `Created ${achievements?.totalEpisodes || 0}+ simulator episodes`,
      icon: '🎬',
      color: 'from-purple-400 to-pink-500',
      unlocked: (achievements?.totalEpisodes || 0) >= 50
    },
    {
      id: 'view-magnet',
      title: 'View Magnet',
      description: `Attracted ${formatNumber(achievements?.totalViews || 0)} total views`,
      icon: '👁️',
      color: 'from-blue-400 to-cyan-500',
      unlocked: (achievements?.totalViews || 0) >= 1000000
    },
    {
      id: 'series-master',
      title: 'Series Master',
      description: `Completed ${achievements?.totalSeries || 0}+ simulator series`,
      icon: '📚',
      color: 'from-green-400 to-emerald-500',
      unlocked: (achievements?.totalSeries || 0) >= 3
    },
    {
      id: 'veteran-gamer',
      title: 'Veteran Gamer',
      description: `${achievements?.yearsActive || 0}+ years of simulator gaming`,
      icon: '⭐',
      color: 'from-red-400 to-rose-500',
      unlocked: (achievements?.yearsActive || 0) >= 2
    },
    {
      id: 'dedication-award',
      title: 'Dedication Award',
      description: `${achievements?.longestSeries?.count || 0}+ episodes in ${achievements?.longestSeries?.gameType?.name || 'a single game'}`,
      icon: '🎯',
      color: 'from-indigo-400 to-purple-500',
      unlocked: (achievements?.longestSeries?.count || 0) >= 10
    }
  ];

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Murugesan&apos;s Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-pulse">
                <div className="w-16 h-16 bg-white/20 rounded-full mb-4"></div>
                <div className="h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Murugesan&apos;s Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Celebrating the incredible milestones in Murugesan&apos;s simulator gaming journey
          </p>
        </div>

        {!achievements ? (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-white mb-2">Achievements Loading</h3>
              <p className="text-gray-300">
                {isUsingMockData 
                  ? "Add YouTube API key to see real achievements"
                  : "No simulator data found for achievements"}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Main Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  {achievements.totalJobs}
                </div>
                <div className="text-gray-300">Different Jobs</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {achievements.totalEpisodes}
                </div>
                <div className="text-gray-300">Total Episodes</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {formatNumber(achievements.totalViews)}
                </div>
                <div className="text-gray-300">Total Views</div>
              </div>
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {achievements.yearsActive}
                </div>
                <div className="text-gray-300">Years Active</div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {achievementsList.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 transform hover:scale-105 ${
                    achievement.unlocked 
                      ? 'border-white/20 hover:border-white/40' 
                      : 'border-gray-600/20 opacity-60'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 bg-gradient-to-r ${achievement.color}`}>
                    {achievement.icon}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${
                    achievement.unlocked ? 'text-white' : 'text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  {!achievement.unlocked && (
                    <div className="mt-3 text-xs text-gray-500">
                      🔒 Not yet unlocked
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Hall of Fame */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Hall of Fame</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Most Popular Video */}
                <div className="text-center">
                  <div className="text-6xl mb-4">🎥</div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Most Popular Episode</h4>
                  <p className="text-white font-medium mb-2 line-clamp-2">
                    {achievements.mostPopularVideo?.title || 'N/A'}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {formatNumber(parseInt(achievements.mostPopularVideo?.statistics?.viewCount || '0'))} views
                  </p>
                </div>
                
                {/* Most Popular Game */}
                <div className="text-center">
                  <div className="text-6xl mb-4">{achievements.mostPopularGame?.gameType?.icon || '🎮'}</div>
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Favorite Profession</h4>
                  <p className="text-white font-medium mb-2">
                    {achievements.mostPopularGame?.gameType?.name || 'Various Simulators'}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {achievements.mostPopularGame?.count || 0} episodes
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* API Status */}
        {isUsingMockData && (
          <div className="mt-8 text-center">
            <div className="bg-yellow-900/50 border border-yellow-500/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-200 text-sm">
                🔑 Demo mode - Add YouTube API key to see real achievement data
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}