import { useState, useEffect, useCallback } from 'react';
import { fetchAssetById } from '../services/assetApi';

/**
 * Custom hook to fetch and manage asset status
 */
const useAssetStatus = (assetId) => {
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
    fetchAsset();
  }, [fetchAsset]);

  return {
    asset,
    loading,
    error,
    refetch: fetchAsset,
  };
};

export default useAssetStatus;
