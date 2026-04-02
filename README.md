# CyberLog - Blog Application

A full-stack blog application built with **Node.js** (backend) and **React** (frontend) with MongoDB database. Features user authentication, role-based access control (Admin/Student), post creation, comments, and an admin panel.

## 🎯 Features

### User Features
- ✅ **Authentication**: Register and login with email/password
- ✅ **Role Selection**: Register as Admin or Student
- ✅ **Create Posts**: Write and publish blog posts with tags
- ✅ **Comments**: Comment on other users' posts
- ✅ **Like Posts**: Like posts and comments
- ✅ **Profile**: View and edit user profile
- ✅ **Cybersecurity Theme**: Olive-colored terminal-styled UI

### Admin Features
- ✅ **Delete Posts**: Remove any post from the platform
- ✅ **Delete Comments**: Moderate comments
- ✅ **Manage Users**: Ban/unban students
- ✅ **Delete Users**: Remove users from the platform
- ✅ **Analytics Dashboard**: View platform statistics
- ✅ **User Management**: Track all users and their activity

### Technical Stack
- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Bcrypt password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Install dependencies**:
```bash
cd server
npm install
```

2. **Create `.env` file** in the `server` directory:
```env
MONGO_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

3. **Start MongoDB** (if using local):
```bash
mongod
```

4. **Start the server**:
```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Install dependencies**:
```bash
cd client
npm install
```

2. **Create `.env` file** in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. **Start the development server**:
```bash
npm start
```

App will open on `http://localhost:3000`

## 🔐 Default Admin User

After setup, create an admin account during registration and select "ADMIN" as the role.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updateprofile` - Update profile

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (authenticated)
- `PUT /api/posts/:id` - Update post (owner/admin only)
- `DELETE /api/posts/:id` - Delete post (owner/admin only)
- `PUT /api/posts/:id/like` - Like/unlike post

### Comments
- `GET /api/posts/:postId/comments` - Get all comments for a post
- `POST /api/posts/:postId/comments` - Create comment (authenticated)
- `PUT /api/comments/:id` - Update comment (owner/admin only)
- `DELETE /api/comments/:id` - Delete comment (owner/admin only)
- `PUT /api/comments/:id/like` - Like/unlike comment

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id/ban` - Ban/unban user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `GET /api/admin/analytics` - Get analytics (admin only)

## 🎨 Theme

The application features an **olive-green cybersecurity terminal theme** with:
- Dark background (#1a1a1a)
- Olive primary color (#556B2F)
- Bright Green accent (#7CFC00)
- Terminal-style fonts (Consolas/Monaco)
- Glowing effects on hover
- Professional yet futuristic design

## 🚀 Usage

### As a Student
1. Register as a student
2. Create blog posts about cybersecurity
3. Comment on other students' posts
4. Like posts you find interesting
5. Edit/delete your own posts

### As an Admin
1. Register as an admin
2. Access the **ADMIN PANEL** from the navbar
3. View analytics and statistics
4. Manage users (ban/delete)
5. Moderate content (delete posts/comments)

## 📁 Project Structure

```
Blog App/
├── server/
│   ├── models/          (Database schemas)
│   ├── routes/          (API routes)
│   ├── controllers/      (Business logic)
│   ├── middleware/       (Auth, validation)
│   ├── config/          (Database config)
│   ├── server.js        (Entry point)
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/   (Navbar, etc.)
    │   ├── pages/       (Home, Login, Profile, etc.)
    │   ├── context/     (Auth context)
    │   ├── utils/       (API client)
    │   ├── styles/      (Global CSS)
    │   ├── App.js
    │   └── index.js
    ├── public/
    └── package.json
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with Bcrypt
- Role-based access control
- Protected API routes
- CORS enabled
- Input validation
- Request authentication middleware

## 🛠 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For MongoDB Atlas, use connection URL with credentials

### CORS Error
- Ensure backend is running on `http://localhost:5000`
- Check `REACT_APP_API_URL` in `.env`

### Login Not Working
- Clear browser cache/cookies
- Ensure JWT_SECRET is set in backend `.env`
- Check MongoDB database is connected

## 📝 Notes

- Default pagination: 10 posts per page
- Passwords must be at least 6 characters
- Only admin users can access the admin panel
- Users can only edit/delete their own posts
- Comments are tied to specific posts

## 🎓 Learning Resources

This project covers:
- Full-stack development with MERN-like stack
- RESTful API design
- Authentication & Authorization
- Role-based access control
- Database design with MongoDB
- React hooks and context API
- CSS-in-JS styling

## 📄 License

This project is for educational purposes.

---

**Happy Blogging! 🚀**

For any issues or questions, feel free to ask!
