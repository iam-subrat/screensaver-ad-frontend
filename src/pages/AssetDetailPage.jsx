import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAssetStatus from '../hooks/useAssetStatus';
import { getAssetURL } from '../services/assetApi';
import AssetStatus from '../components/AssetStatus';
import Navbar from '../components/Navbar';
import './AssetDetailPage.css';

const AssetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { asset, loading, error } = useAssetStatus(id);
  const [assetURL, setAssetURL] = useState(null);
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlError, setUrlError] = useState(null);

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Fetch presigned URL when asset is loaded
  useEffect(() => {
    const fetchAssetURL = async () => {
      if (!asset || !asset.id) return;

      try {
        setUrlLoading(true);
        setUrlError(null);
        const url = await getAssetURL(asset.id, 60); // 60 minutes expiration
        setAssetURL(url);
      } catch (err) {
        console.error('Error fetching asset URL:', err);
        setUrlError(err.message || 'Failed to load asset preview');
      } finally {
        setUrlLoading(false);
      }
    };

    fetchAssetURL();
  }, [asset]);

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

          <div className="asset-detail-section">
            <h2>Asset Preview</h2>
            <div className="asset-preview">
              {urlLoading ? (
                <div className="loading">Loading preview...</div>
              ) : urlError ? (
                <div className="error-message">
                  <p>{urlError}</p>
                </div>
              ) : assetURL ? (
                <>
                  {asset.content_type?.startsWith('image/') ? (
                    <img
                      src={assetURL}
                      alt={asset.file_name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : asset.content_type?.startsWith('video/') ? (
                    <video
                      controls
                      src={assetURL}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="preview-unavailable">
                      <p>Preview not available for this file type</p>
                      <a
                        href={assetURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Download File
                      </a>
                    </div>
                  )}
                  <div style={{ display: 'none', textAlign: 'center', padding: '20px' }}>
                    <p>Failed to load preview</p>
                    <a
                      href={assetURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Download File
                    </a>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>No preview available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailPage;
