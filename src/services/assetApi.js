// API Base URL - update this to match your backend endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

/**
 * Fetch all assets
 */
export const fetchAssets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets`);

    if (!response.ok) {
      throw new Error('Failed to fetch assets');
    }

    const responseJson = await response.json();
    // Backend returns { assets: [...], total: number, limit: number, offset: number }
    return responseJson.assets || [];
  } catch (error) {
    console.error('Error fetching assets:', error);
    throw error;
  }
};

/**
 * Fetch a single asset by ID
 */
export const fetchAssetById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch asset ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching asset ${id}:`, error);
    throw error;
  }
};

/**
 * Upload a new asset
 */
export const uploadAsset = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);

    const response = await fetch(`${API_BASE_URL}/assets`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload asset');
    }

    const result = await response.json();
    // Backend returns { message: string, asset: {...} }
    return result.asset;
  } catch (error) {
    console.error('Error uploading asset:', error);
    throw error;
  }
};

/**
 * Update asset status
 */
export const updateAssetStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update asset status');
    }

    const result = await response.json();
    // Backend returns { message: string, asset: {...} }
    return result.asset;
  } catch (error) {
    console.error(`Error updating asset ${id} status:`, error);
    throw error;
  }
};

/**
 * Delete an asset
 */
export const deleteAsset = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to delete asset ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting asset ${id}:`, error);
    throw error;
  }
};

/**
 * Get presigned URL for an asset
 */
export const getAssetURL = async (id, expirationMinutes = 60) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/assets/${id}/url?expiration=${expirationMinutes}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get asset URL');
    }

    const result = await response.json();
    // Backend returns { url: string, expires_in: number }
    return result.url;
  } catch (error) {
    console.error(`Error getting asset ${id} URL:`, error);
    throw error;
  }
};
