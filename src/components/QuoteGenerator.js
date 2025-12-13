'use client';
import { useState, useEffect } from 'react';

const QuoteGenerator = ({ quotes, autoRotate = true, interval = 5000 }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoRotate);

  useEffect(() => {
    if (!isPlaying || !quotes?.length) return;

    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, quotes?.length, interval]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  if (!quotes?.length) {
    return null;
  }

  const currentQuoteData = quotes[currentQuote];

  return (
    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-orange-400 flex items-center">
          <span className="mr-2">💬</span>
          Quote of the Day
        </h3>
        <div className="flex items-center space-x-2">
          {/* Auto-play toggle */}
          <button
            onClick={toggleAutoPlay}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isPlaying 
                ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30' 
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
            title={isPlaying ? 'Pause auto-rotation' : 'Start auto-rotation'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          {/* Navigation buttons */}
          <button
            onClick={prevQuote}
            className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-all duration-300"
            title="Previous quote"
          >
            ⬅️
          </button>
          <button
            onClick={nextQuote}
            className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-all duration-300"
            title="Next quote"
          >
            ➡️
          </button>
        </div>
      </div>

      {/* Quote Content */}
      <div className="text-center">
        <blockquote className="text-white text-lg italic mb-4 leading-relaxed min-h-[3rem] flex items-center justify-center">
          &ldquo;{currentQuoteData.text}&rdquo;
        </blockquote>
        
        <div className="flex items-center justify-center space-x-4 text-sm">
          <cite className="text-gray-400 not-italic">
            - {currentQuoteData.source}
          </cite>
          {currentQuoteData.game && (
            <span className="text-orange-400 bg-orange-500/20 px-2 py-1 rounded text-xs">
              {currentQuoteData.game}
            </span>
          )}
        </div>
      </div>

      {/* Quote indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentQuote(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentQuote 
                ? 'bg-orange-400 w-6' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            title={`Quote ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar (if auto-playing) */}
      {isPlaying && (
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-1 rounded-full transition-all duration-100"
              style={{
                animation: `progress ${interval}ms linear infinite`
              }}
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default QuoteGenerator;