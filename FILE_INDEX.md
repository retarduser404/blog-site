# 📑 CyberLog - Complete File Index

## 📂 Project Structure

```
Blog App/
│
├── 📄 START_HERE.md                    ← READ THIS FIRST! 🎯
├── 📄 QUICKSTART.md                    ← 5-minute setup guide
├── 📄 README.md                        ← Full documentation
├── 📄 API_DOCS.md                      ← API reference
├── 📄 PROJECT_SUMMARY.md               ← Architecture overview
├── 📄 VISUAL_GUIDE.md                  ← UI mockups
├── 📄 VERIFICATION.md                  ← Feature checklist
├── 📄 setup.bat                        ← Windows setup script
├── 📄 setup.sh                         ← Mac/Linux setup script
│
├── 📂 server/                          ← BACKEND (Node.js + Express)
│   ├── 📄 server.js                    ← Entry point
│   ├── 📄 package.json                 ← Dependencies
│   ├── 📄 .env                         ← Environment variables
│   ├── 📄 .gitignore                   ← Git ignore rules
│   │
│   ├── 📂 config/
│   │   └── 📄 db.js                    ← MongoDB connection
│   │
│   ├── 📂 models/                      ← Database schemas
│   │   ├── 📄 User.js                  ← User schema
│   │   ├── 📄 Post.js                  ← Post schema
│   │   └── 📄 Comment.js               ← Comment schema
│   │
│   ├── 📂 controllers/                 ← Business logic
│   │   ├── 📄 authController.js        ← Auth logic
│   │   ├── 📄 postController.js        ← Post logic
│   │   ├── 📄 commentController.js     ← Comment logic
│   │   └── 📄 adminController.js       ← Admin logic
│   │
│   ├── 📂 middleware/
│   │   └── 📄 auth.js                  ← JWT & auth middleware
│   │
│   └── 📂 routes/                      ← API routes
│       ├── 📄 auth.js                  ← Auth endpoints
│       ├── 📄 posts.js                 ← Post endpoints
│       ├── 📄 comments.js              ← Comment endpoints
│       └── 📄 admin.js                 ← Admin endpoints
│
└── 📂 client/                          ← FRONTEND (React)
    ├── 📄 package.json                 ← Dependencies
    ├── 📄 .env                         ← Environment variables
    ├── 📄 .gitignore                   ← Git ignore rules
    │
    ├── 📂 public/
    │   └── 📄 index.html               ← HTML template
    │
    └── 📂 src/
        ├── 📄 App.js                   ← Main app component
        ├── 📄 index.js                 ← React entry point
        │
        ├── 📂 components/
        │   ├── 📄 Navbar.js            ← Navigation bar
        │   └── 📄 Navbar.css           ← Navbar styles
        │
        ├── 📂 context/
        │   └── 📄 AuthContext.js       ← Global auth state
        │
        ├── 📂 utils/
        │   └── 📄 api.js               ← Axios API client
        │
        ├── 📂 styles/
        │   └── 📄 global.css           ← Theme & global styles
        │
        └── 📂 pages/
            ├── 📄 Home.js              ← Homepage
            ├── 📄 Home.css             ← Homepage styles
            ├── 📄 Login.js             ← Login page
            ├── 📄 Register.js          ← Register page
            ├── 📄 Auth.css             ← Auth page styles
            ├── 📄 CreatePost.js        ← Create post page
            ├── 📄 CreatePost.css       ← Create post styles
            ├── 📄 PostDetail.js        ← Post detail page
            ├── 📄 PostDetail.css       ← Post detail styles
            ├── 📄 Profile.js           ← User profile page
            ├── 📄 Profile.css          ← Profile styles
            ├── 📄 AdminPanel.js        ← Admin panel
            └── 📄 AdminPanel.css       ← Admin panel styles
```

---

## 📄 Documentation Files

