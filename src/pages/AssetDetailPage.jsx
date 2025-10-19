import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAssetStatus from "../hooks/useAssetStatus";
import { getAssetURLs, fetchTemplates } from "../services/assetApi";
import AssetStatus from "../components/AssetStatus";
import TVFrame from "../components/TVFrame";
import Navbar from "../components/Navbar";
import "./AssetDetailPage.css";

const AssetDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { asset, loading, error } = useAssetStatus(id);
    const [assetURLs, setAssetURLs] = useState({
        inputURL: null,
        outputURL: null,
    });
    const [urlLoading, setUrlLoading] = useState(false);
    const [urlError, setUrlError] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [templatesLoading, setTemplatesLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    // Format file size
    const formatFileSize = (bytes) => {
        if (!bytes) return "N/A";
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    // Fetch presigned URLs when asset is loaded
    useEffect(() => {
        const fetchAssetURLs = async () => {
            if (!asset || !asset.id) return;
            try {
                setUrlLoading(true);
                setUrlError(null);
                const urls = await getAssetURLs(asset.id, 60); // 60 minutes expiration
                setAssetURLs(urls);
            } catch (err) {
                console.error("Error fetching asset URLs:", err);
                setUrlError(err.message || "Failed to load asset preview");
            } finally {
                setUrlLoading(false);
            }
        };
        fetchAssetURLs();
    }, [asset]);

    // Fetch templates
    useEffect(() => {
        const loadTemplates = async () => {
            try {
                setTemplatesLoading(true);
                const data = await fetchTemplates();
                setTemplates(data);
            } catch (err) {
                setTemplates([]);
            } finally {
                setTemplatesLoading(false);
            }
        };
        loadTemplates();
    }, []);

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
                        <button
                            onClick={() => navigate("/")}
                            className="btn-primary"
                        >
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
                        <button
                            onClick={() => navigate("/")}
                            className="btn-primary"
                        >
                            Back to Assets
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const renderPreviewContent = (url, contentType) => {
        if (!url) {
            return (
                <div className="empty-state">
                    <p>No preview available</p>
                </div>
            );
        }

        if (contentType?.startsWith("image/")) {
            return (
                <img
                    src={url}
                    alt="Preview"
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                    }}
                />
            );
        } else if (contentType?.startsWith("video/")) {
            return (
                <video
                    controls
                    src={url}
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                    }}
                >
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return (
                <div className="preview-unavailable">
                    <p>Preview not available for this file type</p>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        Download File
                    </a>
                </div>
            );
        }
    };

    return (
        <div className="asset-detail-page">
            <Navbar />
            <div className="container">
                <div className="asset-detail-header">
                    <h1>{asset.file_name || `Asset ${asset.id}`}</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="btn-secondary"
                    >
                        ← Back to Assets
                    </button>
                </div>

                <div className="asset-detail-content">
                    <div className="asset-detail-section">
                        <h2>Templates</h2>
                        {templatesLoading ? (
                            <div className="loading">Loading templates...</div>
                        ) : templates.length === 0 ? (
                            <div className="empty-state">
                                No templates found.
                            </div>
                        ) : (
                            <ul style={{ paddingLeft: 0 }}>
                                {templates.map((template) => (
                                    <li
                                        key={template.name}
                                        style={{
                                            listStyle: "none",
                                            marginBottom: 8,
                                        }}
                                    >
                                        <button
                                            style={{
                                                background:
                                                    selectedTemplate?.name ===
                                                    template.name
                                                        ? "#007bff"
                                                        : "#eee",
                                                color:
                                                    selectedTemplate?.name ===
                                                    template.name
                                                        ? "#fff"
                                                        : "#333",
                                                border: "1px solid #ccc",
                                                borderRadius: 4,
                                                padding: "6px 12px",
                                                cursor: "pointer",
                                                marginRight: 8,
                                            }}
                                            onClick={() =>
                                                setSelectedTemplate(template)
                                            }
                                        >
                                            {template.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {selectedTemplate && (
                            <div style={{ marginTop: 16 }}>
                                <TVFrame
                                    title={
                                        selectedTemplate.name ||
                                        "Template Preview"
                                    }
                                    videoUrl={selectedTemplate.url}
                                />
                            </div>
                        )}
                    </div>
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
                                <span>
                                    {new Date(
                                        asset.uploaded_at || asset.created_at
                                    ).toLocaleString()}
                                </span>
                            </div>
                            {asset.processed_at && (
                                <div className="asset-detail-field">
                                    <label>Processed At</label>
                                    <span>
                                        {new Date(
                                            asset.processed_at
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            )}
                            <div className="asset-detail-field">
                                <label>Last Updated</label>
                                <span>
                                    {new Date(
                                        asset.updated_at
                                    ).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {urlLoading ? (
                        <div className="asset-detail-section">
                            <div className="loading">Loading previews...</div>
                        </div>
                    ) : urlError ? (
                        <div className="asset-detail-section">
                            <div className="error-message">
                                <p>{urlError}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="preview-grid">
                            <div className="preview-column">
                                <div className="asset-detail-section">
                                    <h2>Asset Preview</h2>
                                    <div className="asset-preview">
                                        {renderPreviewContent(
                                            assetURLs.inputURL,
                                            asset.content_type
                                        )}
                                        <div
                                            style={{
                                                display: "none",
                                                textAlign: "center",
                                                padding: "20px",
                                            }}
                                        >
                                            <p>Failed to load preview</p>
                                            {assetURLs.inputURL && (
                                                <a
                                                    href={assetURLs.inputURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-primary"
                                                >
                                                    Download File
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {assetURLs.outputURL &&
                                asset.status === "processed" && (
                                    <div className="preview-column">
                                        <div className="asset-detail-section">
                                            <h2>Screensaver Preview</h2>
                                            <TVFrame
                                                title="Screensaver Ad Output"
                                                videoUrl={assetURLs.outputURL}
                                            />
                                        </div>
                                    </div>
                                )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssetDetailPage;
