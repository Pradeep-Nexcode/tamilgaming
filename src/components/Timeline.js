'use client';

const Timeline = ({ timelineEvents }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simulator <span className="text-orange-400">Journey</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow Murugesan&apos;s evolution across different simulator games and milestones.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-pink-500"></div>
          
          {timelineEvents.map((item, index) => (
            <div key={index} className="relative flex items-start mb-12 last:mb-0">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-orange-500 rounded-full border-4 border-gray-900 z-10"></div>
              
              {/* Content */}
              <div className="ml-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="text-xl font-bold text-white mb-2 sm:mb-0">{item.title}</h3>
                  <span className="text-orange-400 font-medium text-sm bg-orange-500/10 px-3 py-1 rounded-full">
                    {item.date}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-300 font-medium">{item.game}</span>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">{item.description}</p>
                
                {item.achievements && (
                  <div className="flex flex-wrap gap-2">
                    {item.achievements.map((achievement, achIndex) => (
                      <span
                        key={achIndex}
                        className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Future Plans */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">What&apos;s Next?</h3>
            <p className="text-gray-300 mb-6">
              More simulator adventures are coming! Stay tuned for new games, epic moments, and hilarious content from Murugesan.
            </p>
            <button className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105" style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF8A5B 100%)', color: '#FFFFFF'}}>
              Subscribe for Updates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;