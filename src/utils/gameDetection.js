// Game detection configuration
export const SIMULATOR_GAMES = {
  'truck': {
    name: 'Truck Simulator',
    keywords: ['truck', 'lorry', 'transport', 'delivery', 'cargo'],
    icon: '🚛',
    color: '#FF6B35'
  },
  'flight': {
    name: 'Flight Simulator',
    keywords: ['flight', 'pilot', 'airplane', 'aircraft', 'aviation', 'fly'],
    icon: '✈️',
    color: '#4A90E2'
  },
  'farming': {
    name: 'Farming Simulator',
    keywords: ['farm', 'farmer', 'agriculture', 'tractor', 'harvest', 'crop'],
    icon: '🌾',
    color: '#7ED321'
  },
  'cinema': {
    name: 'Cinema Simulator',
    keywords: ['cinema', 'movie', 'theater', 'film', 'director'],
    icon: '🎬',
    color: '#9013FE'
  },
  'streamer': {
    name: 'Streamer Life Simulator',
    keywords: ['streamer', 'streaming', 'youtuber', 'content', 'creator'],
    icon: '🎥',
    color: '#FF4081'
  },
  'prison': {
    name: 'Prison Simulator',
    keywords: ['prison', 'prisoner', 'jail', 'inmate', 'cell'],
    icon: '🚔',
    color: '#607D8B'
  },
  'police': {
    name: 'Police Simulator',
    keywords: ['police', 'cop', 'officer', 'patrol', 'law'],
    icon: '👮',
    color: '#2196F3'
  },
  'life': {
    name: 'Life Simulator',
    keywords: ['life', 'real life', 'daily', 'routine', 'lifestyle'],
    icon: '🏠',
    color: '#FF9800'
  },
  'job': {
    name: 'Job Simulator',
    keywords: ['job', 'work', 'career', 'profession', 'office'],
    icon: '💼',
    color: '#795548'
  },
  'other': {
    name: 'Other Simulators',
    keywords: ['simulator', 'simulation', 'sim'],
    icon: '🎮',
    color: '#9E9E9E'
  }
};

/**
 * Detect game type from title and description
 * @param {string} title - Video or playlist title
 * @param {string} description - Video or playlist description
 * @returns {string} - Game type key
 */
export function detectGameType(title, description = '') {
  const text = `${title} ${description}`.toLowerCase();
  
  // Check each game type for keyword matches
  for (const [gameKey, gameConfig] of Object.entries(SIMULATOR_GAMES)) {
    if (gameKey === 'other') continue; // Skip 'other' for now
    
    const hasKeyword = gameConfig.keywords.some(keyword => 
      text.includes(keyword.toLowerCase())
    );
    
    if (hasKeyword) {
      return gameKey;
    }
  }
  
  // If no specific game detected but contains simulator keywords, return 'other'
  const simulatorKeywords = ['simulator', 'simulation', 'sim'];
  const hasSimulatorKeyword = simulatorKeywords.some(keyword => 
    text.includes(keyword.toLowerCase())
  );
  
  return hasSimulatorKeyword ? 'other' : null;
}

/**
 * Group videos by game type
 * @param {Array} videos - Array of video objects
 * @returns {Object} - Object with game types as keys and video arrays as values
 */
export function groupVideosByGame(videos) {
  const grouped = {};
  
  videos.forEach(video => {
    const gameType = detectGameType(video.title, video.description);
    
    if (gameType) {
      if (!grouped[gameType]) {
        grouped[gameType] = [];
      }
      grouped[gameType].push({
        ...video,
        gameType,
        gameInfo: SIMULATOR_GAMES[gameType]
      });
    }
  });
  
  return grouped;
}

/**
 * Group playlists by game type
 * @param {Array} playlists - Array of playlist objects
 * @returns {Object} - Object with game types as keys and playlist arrays as values
 */
export function groupPlaylistsByGame(playlists) {
  const grouped = {};
  
  playlists.forEach(playlist => {
    const gameType = detectGameType(playlist.title, playlist.description);
    
    if (gameType) {
      if (!grouped[gameType]) {
        grouped[gameType] = [];
      }
      grouped[gameType].push({
        ...playlist,
        gameType,
        gameInfo: SIMULATOR_GAMES[gameType]
      });
    }
  });
  
  return grouped;
}

/**
 * Get all unique game types from videos and playlists
 * @param {Array} videos - Array of video objects
 * @param {Array} playlists - Array of playlist objects
 * @returns {Array} - Array of game type objects with stats
 */
export function getGameStats(videos = [], playlists = []) {
  const gameStats = {};
  
  // Count videos by game type
  videos.forEach(video => {
    const gameType = detectGameType(video.title, video.description);
    if (gameType) {
      if (!gameStats[gameType]) {
        gameStats[gameType] = {
          ...SIMULATOR_GAMES[gameType],
          gameType,
          videoCount: 0,
          playlistCount: 0
        };
      }
      gameStats[gameType].videoCount++;
    }
  });
  
  // Count playlists by game type
  playlists.forEach(playlist => {
    const gameType = detectGameType(playlist.title, playlist.description);
    if (gameType) {
      if (!gameStats[gameType]) {
        gameStats[gameType] = {
          ...SIMULATOR_GAMES[gameType],
          gameType,
          videoCount: 0,
          playlistCount: 0
        };
      }
      gameStats[gameType].playlistCount++;
    }
  });
  
  return Object.values(gameStats).sort((a, b) => 
    (b.videoCount + b.playlistCount) - (a.videoCount + a.playlistCount)
  );
}