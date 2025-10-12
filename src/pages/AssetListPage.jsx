import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAssets } from '../services/assetApi';
import AssetCard from '../components/AssetCard';
import Navbar from '../components/Navbar';
import './AssetListPage.css';

const AssetListPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const data = await fetchAssets();
      setAssets(data);
    } catch (error) {
      console.error('Failed to load assets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="asset-list-page">
      <Navbar />
      <div className="container">
        <div className="header">
          <h1>Assets</h1>
          <div className="header-actions">
            <div className="view-toggle">
              <button
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
            <Link to="/upload" className="btn-primary">
              Upload Asset
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading assets...</div>
        ) : assets.length === 0 ? (
          <div className="empty-state">
            <p>No assets found. Upload your first asset to get started!</p>
            <Link to="/upload" className="btn-primary">
              Upload Asset
            </Link>
          </div>
        ) : (
          <div className={`assets-${viewMode}`}>
            {assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetListPage;
