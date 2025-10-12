import React from 'react';
import './AssetStatus.css';

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'status-pending',
    icon: '⏳'
  },
  processing: {
    label: 'Processing',
    className: 'status-processing',
    icon: '⚙️'
  },
  ready: {
    label: 'Ready',
    className: 'status-ready',
    icon: '✓'
  },
  failed: {
    label: 'Failed',
    className: 'status-failed',
    icon: '✗'
  }
};

const AssetStatus = ({ status }) => {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className={`asset-status ${config.className}`}>
      <span className="status-icon">{config.icon}</span>
      <span className="status-label">{config.label}</span>
    </div>
  );
};

export default AssetStatus;
