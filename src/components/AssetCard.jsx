import React from 'react';
import { Link } from 'react-router-dom';
import './AssetCard.css';

const AssetCard = ({ asset, viewMode = 'grid' }) => {
  const cardClassName = `asset-card asset-card-${viewMode}`;

  // Map backend status to display status
  const getStatusDisplay = (status) => {
    const statusMap = {
      'uploaded': { label: 'Uploaded', className: 'pending' },
      'processed': { label: 'Processed', className: 'approved' }
    };
    return statusMap[status] || { label: status, className: 'pending' };
  };

  const statusDisplay = getStatusDisplay(asset.status);

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Link to={`/asset/${asset.id}`} className={cardClassName}>
      <h3>{asset.file_name || `Asset ${asset.id}`}</h3>

      <p><strong>ID:</strong> {asset.id}</p>
      <p><strong>Type:</strong> {asset.content_type || 'Unknown'}</p>
      <p><strong>Size:</strong> {formatFileSize(asset.file_size)}</p>
      <p><strong>Uploaded:</strong> {new Date(asset.uploaded_at || asset.created_at).toLocaleDateString()}</p>

      <span className={`status ${statusDisplay.className}`}>
        {statusDisplay.label}
      </span>
    </Link>
  );
};

export default AssetCard;
