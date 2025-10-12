import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAssetStatus from '../hooks/useAssetStatus';
import AssetStatus from '../components/AssetStatus';
import Navbar from '../components/Navbar';
import './AssetDetailPage.css';

const AssetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { asset, loading, error } = useAssetStatus(id);

  if (loading) {
    return (
      <div className="asset-detail-page">
        <Navbar />
        <div className="container">
          <div className="loading">Loading asset details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="asset-detail-page">
        <Navbar />
        <div className="container">
          <div className="error">
            <p>Error loading asset: {error}</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Back to Assets
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="asset-detail-page">
        <Navbar />
        <div className="container">
          <div className="error">
            <p>Asset not found</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Back to Assets
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="asset-detail-page">
      <Navbar />
      <div className="container">
        <button onClick={() => navigate('/')} className="btn-back">
          ← Back to Assets
        </button>
        
        <div className="asset-detail">
          <div className="asset-header">
            <h1>{asset.name || `Asset ${asset.id}`}</h1>
            <AssetStatus status={asset.status} />
          </div>

          <div className="asset-info">
            <div className="info-item">
              <label>Asset ID:</label>
              <span>{asset.id}</span>
            </div>
            <div className="info-item">
              <label>Created:</label>
              <span>{new Date(asset.createdAt).toLocaleString()}</span>
            </div>
            <div className="info-item">
              <label>Status:</label>
              <span className={`status-${asset.status}`}>{asset.status}</span>
            </div>
            {asset.fileType && (
              <div className="info-item">
                <label>File Type:</label>
                <span>{asset.fileType}</span>
              </div>
            )}
            {asset.fileSize && (
              <div className="info-item">
                <label>File Size:</label>
                <span>{(asset.fileSize / 1024).toFixed(2)} KB</span>
              </div>
            )}
          </div>

          {asset.status === 'ready' && asset.adUrl && (
            <div className="ad-preview">
              <h2>Ad Preview</h2>
              <div className="ad-container">
                {asset.fileType?.startsWith('image/') ? (
                  <img src={asset.adUrl} alt="Generated Ad" />
                ) : asset.fileType?.startsWith('video/') ? (
                  <video controls src={asset.adUrl} />
                ) : (
                  <div className="ad-placeholder">
                    <a href={asset.adUrl} target="_blank" rel="noopener noreferrer">
                      View Ad
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {asset.status === 'processing' && (
            <div className="processing-message">
              <p>Your asset is being processed. The ad will be available soon.</p>
              <div className="spinner"></div>
            </div>
          )}

          {asset.status === 'failed' && (
            <div className="error-message">
              <p>Processing failed. Please try uploading again.</p>
              <button onClick={() => navigate('/upload')} className="btn-primary">
                Upload New Asset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;
