import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAsset } from '../services/assetApi';
import FileUpload from '../components/FileUpload';
import Navbar from '../components/Navbar';
import './UploadPage.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const result = await uploadAsset(file);
      
      // Redirect to asset detail page on success
      navigate(`/asset/${result.id}`);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload asset. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <Navbar />
      <div className="container">
        <div className="upload-content">
          <h1>Upload Creative Asset</h1>
          <p className="subtitle">
            Upload your creative asset to generate a screensaver ad
          </p>

          <FileUpload
            onFileSelect={handleFileSelect}
            disabled={uploading}
          />

          {file && (
            <div className="file-info">
              <h3>Selected File</h3>
              <p><strong>Name:</strong> {file.name}</p>
              <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
              <p><strong>Type:</strong> {file.type}</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="button-group">
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="btn-primary"
              disabled={!file || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
