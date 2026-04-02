# CyberLog - Quick Start Guide

## 🚀 Getting Started (5 Minutes)

### Step 1: Setup MongoDB

**Option A: Local MongoDB**
- Download MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service
- Default connection: `mongodb://localhost:27017/blog-app`

**Option B: MongoDB Atlas (Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/blog-app`
5. Update `server/.env` with your connection string

### Step 2: Start Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Update .env file with your MongoDB URI and JWT secret
# Example .env:
# MONGO_URI=mongodb://localhost:27017/blog-app
# JWT_SECRET=your_super_secret_key_12345
# PORT=5000
# NODE_ENV=development

# Start server
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Step 3: Start Frontend (New Terminal)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start React app
npm start
```

✅ App will open on `http://localhost:3000`

## 📝 Test the App

### Create Admin Account
1. Click "REGISTER"
2. Fill details:
   - Username: `admin1`
   - Email: `admin@test.com`
   - Password: `password123`
   - Role: **ADMIN**
3. Click "REGISTER"

### Create Student Account
1. Click "REGISTER"
2. Fill details:
   - Username: `student1`
   - Email: `student@test.com`
   - Password: `password123`
   - Role: **STUDENT**
3. Click "REGISTER"

### Test Features

**As Student:**
- ✅ Click "NEW POST" and create a blog post
- ✅ Click on post to view details
- ✅ Add comments and like posts
- ✅ View profile and edit information

**As Admin:**
- ✅ Click "ADMIN PANEL" (top right)
- ✅ View analytics and statistics
- ✅ Manage users (ban/delete)
- ✅ Delete posts/comments

## 🎨 Theme Customization

All colors are in `client/src/styles/global.css`:
- `--primary-olive`: #556B2F (Main color)
- `--accent-green`: #7CFC00 (Highlight)
- `--bg-dark`: #1a1a1a (Background)
- `--bg-card`: #2a2a2a (Card background)

## 🐛 Common Issues

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
# Windows: Check MongoDB service in Task Manager
# Mac: brew services list
# Linux: sudo systemctl status mongodb
```

### "Port 5000 already in use"
```bash
# Change PORT in server/.env
PORT=5001
```

### "React app won't start"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### "JWT errors"
```bash
# Generate strong JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Copy output and update JWT_SECRET in .env
```

## 📚 API Testing with Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new requests:

**Register**
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "username": "testuser",
  "email": "test@test.com",
  "password": "password123",
  "role": "student"
}
```

**Login**
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "test@test.com",
  "password": "password123"
}
```

**Create Post** (Add to Headers: Authorization: Bearer YOUR_TOKEN)
```
POST http://localhost:5000/api/posts
Body (JSON):
{
  "title": "My First Post",
  "content": "This is awesome!",
  "tags": ["cybersecurity", "tutorial"]
}
```

## 🔑 Key Files to Know

**Backend**
- `server/server.js` - Main server file
- `server/config/db.js` - MongoDB connection
- `server/models/` - Database schemas
- `server/controllers/` - Business logic
- `server/routes/` - API endpoints

**Frontend**
- `client/src/App.js` - Main app component
- `client/src/context/AuthContext.js` - Auth logic
- `client/src/pages/` - Page components
- `client/src/styles/global.css` - Theme styling

## 💡 Tips

1. **Save both terminals side-by-side** for easy monitoring
2. **Use browser DevTools** (F12) to debug frontend issues
3. **Check backend console** for API errors
4. **Clear browser cache** if styling looks broken
5. **Use Postman** to test APIs independently

## 🎯 Next Steps

1. ✅ Deploy backend to Heroku/Railway
2. ✅ Deploy frontend to Vercel/Netlify
3. ✅ Use MongoDB Atlas for production
4. ✅ Add email notifications
5. ✅ Implement search functionality
6. ✅ Add image upload feature
7. ✅ Create real-time notifications

## 📞 Need Help?

Check the error messages:
- **Backend errors** → Server console
- **Frontend errors** → Browser console (F12)
- **Network errors** → Network tab in DevTools

---

**Happy Coding! 🚀**

Good luck with your assignment! 💪
