// 'use client';
// import { useState, useEffect } from 'react';

// export function useSimulatorVideos() {
//   const [videos, setVideos] = useState([]);
//   const [playlists, setPlaylists] = useState([]);
//   const [groupedVideos, setGroupedVideos] = useState({});
//   const [groupedPlaylists, setGroupedPlaylists] = useState({});
//   const [gameStats, setGameStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isUsingMockData, setIsUsingMockData] = useState(false);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const response = await fetch('/api/fetchSimulatorVideos');
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         setVideos(data.videos || []);
//         setPlaylists(data.playlists || []);
//         setGroupedVideos(data.groupedVideos || {});
//         setGroupedPlaylists(data.groupedPlaylists || {});
//         setGameStats(data.gameStats || []);
//         setIsUsingMockData(data.isUsingMockData || false);
        
//         if (data.error) {
//           setError(data.error);
//         }
        
//       } catch (err) {
//         console.error('Error fetching videos:', err);
//         setError(err.message);
//         setVideos([]);
//         setPlaylists([]);
//         setGroupedVideos({});
//         setGroupedPlaylists({});
//         setGameStats([]);
//         setIsUsingMockData(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const refetch = () => {
//     setLoading(true);
//     setError(null);
//     fetchVideos();
//   };

//   return {
//     videos,
//     playlists,
//     groupedVideos,
//     groupedPlaylists,
//     gameStats,
//     loading,
//     error,
//     isUsingMockData,
//     refetch,
//     hasVideos: videos.length > 0
//   };
// }

// export default useSimulatorVideos;