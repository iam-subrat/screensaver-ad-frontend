import React from 'react';
import { Link } from 'react-router-dom';
import AssetStatus from './AssetStatus';
import './AssetCard.css';

const AssetCard = ({ asset, viewMode = 'grid' }) => {
  const cardClassName = `asset-card asset-card-${viewMode}`;

  return (
    <Link to={`/asset/${asset.id}`} className={cardClassName}>
      <div className="asset-card-header">
        {asset.thumbnailUrl ? (
          <img 
            src={asset.thumbnailUrl} 
            alt={asset.name || 'Asset thumbnail'} 
            className="asset-thumbnail"
          />
        ) : (
          <div className="asset-placeholder">
            <span>📷</span>
          </div>
        )}
        <AssetStatus status={asset.status} />
      </div>
      
      <div className="asset-card-body">
        <h3 className="asset-name">
          {asset.name || `Asset ${asset.id}`}
        </h3>
        
        <div className="asset-meta">
          <span className="asset-id">ID: {asset.id}</span>
          {asset.fileType && (
            <span className="asset-type">{asset.fileType}</span>
          )}
        </div>
        
        <div className="asset-date">
          {new Date(asset.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
};

export default AssetCard;