| File | Purpose | Read Time |
|------|---------|-----------|
| **START_HERE.md** | Quick overview & next steps | 2 min |
| **QUICKSTART.md** | Setup guide for new devs | 5 min |
| **README.md** | Complete documentation | 10 min |
| **API_DOCS.md** | API endpoint reference | 10 min |
| **PROJECT_SUMMARY.md** | Architecture & features | 8 min |
| **VISUAL_GUIDE.md** | UI mockups & diagrams | 5 min |
| **VERIFICATION.md** | Feature checklist | 5 min |

---

## 🖥️ Backend Files (16 files)

### Core Files
- `server.js` - Express app setup & routes
- `package.json` - Node.js dependencies
- `.env` - MongoDB URI, JWT secret, port
- `.gitignore` - Files to exclude from git

### Config
- `config/db.js` - MongoDB connection setup

### Models (Database Schemas)
- `models/User.js` - User schema with auth
- `models/Post.js` - Blog post schema
- `models/Comment.js` - Comment schema

### Controllers (Business Logic)
- `controllers/authController.js` - Register, login, profile
- `controllers/postController.js` - CRUD posts, likes
- `controllers/commentController.js` - CRUD comments
- `controllers/adminController.js` - Admin functions

### Middleware
- `middleware/auth.js` - JWT verification, role check

