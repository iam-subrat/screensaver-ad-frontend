import React, { useState } from "react";
import { uploadTemplate } from "../services/assetApi";

export default function TemplateUploadPage() {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setSuccess(false);
        setError(null);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setSuccess(false);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file || !name.trim()) {
            setError("Please provide both template name and video file");
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(false);

        try {
            await uploadTemplate(file, name.trim());
            setSuccess(true);
            setFile(null);
            setName("");
        } catch (err) {
            setError(err.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <h2>Upload Video Template</h2>
            <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 8 }}>
                    Template Name:
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter template name"
                        style={{
                            marginLeft: 8,
                            padding: "4px 8px",
                            width: "300px",
                        }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 8 }}>
                    Video File:
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        style={{ marginLeft: 8 }}
                    />
                </label>
            </div>
            <button
                onClick={handleUpload}
                disabled={!file || !name.trim() || uploading}
            >
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {success && (
                <div style={{ color: "green", marginTop: 16 }}>
                    Upload successful!
                </div>
            )}
            {error && (
                <div style={{ color: "red", marginTop: 16 }}>{error}</div>
            )}
        </div>
    );
}
