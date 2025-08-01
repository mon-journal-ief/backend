# Image Upload Security Documentation

## Overview

This document outlines the security measures implemented for the image upload functionality in the IEF backend.

## Security Features

### 1. Authentication & Authorization
- All upload endpoints require authentication via JWT token
- Rate limiting applied to prevent abuse:
  - Upload: 10 requests per 15 minutes per IP
  - Delete: 20 requests per 15 minutes per IP

### 2. File Type Validation
- **Multiple validation layers:**
  - MIME type checking against whitelist
  - File extension validation
  - Content-based validation using Sharp library
  - Magic number verification

- **Allowed formats:** JPEG, PNG, WebP only

### 3. File Size & Dimension Limits
- Maximum file size: 10MB
- Maximum dimensions: 10,000 x 10,000 pixels
- Optimized for A4 print quality (300 DPI)

### 4. Filename Security
- **Secure filename generation:**
  - Timestamp + cryptographic random bytes + sanitized original name
  - Original filename sanitized using `sanitize-filename` library
  - Path traversal and dangerous characters automatically removed
  - Windows reserved names handled by sanitization

- **Filename sanitization:**
  - Uses industry-standard `sanitize-filename` library
  - Replaces dangerous characters with safe alternatives
  - Prevents directory traversal attacks
  - Handles cross-platform filename compatibility

### 5. Image Processing
- **Automatic optimization:**
  - Resize to max 2000x2000 pixels (maintains aspect ratio)
  - JPEG compression at 85% quality
  - Progressive JPEG encoding
  - Metadata stripping for privacy

### 6. Storage Security
- Files stored outside web root by default
- Static file serving with security headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - Cache control headers
- Extension-based access control

### 7. Input Validation
- **Multer configuration:**
  - Memory storage for processing
  - Field count limits
  - Field name/size limits
  - Single file upload only

- **Request validation:**
  - JSON payload size limit (10MB)
  - Form field restrictions

## API Endpoints

### Upload Image
```
POST /uploads/image
Content-Type: multipart/form-data
Headers: x-auth-token: <jwt-token>

Form data:
- image: <file> (required)
```

**Response:**
```json
{
  "message": "Image uploaded successfully",
  "data": {
    "filename": "1704123456789-abc123def456.jpg",
    "originalName": "my-image.jpg",
    "size": 2048576,
    "url": "/uploads/images/1704123456789-abc123def456.jpg"
  }
}
```

### Delete Image
```
DELETE /uploads/image/:filename
Headers: x-auth-token: <jwt-token>
```

### Access Uploaded Images
```
GET /uploads/images/:filename
```

## Error Codes

| Code | Description |
|------|-------------|
| `FILE_TOO_LARGE` | File exceeds 10MB limit |
| `INVALID_FIELD_NAME` | Wrong form field name (should be 'image') |
| `UPLOAD_ERROR` | General upload error |
| `NO_FILE` | No file provided |
| `INVALID_IMAGE_CONTENT` | File content validation failed |
| `PROCESSING_ERROR` | Image processing failed |
| `RATE_LIMIT_EXCEEDED` | Too many requests |
| `INVALID_FILENAME` | Invalid filename format |
| `IMAGE_NOT_FOUND` | Requested image doesn't exist |

## Development Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create uploads directory:
```bash
mkdir -p uploads/images
```

3. Set appropriate permissions (production):
```bash
chmod 755 uploads
chmod 755 uploads/images
```

## Production Deployment

### VPS Configuration

1. **Reverse Proxy (Nginx):**
```nginx
# Limit upload size
client_max_body_size 10M;

# Security headers
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options DENY;
add_header X-XSS-Protection "1; mode=block";

# Rate limiting
limit_req_zone $binary_remote_addr zone=upload:10m rate=10r/m;

location /uploads/image {
    limit_req zone=upload burst=5 nodelay;
    proxy_pass http://localhost:4000;
}
```

2. **File System Security:**
```bash
# Create dedicated user for the application
useradd -r -s /bin/false ief-app

# Set proper ownership and permissions
chown -R ief-app:ief-app /path/to/app/uploads
chmod 750 /path/to/app/uploads
chmod 750 /path/to/app/uploads/images

# Prevent execution of uploaded files
chmod -R -x /path/to/app/uploads/images/*
```

3. **Environment Variables:**
```bash
# Set in production environment
export NODE_ENV=production
export JWT_SECRET="your-super-secure-secret-here"
export DATABASE_URL="postgresql://..."
```

## Security Monitoring

### Logs to Monitor
- Failed upload attempts
- Rate limit violations
- File type validation failures
- Authentication failures
- Unusual file sizes or names

### Recommended Monitoring
- File system usage in uploads directory
- Upload frequency patterns
- Failed authentication attempts
- Server resource usage during uploads

## Regular Maintenance

1. **Cleanup old files:**
   - Implement file retention policy
   - Remove orphaned files
   - Monitor disk usage

2. **Security updates:**
   - Keep Sharp library updated
   - Update Multer and dependencies
   - Review and update MIME type whitelist

3. **Audit trails:**
   - Log all upload/delete operations
   - Associate uploads with user accounts
   - Implement file access logging

## Testing

Test the upload functionality:

```bash
# Test upload
curl -X POST \
  -H "x-auth-token: YOUR_JWT_TOKEN" \
  -F "image=@test-image.jpg" \
  http://localhost:4000/uploads/image

# Test invalid file type
curl -X POST \
  -H "x-auth-token: YOUR_JWT_TOKEN" \
  -F "image=@test-file.txt" \
  http://localhost:4000/uploads/image

# Test oversized file
curl -X POST \
  -H "x-auth-token: YOUR_JWT_TOKEN" \
  -F "image=@large-file.jpg" \
  http://localhost:4000/uploads/image
```

## Security Considerations

1. **Never trust user input** - All files are validated at multiple levels
2. **Defense in depth** - Multiple security layers prevent bypass
3. **Regular updates** - Keep all dependencies updated
4. **Monitoring** - Log and monitor all upload activity
5. **Backup strategy** - Regular backups of uploaded files
6. **Incident response** - Plan for handling security incidents

## Contact

For security concerns or questions about the upload functionality, please contact the development team.