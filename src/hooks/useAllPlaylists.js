import { useState, useEffect } from 'react';

export function useAllPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchAllPlaylists = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/fetchAllPlaylists');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        setPlaylists(data.playlists || []);
        setTotalCount(data.totalCount || 0);
        setIsUsingMockData(data.isUsingMockData || false);
        
        if (data.error) {
          setError(data.error);
        }
        
      } catch (err) {
        console.error('Error fetching all playlists:', err);
        setError(err.message);
        setPlaylists([]);
        setTotalCount(0);
        setIsUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlaylists();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchAllPlaylists();
  };

  return {
    playlists,
    loading,
    error,
    isUsingMockData,
    totalCount,
    refetch
  };
}