const mongoose = require('mongoose');
require('dotenv').config();

// Only load mongodb-memory-server for development (optional)
let MongoMemoryServer;
try {
  if (process.env.NODE_ENV !== 'production') {
    MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
  }
} catch (err) {
  // mongodb-memory-server not available (expected in production)
  if (process.env.NODE_ENV !== 'production') {
    console.warn('mongodb-memory-server not available:', err.message);
  }
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);

    // Only try in-memory server in development
    if (process.env.NODE_ENV !== 'production' && MongoMemoryServer) {
      console.log('Starting in-memory MongoDB server for development/testing...');
      try {
        const mongoServer = await MongoMemoryServer.create();
        const memoryUri = mongoServer.getUri();
        const conn = await mongoose.connect(memoryUri);
        console.log(`In-memory MongoDB Connected: ${conn.connection.host}`);
        return conn;
      } catch (err) {
        console.error('Failed to start in-memory MongoDB:', err.message);
        process.exit(1);
      }
    }

    // In production, fail immediately if MongoDB Atlas is not available
    process.exit(1);
  }
};

module.exports = connectDB;
