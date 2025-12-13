import { useState, useEffect } from 'react';

export default function useAllVideos({
  page = 1,
  limit = 20,
  search = '',
  sortBy = 'publishedAt',
  sortOrder = 'desc'
} = {}) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState(null);
  const [needsSync, setNeedsSync] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sortBy,
          sortOrder
        });
        
        if (search) {
          params.append('search', search);
        }
        
        const response = await fetch(`/api/allVideos?${params}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch videos');
        }
        
        setVideos(data.videos || []);
        setTotalCount(data.totalCount || 0);
        setTotalPages(data.totalPages || 0);
        setHasNextPage(data.hasNextPage || false);
        setHasPrevPage(data.hasPrevPage || false);
        setLastSyncDate(data.lastSyncDate);
        setNeedsSync(data.needsSync || false);
        
      } catch (err) {
        console.error('Error fetching all videos:', err);
        setError(err.message);
        setVideos([]);
        setTotalCount(0);
        setTotalPages(0);
        setHasNextPage(false);
        setHasPrevPage(false);
        setNeedsSync(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page, limit, search, sortBy, sortOrder]);

  const refetch = () => {
    setLoading(true);
    // Trigger useEffect by updating a dependency
    const fetchVideos = async () => {
      try {
        setError(null);
        
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sortBy,
          sortOrder
        });
        
        if (search) {
          params.append('search', search);
        }
        
        const response = await fetch(`/api/allVideos?${params}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch videos');
        }
        
        setVideos(data.videos || []);
        setTotalCount(data.totalCount || 0);
        setTotalPages(data.totalPages || 0);
        setHasNextPage(data.hasNextPage || false);
        setHasPrevPage(data.hasPrevPage || false);
        setLastSyncDate(data.lastSyncDate);
        setNeedsSync(data.needsSync || false);
        
      } catch (err) {
        console.error('Error refetching all videos:', err);
        setError(err.message);
        setVideos([]);
        setTotalCount(0);
        setTotalPages(0);
        setHasNextPage(false);
        setHasPrevPage(false);
        setNeedsSync(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  };

  return {
    videos,
    loading,
    error,
    totalCount,
    totalPages,
    hasNextPage,
    hasPrevPage,
    lastSyncDate,
    needsSync,
    refetch
  };
}