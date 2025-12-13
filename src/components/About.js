'use client';

const About = () => {
  const stats = [
    { label: 'Simulator Games', value: '4+', icon: '🎮' },
    { label: 'Comedy Videos', value: '66+', icon: '😂' },
    { label: 'Simulator Views', value: '12.8M', icon: '👁️' },
    { label: 'Entertainment Rate', value: '100%', icon: '⭐' }
  ];

  const tags = [
    { name: 'Simulator Master', color: '#9333EA' },
    { name: 'Comedy Legend', color: '#DC2626' },
    { name: 'Virtual Entrepreneur', color: '#059669' },
    { name: 'Escape Artist', color: '#D97706' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Meet the <span className="text-orange-400">Simulator Legend</span>
            </h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                Murugesan isn&apos;t just a gamer – he&apos;s a <strong className="text-white">comedic virtuoso</strong> who transforms 
                every simulator experience into pure entertainment gold. With his signature Tamil commentary 
                and impeccable timing, he brings life to virtual worlds like no other.
              </p>
              
              <p className="text-lg">
                From building streaming empires to orchestrating elaborate prison breaks, Murugesan&apos;s 
                approach to simulator games is both <strong className="text-orange-400">strategic and hilarious</strong>. 
                His ability to find humor in the most mundane virtual tasks has earned him a dedicated 
                following across Tamil Gaming&apos;s community.
              </p>
              
              <p className="text-lg">
                Whether he&apos;s navigating complex life decisions in Life Simulator or mastering various 
                careers in Job Simulator, Murugesan&apos;s <strong className="text-white">authentic reactions</strong> and 
                comedic insights create unforgettable moments that keep viewers coming back for more.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-white font-medium text-sm transition-all duration-300 hover:scale-105"
                  style={{background: `linear-gradient(135deg, ${tag.color}, ${tag.color}80)`}}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Visual & Stats */}
          <div className="space-y-8">
            {/* Character Visual Placeholder */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-white">
                M
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Murugesan</h3>
              <p className="text-orange-400 font-medium">The Simulator Legend</p>
              <p className="text-gray-400 text-sm mt-2">Master of Virtual Worlds & Comedy</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 text-center hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-orange-400 mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6">
              <blockquote className="text-white italic text-center mb-3">
                &ldquo;Every simulator is a new adventure waiting to become a comedy masterpiece&rdquo;
              </blockquote>
              <cite className="text-gray-400 text-sm text-center block">- Murugesan, Simulator Legend</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;