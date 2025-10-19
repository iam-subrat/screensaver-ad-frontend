import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssetListPage from "./pages/AssetListPage";
import AssetDetailPage from "./pages/AssetDetailPage";
import UploadPage from "./pages/UploadPage";
import TemplateUploadPage from "./pages/TemplateUploadPage";
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AssetListPage />} />
                <Route path="/asset/:id" element={<AssetDetailPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route
                    path="/upload-template"
                    element={<TemplateUploadPage />}
                />
            </Routes>
        </Router>
    );
}

export default App;
