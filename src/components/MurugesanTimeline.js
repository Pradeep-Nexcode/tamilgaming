'use client';
import { useSimulatorVideos } from '../hooks/useSimulatorVideos';
import { detectGameType } from '../utils/gameDetection';

export default function MurugesanTimeline() {
  const { videos, loading, isUsingMockData } = useSimulatorVideos();

  // Create timeline data from videos
  const createTimeline = () => {
    if (!videos.length) return [];

    const timelineData = videos.map(video => {
      const gameType = detectGameType(video.title, video.description || '');
      const year = new Date(video.publishedAt).getFullYear();
      return {
        year,
        gameType,
        video,
        date: new Date(video.publishedAt)
      };
    });

    // Group by year and game type
    const groupedByYear = timelineData.reduce((acc, item) => {
      if (!acc[item.year]) acc[item.year] = {};
      if (!acc[item.year][item.gameType.name]) {
        acc[item.year][item.gameType.name] = {
          gameType: item.gameType,
          videos: [],
          firstDate: item.date
        };
      }
      acc[item.year][item.gameType.name].videos.push(item.video);
      if (item.date < acc[item.year][item.gameType.name].firstDate) {
        acc[item.year][item.gameType.name].firstDate = item.date;
      }
      return acc;
    }, {});

    // Convert to timeline format
    const timeline = [];
    Object.keys(groupedByYear).sort((a, b) => parseInt(a) - parseInt(b)).forEach(year => {
      Object.values(groupedByYear[year]).forEach(gameData => {
        timeline.push({
          year: parseInt(year),
          ...gameData,
          videoCount: gameData.videos.length
        });
      });
    });

    return timeline.sort((a, b) => a.firstDate - b.firstDate);
  };

  const timeline = createTimeline();

  const getJobDescription = (gameType) => {
    const descriptions = {
      'Farming Simulator': 'Started his journey as a humble farmer, tending crops and managing livestock',
      'Flight Simulator': 'Took to the skies as a commercial pilot, navigating through clouds and storms',
      'Truck Simulator': 'Hit the highways as a long-haul trucker, delivering cargo across continents',
      'Bus Simulator': 'Became a public transport hero, safely carrying passengers to their destinations',
      'Train Simulator': 'Mastered the rails as a locomotive engineer, managing complex railway systems',
      'Police Simulator': 'Served and protected as a law enforcement officer, maintaining peace and order',
      'Prison Simulator': 'Experienced life behind bars, learning about rehabilitation and justice',
      'Streamer Simulator': 'Entered the digital world as a content creator, building an online empire',
      'Cinema Simulator': 'Managed movie theaters, bringing entertainment to the masses',
      'Other': 'Explored various other virtual professions and life experiences'
    };
    return descriptions[gameType.name] || descriptions['Other'];
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Murugesan&apos;s Job Timeline
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center mb-12">
                <div className="w-20 h-20 bg-white/10 rounded-full animate-pulse mr-8"></div>
                <div className="flex-1">
                  <div className="h-6 bg-white/10 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Murugesan&apos;s Job Timeline
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow Murugesan&apos;s incredible journey through different professions and life experiences
          </p>
        </div>

        {timeline.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-2">Timeline Coming Soon</h3>
              <p className="text-gray-300">
                {isUsingMockData 
                  ? "Add YouTube API key to see Murugesan's job timeline"
                  : "No simulator videos found to create timeline"}
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="relative">
              <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-red-500 to-purple-500"></div>
              
              {timeline.map((item, index) => (
                <div key={`${item.year}-${item.gameType.name}`} className="relative flex items-start mb-12 group">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white border-4 border-white/20 group-hover:border-white/40 transition-all duration-300 transform group-hover:scale-110"
                      style={{ backgroundColor: item.gameType.color }}
                    >
                      {item.gameType.icon}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      {item.year}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-bold text-white">
                        {item.gameType.name === 'Other' ? 'Various Simulators' : item.gameType.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                          {item.videoCount} episode{item.videoCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {getJobDescription(item.gameType)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Started: {item.firstDate.toLocaleDateString()}
                      </div>
                      <button className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-200">
                        View Episodes →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Summary */}
        {timeline.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-yellow-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Career Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {timeline.length}
                  </div>
                  <div className="text-gray-300">Different Professions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {timeline.reduce((sum, item) => sum + item.videoCount, 0)}
                  </div>
                  <div className="text-gray-300">Total Episodes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {Math.max(...timeline.map(item => item.year)) - Math.min(...timeline.map(item => item.year)) + 1}
                  </div>
                  <div className="text-gray-300">Years Active</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Status */}
        {isUsingMockData && (
          <div className="mt-8 text-center">
            <div className="bg-yellow-900/50 border border-yellow-500/50 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-yellow-200 text-sm">
                🔑 Demo mode - Add YouTube API key to see real timeline data
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}