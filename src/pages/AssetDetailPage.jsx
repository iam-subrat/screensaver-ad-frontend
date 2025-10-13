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

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

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
          <div className="empty-state">
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
        <div className="asset-detail-header">
          <h1>{asset.file_name || `Asset ${asset.id}`}</h1>
          <button onClick={() => navigate('/')} className="btn-secondary">
            ← Back to Assets
          </button>
        </div>

        <div className="asset-detail-content">
          <div className="asset-detail-section">
            <h2>Asset Information</h2>
            <div className="asset-detail-info">
              <div className="asset-detail-field">
                <label>Asset ID</label>
                <span>{asset.id}</span>
              </div>
              <div className="asset-detail-field">
                <label>File Name</label>
                <span>{asset.file_name}</span>
              </div>
              <div className="asset-detail-field">
                <label>Content Type</label>
                <span>{asset.content_type}</span>
              </div>
              <div className="asset-detail-field">
                <label>File Size</label>
                <span>{formatFileSize(asset.file_size)}</span>
              </div>
              <div className="asset-detail-field">
                <label>Status</label>
                <AssetStatus status={asset.status} />
              </div>
              <div className="asset-detail-field">
                <label>Uploaded At</label>
                <span>{new Date(asset.uploaded_at || asset.created_at).toLocaleString()}</span>
              </div>
              <div className="asset-detail-field">
                <label>Last Updated</label>
                <span>{new Date(asset.updated_at).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="asset-detail-section">
            <h2>Storage Information</h2>
            <div className="asset-detail-info">
              <div className="asset-detail-field">
                <label>S3 Bucket</label>
                <span>{asset.s3_bucket}</span>
              </div>
              <div className="asset-detail-field">
                <label>S3 Key</label>
                <span style={{ wordBreak: 'break-all' }}>{asset.s3_key}</span>
              </div>
            </div>
          </div>

          {asset.status === 'processed' && (
            <div className="asset-detail-section">
              <h2>Asset Preview</h2>
              <div className="asset-preview">
                {asset.content_type?.startsWith('image/') ? (
                  <img
                    src={`https://${asset.s3_bucket}.s3.amazonaws.com/${asset.s3_key}`}
                    alt={asset.file_name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : asset.content_type?.startsWith('video/') ? (
                  <video
                    controls
                    src={`https://${asset.s3_bucket}.s3.amazonaws.com/${asset.s3_key}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                <div style={{ display: 'none', textAlign: 'center', padding: '20px' }}>
                  <p>Preview not available</p>
                </div>
              </div>
            </div>
          )}

          {asset.status === 'uploaded' && (
            <div className="asset-detail-section">
              <div className="empty-state">
                <p>Asset is uploaded and is being processed.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;
