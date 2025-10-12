// API Base URL - update this to match your backend endpoint
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Fetch all assets
 */
export const fetchAssets = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/assets`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch assets');
    }
    
    return await response.json();
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
    
    const response = await fetch(`${API_BASE_URL}/assets/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload asset');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading asset:', error);
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
      throw new Error(`Failed to delete asset ${id}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting asset ${id}:`, error);
    throw error;
  }
};
