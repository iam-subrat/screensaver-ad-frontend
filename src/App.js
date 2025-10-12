import React, { useState } from 'react';
import './App.css';

function App() {
  const [creative, setCreative] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCreative(file);
      // Simulate API call to backend
      setLoading(true);
      setTimeout(() => {
        setResults({
          fileName: file.name,
          size: (file.size / 1024).toFixed(2) + ' KB',
          type: file.type,
          uploadDate: new Date().toLocaleString()
        });
        setLoading(false);
      }, 1500);
    }
  };

  const handleRefresh = () => {
    setCreative(null);
    setResults(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Screensaver Ad Creative Manager</h1>
      </header>
      
      <main className="App-main">
        <div className="upload-section">
          <h2>Upload Creative</h2>
          <input 
            type="file" 
            onChange={handleFileUpload}
            accept="image/*,video/*"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="upload-button">
            Choose File
          </label>
        </div>

        {loading && (
          <div className="loading">
            <p>Processing creative...</p>
          </div>
        )}

        {results && (
          <div className="results-section">
            <h2>Creative Details</h2>
            <div className="results-content">
              <p><strong>File Name:</strong> {results.fileName}</p>
              <p><strong>File Size:</strong> {results.size}</p>
              <p><strong>File Type:</strong> {results.type}</p>
              <p><strong>Upload Date:</strong> {results.uploadDate}</p>
            </div>
            <button onClick={handleRefresh} className="refresh-button">
              Refresh / Upload New
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
