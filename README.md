# Screensaver Ad Frontend

A React-based frontend application for managing and generating screensaver ads. This application allows users to upload creative assets, monitor processing status, and view generated advertisements.

## Features

- **Asset Management**: View all uploaded assets in a grid or list view
- **Asset Upload**: Upload image and video files for ad generation
- **Status Tracking**: Monitor asset processing status
- **Asset Details**: View detailed information about uploaded assets
- **Responsive Design**: Modern UI with navigation and routing

## Project Structure

The application follows a modular architecture:

```
src/
├── components/          # Reusable UI components
│   ├── AssetCard.jsx   # Card component for displaying asset info
│   ├── AssetStatus.jsx # Status indicator component
│   ├── FileUpload.jsx  # Drag-and-drop file upload component
│   └── Navbar.jsx      # Navigation bar component
├── pages/              # Page-level components
│   ├── AssetListPage.jsx   # Main page showing all assets
│   ├── AssetDetailPage.jsx # Detailed view of a single asset
│   └── UploadPage.jsx      # Asset upload page
├── services/           # API service layer
│   └── assetApi.js     # API calls for asset operations
├── hooks/              # Custom React hooks
│   └── useAssetStatus.js # Hook for fetching asset status
├── App.js              # Main app component with routing
├── App.css             # Global styles
├── index.js            # Application entry point
└── index.css           # Base styles
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/subrat-kp/screensaver-ad-frontend.git
   cd screensaver-ad-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

## Configuration

Set the backend API URL in your environment:

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

Or update the default in `src/services/assetApi.js`.

## Usage

### Development

Start the development server:

```bash
npm start
# or
pnpm start
```

The application will open at `http://localhost:3000`.

### Production Build

Create an optimized production build:

```bash
npm run build
# or
pnpm build
```

## Application Routes

- `/` - Asset List Page (displays all assets)
- `/asset/:id` - Asset Detail Page (shows individual asset details)
- `/upload` - Upload Page (upload new creative assets)

## Component Documentation

### Pages

- **AssetListPage**: Displays all assets with grid/list view toggle. Links to asset details and upload page.
- **AssetDetailPage**: Shows detailed asset information including file metadata and storage details.
- **UploadPage**: Provides file upload interface with drag-and-drop support. Redirects to detail page on successful upload.

### Components

- **AssetCard**: Reusable card component for displaying asset preview and metadata
- **AssetStatus**: Visual status indicator (uploaded, processed)
- **FileUpload**: Drag-and-drop file upload component with validation
- **Navbar**: Application navigation bar with active route highlighting

### Services

- **assetApi.js**: Centralized API service for:
  - Fetching all assets
  - Fetching asset by ID
  - Uploading new assets
  - Updating asset status
  - Deleting assets

### Hooks

- **useAssetStatus**: Custom hook that:
  - Fetches asset data by ID
  - Provides loading and error states
  - Includes manual refetch functionality

## API Integration

The application integrates with a Go backend and expects the following endpoints:

### Endpoints

- `GET /api/assets` - Fetch all assets (with pagination)
- `GET /api/assets/:id` - Fetch single asset
- `POST /api/assets` - Upload new asset (multipart/form-data)
- `PATCH /api/assets/:id/status` - Update asset status
- `DELETE /api/assets/:id` - Delete asset

### Backend Asset Schema

The backend returns assets with the following structure:

```json
{
  "id": 1,
  "file_name": "example.jpg",
  "file_size": 1024000,
  "content_type": "image/jpeg",
  "s3_key": "uploads/2024/01/example.jpg",
  "s3_bucket": "my-bucket",
  "status": "uploaded",
  "uploaded_at": "2024-01-01T12:00:00Z",
  "created_at": "2024-01-01T12:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z"
}
```

### Status Values

- `uploaded` - Asset has been uploaded to S3
- `processed` - Asset has been processed

### Upload Request

The upload endpoint expects a multipart form with:
- `file` - The file to upload (required)
- `name` - Optional name for the file (defaults to filename)

### List Assets Response

```json
{
  "assets": [...],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

## Technologies Used

- React 18
- React Router v6
- Modern JavaScript (ES6+)
- CSS3

## Development Guidelines

### Adding New Pages

1. Create new page component in `src/pages/`
2. Add route in `src/App.js`
3. Update navigation in `src/components/Navbar.jsx`

### Adding New API Endpoints

1. Add function to `src/services/assetApi.js`
2. Use the function in components or create a custom hook

### Creating Custom Hooks

1. Create new hook file in `src/hooks/`
2. Follow naming convention: `use[HookName].js`
3. Export as default

## Backend Integration

This frontend is designed to work with the Go backend located in `../backend`. The backend provides:

- PostgreSQL database for asset metadata
- S3 integration for file storage
- RESTful API endpoints
- CORS support for frontend communication

Make sure the backend is running on `http://localhost:8080` or update the `REACT_APP_API_URL` environment variable accordingly.

## Future Enhancements

- Add authentication and user management
- Implement asset filtering and search
- Add bulk upload functionality
- Include asset analytics and metrics
- Add dark mode support
- Implement asset sharing capabilities
- Add image/video preview thumbnails
- Implement asset processing pipeline integration

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
