#!/bin/bash

# CyberLog - Project Setup Script
# This script automates the installation and setup process

echo "╔════════════════════════════════════════╗"
echo "║      CyberLog - Setup Script           ║"
echo "║  Initializing Blog Application...      ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ NPM found: $(npm --version)"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd server
echo "   Installing server dependencies..."
npm install > /dev/null 2>&1

if [ -f ".env" ]; then
    echo "   ✅ .env file already exists"
else
    echo "   📝 Creating .env file..."
    cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
EOF
    echo "   ✅ .env created (update MONGO_URI if needed)"
fi

cd ..
echo "✅ Backend setup complete!"
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd client
echo "   Installing client dependencies..."
npm install > /dev/null 2>&1

if [ -f ".env" ]; then
    echo "   ✅ .env file already exists"
else
    echo "   📝 Creating .env file..."
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
    echo "   ✅ .env created"
fi

cd ..
echo "✅ Frontend setup complete!"
echo ""

echo "╔════════════════════════════════════════╗"
echo "║      Setup Complete! ✅                 ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Start MongoDB:"
echo "   - Ensure MongoDB is running on localhost:27017"
echo "   - Or update MONGO_URI in server/.env"
echo ""
echo "2. Open two terminals:"
echo ""
echo "   Terminal 1 - Start Backend:"
echo "   $ cd server"
echo "   $ npm run dev"
echo ""
echo "   Terminal 2 - Start Frontend:"
echo "   $ cd client"
echo "   $ npm start"
echo ""
echo "📖 Documentation:"
echo "   - README.md for full documentation"
echo "   - QUICKSTART.md for quick setup guide"
echo ""
echo "🎨 Default Theme: Olive Cybersecurity Terminal"
echo "📊 Admin Panel: Available after login as admin"
echo ""
