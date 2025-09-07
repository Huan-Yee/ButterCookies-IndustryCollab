# Sample API Documentation

## Overview

This is a sample API documentation file that you can use to test the file upload functionality of the Smart Documentation Assistant.

## Authentication

All API requests require authentication using Bearer tokens:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.example.com/v1/users
```

## Endpoints

### GET /users

Retrieve a list of users.

**Parameters:**
- `limit` (optional): Number of users to return (default: 10)
- `offset` (optional): Number of users to skip (default: 0)

**Response:**
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2025-09-01T10:00:00Z"
    }
  ],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

### POST /users

Create a new user.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "created_at": "2025-09-07T12:00:00Z"
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a message:

```json
{
  "error": "User not found",
  "code": 404
}
```

## Rate Limiting

API requests are limited to 1000 requests per hour per API key. Rate limit information is included in response headers:

- `X-RateLimit-Limit`: Request limit per hour
- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Timestamp when rate limit resets

## SDK Examples

### JavaScript

```javascript
const api = new APIClient('YOUR_TOKEN');

// Get users
const users = await api.users.list({ limit: 20 });

// Create user
const newUser = await api.users.create({
  name: 'John Smith',
  email: 'john.smith@example.com'
});
```

### Python

```python
from api_client import APIClient

api = APIClient('YOUR_TOKEN')

# Get users
users = api.users.list(limit=20)

# Create user
new_user = api.users.create(
    name='John Smith',
    email='john.smith@example.com'
)
```

## Webhooks

Configure webhooks to receive real-time notifications:

1. Set up webhook endpoint
2. Configure webhook URL in dashboard
3. Handle webhook events

**Webhook Payload:**
```json
{
  "event": "user.created",
  "data": {
    "id": 123,
    "name": "New User",
    "email": "user@example.com"
  },
  "timestamp": "2025-09-07T12:00:00Z"
}
```
