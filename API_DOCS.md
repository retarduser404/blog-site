# 📚 CyberLog API Documentation

Base URL: `http://localhost:5000/api`

All timestamps are in ISO 8601 format.

---

## 🔐 Authentication

All requests to protected endpoints must include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📋 Endpoints

### 🔑 Auth Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // or "admin"
}

Response: 201 Created
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### Get Current User
```
GET /auth/me
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "student",
    "avatar": "https://example.com/avatar.jpg",
    "bio": "I love cybersecurity",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Profile
```
PUT /auth/updateprofile
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "john_updated",
  "avatar": "https://example.com/new-avatar.jpg",
  "bio": "Updated bio"
}

Response: 200 OK
{
  "success": true,
  "user": {...}
}
```

---

### 📝 Post Endpoints

#### Get All Posts
```
GET /posts?page=1&limit=10&tag=cybersecurity
(Optional: tag parameter to filter by tag)

Response: 200 OK
{
  "success": true,
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Introduction to Cybersecurity",
      "content": "Lorem ipsum dolor sit amet...",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "john_doe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "tags": ["cybersecurity", "tutorial"],
      "likes": ["507f1f77bcf86cd799439013"],
      "comments": ["507f1f77bcf86cd799439014"],
      "viewCount": 42,
      "status": "published",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### Get Single Post
```
GET /posts/:id

Response: 200 OK
{
  "success": true,
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Introduction to Cybersecurity",
    "content": "Lorem ipsum...",
    "author": {...},
    "tags": ["cybersecurity"],
    "likes": [],
    "comments": [...],
    "viewCount": 43,
    "status": "published",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Create Post
```
POST /posts
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My New Post",
  "content": "This is the content of my post...",
  "tags": ["security", "tutorial"]
}

Response: 201 Created
{
  "success": true,
  "post": {...}
}
```

#### Update Post
```
PUT /posts/:id
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "tags": ["security"]
}

Response: 200 OK
{
  "success": true,
  "post": {...}
}
```

#### Delete Post
```
DELETE /posts/:id
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Post deleted"
}
```

#### Like/Unlike Post
```
PUT /posts/:id/like
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "post": {
    ...
    "likes": ["507f..."]
  }
}
```

---

### 💬 Comment Endpoints

#### Get Comments for Post
```
GET /posts/:postId/comments

Response: 200 OK
{
  "success": true,
  "comments": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "content": "Great post!",
      "author": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "jane_doe",
        "avatar": "https://example.com/avatar2.jpg"
      },
      "post": "507f1f77bcf86cd799439011",
      "likes": [],
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ]
}
```

#### Create Comment
```
POST /posts/:postId/comments
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "This is my comment"
}

Response: 201 Created
{
  "success": true,
  "comment": {...}
}
```

#### Update Comment
```
PUT /comments/:id
Headers: Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated comment text"
}

Response: 200 OK
{
  "success": true,
  "comment": {...}
}
```

#### Delete Comment
```
DELETE /comments/:id
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Comment deleted"
}
```

#### Like/Unlike Comment
```
PUT /comments/:id/like
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "comment": {
    ...
    "likes": ["507f..."]
  }
}
```

---

### 👨‍💼 Admin Endpoints (Admin Only)

All admin endpoints require:
- Authentication (valid JWT token)
- Role: "admin"

#### Get All Users
```
GET /admin/users
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "student",
      "isActive": true,
      "createdAt": "2024-01-10T10:30:00Z"
    }
  ]
}
```

#### Ban/Unban User
```
PUT /admin/users/:id/ban
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "User banned successfully",
  "user": {
    ...
    "isActive": false
  }
}
```

#### Delete User
```
DELETE /admin/users/:id
Headers: Authorization: Bearer <token>

Note: This also deletes all user's posts and comments

Response: 200 OK
{
  "success": true,
  "message": "User deleted successfully"
}
```

#### Get Analytics
```
GET /admin/analytics
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "analytics": {
    "totalUsers": 42,
    "totalStudents": 40,
    "totalAdmins": 2,
    "totalPosts": 156,
    "totalComments": 523,
    "totalActiveUsers": 35,
    "topPosts": [
      {
        "_id": "...",
        "title": "Popular Post",
        "author": {
          "username": "john_doe"
        },
        "viewCount": 150
      }
    ],
    "topLikedPosts": [...]
  }
}
```

#### Get Flagged Content
```
GET /admin/flagged
Headers: Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "flaggedPosts": [...]
}
```

---

## ✅ Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server error |

---

## ❌ Error Response Format

```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## 🔒 Authentication Examples

### Using Postman
1. Login to get token
2. Copy the token from response
3. Create new request
4. Go to Headers tab
5. Add: `Authorization` = `Bearer <paste_token_here>`

### Using cURL
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Then use the token:
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token>"
```

### Using JavaScript/Axios
```javascript
import api from './utils/api'; // Already configured in the app

// The api client automatically adds the token from localStorage
const response = await api.get('/auth/me');
```

---

## 📊 Data Models

### User Schema
```javascript
{
  username: String (required, unique, min 3 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  role: String (enum: ['student', 'admin'], default: 'student'),
  avatar: String (URL, default: placeholder),
  bio: String (default: empty),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Schema
```javascript
{
  title: String (required, max 200),
  content: String (required),
  author: ObjectId (ref: User, required),
  tags: [String],
  likes: [ObjectId] (ref: User),
  comments: [ObjectId] (ref: Comment),
  viewCount: Number (default: 0),
  status: String (enum: ['published', 'draft'], default: 'published'),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Schema
```javascript
{
  content: String (required, min 1, max 1000),
  author: ObjectId (ref: User, required),
  post: ObjectId (ref: Post, required),
  likes: [ObjectId] (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Quick Test Commands

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get Posts
curl http://localhost:5000/api/posts

# Health Check
curl http://localhost:5000/api/health
```

---

## 📞 Common Issues

**401 Unauthorized**
- Token is missing or invalid
- Token has expired
- Solution: Login again to get new token

**403 Forbidden**
- User doesn't have permission for this action
- Not an admin (for admin endpoints)
- Solution: Check user role and ownership

**404 Not Found**
- Post/Comment/User doesn't exist
- Check ID is correct

**400 Bad Request**
- Missing required fields
- Invalid data format
- Solution: Check request body

---

## 🚀 Rate Limiting

Currently no rate limiting. For production, consider:
- Adding express-rate-limit middleware
- Limiting: 100 requests per 15 minutes per IP
- Different limits for different endpoints

---

**Last Updated:** January 2024
**Version:** 1.0.0
