import React from 'react';
import './AssetStatus.css';

const statusConfig = {
  uploaded: {
    label: 'Uploaded',
    className: 'status-pending',
    icon: '⏳'
  },
  processed: {
    label: 'Processed',
    className: 'status-approved',
    icon: '✓'
  }
};

const AssetStatus = ({ status }) => {
  const config = statusConfig[status] || statusConfig.uploaded;

  return (
    <div className={`asset-status ${config.className}`}>
      <span className="status-icon">{config.icon}</span>
      <span className="status-label">{config.label}</span>
    </div>
  );
};

export default AssetStatus;