### Routes (API Endpoints)
- `routes/auth.js` - /api/auth/* endpoints
- `routes/posts.js` - /api/posts/* endpoints
- `routes/comments.js` - /api/posts/:id/comments/* endpoints
- `routes/admin.js` - /api/admin/* endpoints (admin only)

---

## ⚛️ Frontend Files (22+ files)

### Core Files
- `src/App.js` - Main app with routing
- `src/index.js` - React entry point
- `package.json` - React dependencies
- `.env` - API URL
- `public/index.html` - HTML template

### Global
- `src/context/AuthContext.js` - Global auth state (register, login, logout)
- `src/utils/api.js` - Axios client with auto token injection
- `src/styles/global.css` - Theme variables & global styles

### Components
- `src/components/Navbar.js` - Navigation bar
- `src/components/Navbar.css` - Navbar styling

### Pages (11 pages + CSS)
1. `Home.js` - Homepage with post grid
2. `Login.js` - Login page
3. `Register.js` - Registration page  
4. `CreatePost.js` - Create new post
5. `PostDetail.js` - View post + comments
6. `Profile.js` - User profile
7. `AdminPanel.js` - Admin dashboard

### Stylesheets
- `Auth.css` - Login/Register styling
- `Home.css` - Homepage styling
- `CreatePost.css` - Create post styling
- `PostDetail.css` - Post detail styling
- `Profile.css` - Profile styling
- `AdminPanel.css` - Admin panel styling

---

## 🔑 Key Files to Know

### Most Important
1. **START_HERE.md** - Read this first!
2. **server.js** - Backend starts here
3. **App.js** - Frontend app structure
4. **AuthContext.js** - Authentication state
5. **global.css** - Theme colors

### For Features
- **Authentication**: authController.js, AuthContext.js
- **Posts**: postController.js, Home.js, PostDetail.js
- **Comments**: commentController.js, PostDetail.js
- **Admin**: adminController.js, AdminPanel.js
- **Theme**: global.css, Navbar.css, all page CSS files

### For APIs
- **Auth APIs**: routes/auth.js, controllers/authController.js
- **Post APIs**: routes/posts.js, controllers/postController.js
- **Comment APIs**: routes/comments.js, controllers/commentController.js
- **Admin APIs**: routes/admin.js, controllers/adminController.js

---

## 📊 File Count Summary

```
Backend:
  Core Files:        4
  Models:            3
  Controllers:       4
  Middleware:        1
  Routes:            4
  Total:            16

Frontend:
  Core Files:        5
  Context:           1
  Utils:             1
  Components:        2
  Pages + CSS:      14
  Styles:            1
  Total:            24

Documentation:      8

Setup Scripts:      2

TOTAL FILES:       50+
```

---

## 🚀 Which Files to Edit

### To Add Features
1. Create schema in `server/models/`
2. Create controller in `server/controllers/`
3. Create routes in `server/routes/`
4. Create React component in `client/src/pages/`
5. Add route in `client/src/App.js`

### To Change Theme
Edit: `client/src/styles/global.css`
- Update color variables in `:root`
- Change fonts if needed
- Update all page CSS files for consistency

### To Add API Endpoints
1. Create controller function in `server/controllers/`
2. Add route in appropriate file in `server/routes/`
3. Add route to `server.js`

### To Add React Pages
1. Create `.js` file in `client/src/pages/`
2. Create `.css` file with same name
3. Add route in `client/src/App.js`

---

## 📝 File Relationships

```
FRONTEND                          BACKEND                   DATABASE
────────                          ────────                  ────────

AuthContext.js ─────────────→ routes/auth.js ──────→ User Model
(state management)           authController.js      (authenticate)

Home.js ──────────────────→ routes/posts.js ───────→ Post Model
(display posts)             postController.js      (fetch posts)

PostDetail.js ─────────────→ routes/posts.js ───────→ Post Model
(view post + comments)      commentController.js   (fetch/create)

CreatePost.js ─────────────→ routes/posts.js ───────→ Post Model
(create post)               postController.js      (save post)

AdminPanel.js ─────────────→ routes/admin.js ───────→ All Models
(manage content)            adminController.js     (admin functions)
```

---

## 💾 Database Files

The database is MongoDB with three collections:

**Users Collection** (User.js)
- username, email, password, role, avatar, bio, isActive

**Posts Collection** (Post.js)
- title, content, author, tags, likes, comments, viewCount, status

**Comments Collection** (Comment.js)
- content, author, post, likes, createdAt

---

## 🔗 File Dependencies

```
server.js (depends on):
├── config/db.js
├── routes/auth.js
├── routes/posts.js
├── routes/comments.js
├── routes/admin.js
└── middleware/auth.js

App.js (depends on):
├── AuthContext.js (provides auth state)
├── components/Navbar.js
├── pages/Home.js
├── pages/Login.js
├── pages/Register.js
├── pages/CreatePost.js
├── pages/PostDetail.js
├── pages/Profile.js
└── pages/AdminPanel.js

All page files depend on:
├── utils/api.js (API calls)
├── context/AuthContext.js (auth state)
└── styles/global.css (theme)
```

---

## 📁 Organization Principles

1. **Models** - Define data structure
2. **Controllers** - Implement business logic
3. **Routes** - Define API endpoints
4. **Middleware** - Cross-cutting concerns
5. **Pages** - React components for routes
6. **Components** - Reusable parts
7. **Context** - Global state
8. **Utils** - Helper functions
9. **Styles** - CSS & theming

---

## ✅ File Checklist

### Backend (run `npm install` in server/)
- [ ] server.js exists
- [ ] package.json has dependencies
- [ ] .env has MONGO_URI
- [ ] All models created
- [ ] All controllers created
- [ ] All routes created
- [ ] auth.js middleware exists

### Frontend (run `npm install` in client/)
- [ ] App.js has routing
- [ ] AuthContext.js exists
- [ ] All pages created
- [ ] All CSS files created
- [ ] Navbar.js exists
- [ ] api.js utility exists
- [ ] global.css has theme

### Database
- [ ] MongoDB running
- [ ] Connection string in .env

---

## 🎯 Quick Navigation

**Want to...** | **Edit file...**
---|---
Change theme colors | `client/src/styles/global.css`
Add new API endpoint | Create in `server/controllers/` + `server/routes/`
Add new page | Create in `client/src/pages/` + add to `App.js`
Change navbar | `client/src/components/Navbar.js`
Add auth feature | `server/controllers/authController.js`
Add admin feature | `server/controllers/adminController.js`
Fix styling issue | Page-specific `.css` file

---

**All files accounted for! Ready to go! 🚀**

Start with **START_HERE.md** for next steps.
