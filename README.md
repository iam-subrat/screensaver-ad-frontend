# Screensaver Ad Frontend

A React-based frontend application for managing and generating screensaver ads. This application allows users to upload creative assets, monitor processing status, and view generated advertisements.

## Features

- **Asset Management**: View all uploaded assets in a grid or list view
- **Asset Upload**: Upload image and video files for ad generation
- **Status Tracking**: Real-time polling of asset processing status
- **Ad Preview**: View generated ads once processing is complete
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
│   └── useAssetStatus.js # Hook for polling asset status
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
   ```

3. Install React Router (if not already installed):
   ```bash
   npm install react-router-dom
   ```

## Configuration

Set the backend API URL in your environment:

```bash
REACT_APP_API_URL=http://localhost:3001/api
```

Or update the default in `src/services/assetApi.js`.

## Usage

### Development

Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`.

### Production Build

Create an optimized production build:

```bash
npm run build
```

## Application Routes

- `/` - Asset List Page (displays all assets)
- `/asset/:id` - Asset Detail Page (shows individual asset details and ad preview)
- `/upload` - Upload Page (upload new creative assets)

## Component Documentation

### Pages

- **AssetListPage**: Displays all assets with grid/list view toggle. Links to asset details and upload page.
- **AssetDetailPage**: Shows detailed asset information, polls status, and displays the generated ad when ready.
- **UploadPage**: Provides file upload interface with drag-and-drop support. Redirects to detail page on successful upload.

### Components

- **AssetCard**: Reusable card component for displaying asset preview and metadata
- **AssetStatus**: Visual status indicator (pending, processing, ready, failed)
- **FileUpload**: Drag-and-drop file upload component with validation
- **Navbar**: Application navigation bar with active route highlighting

### Services

- **assetApi.js**: Centralized API service for:
  - Fetching all assets
  - Fetching asset by ID
  - Uploading new assets
  - Deleting assets

### Hooks

- **useAssetStatus**: Custom hook that:
  - Fetches asset data by ID
  - Automatically polls every 5 seconds if status is 'processing'
  - Provides loading and error states
  - Includes manual refetch functionality

## API Integration

The application expects the following backend endpoints:

- `GET /api/assets` - Fetch all assets
- `GET /api/assets/:id` - Fetch single asset
- `POST /api/assets/upload` - Upload new asset
- `DELETE /api/assets/:id` - Delete asset

### Expected Asset Schema

```json
{
  "id": "string",
  "name": "string",
  "status": "pending|processing|ready|failed",
  "fileType": "string",
  "fileSize": "number",
  "createdAt": "ISO date string",
  "thumbnailUrl": "string (optional)",
  "adUrl": "string (when status is ready)"
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

## Future Enhancements

- Add authentication and user management
- Implement asset filtering and search
- Add bulk upload functionality
- Include asset analytics and metrics
- Add dark mode support
- Implement asset sharing capabilities

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
