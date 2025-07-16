# Stream-Powered File Uploader

A high-performance file upload application built with vanilla JavaScript (XHR) and raw Node.js streams, featuring chunked uploads, progress tracking, and drag-and-drop functionality—without Express.

##Key Features

- **Chunked File Uploads**
- Progress tracking via `XMLHttpRequest.onprogress`
- Handles large files efficiently (tested with 1GB+ files)

- **Stream-Powered Backend**
- Uses Node.js native `http` module + `busboy` for multipart parsing
- Zero buffering: Direct pipe to filesystem

- **Modern UX**
- Drag-and-drop interface (HTML5 File API)
- Real-time progress bar with percentage
- Responsive design

- **No Bloat**
- Zero frontend frameworks (pure HTML/CSS/JS)
- No Express.js dependency

## ⚡ Quick Start

### Prerequisites
- Node.js v22+

### Installation
```bash
git clone https://github.com/takicode/fileUpload_App.git
cd File_upload
npm install