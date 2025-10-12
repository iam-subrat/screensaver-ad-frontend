import { useState, useEffect, useCallback } from 'react';
import { fetchAssetById } from '../services/assetApi';

/**
 * Custom hook to poll asset status
 * Automatically polls the asset status every 5 seconds if status is 'processing'
 */
const useAssetStatus = (assetId, pollingInterval = 5000) => {
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAsset = useCallback(async () => {
    if (!assetId) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const data = await fetchAssetById(assetId);
      setAsset(data);
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching asset ${assetId}:`, err);
      setError(err.message || 'Failed to fetch asset');
      setLoading(false);
    }
  }, [assetId]);

  useEffect(() => {
    // Initial fetch
    fetchAsset();

    // Set up polling if status is processing
    let intervalId;
    if (asset?.status === 'processing') {
      intervalId = setInterval(() => {
        fetchAsset();
      }, pollingInterval);
    }

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchAsset, asset?.status, pollingInterval]);

  return {
    asset,
    loading,
    error,
    refetch: fetchAsset,
  };
};

export default useAssetStatus;
