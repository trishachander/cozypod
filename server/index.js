/**
 * Main server entry point for CozyPod backend
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const authRoutes = require('./routes/auth');
const recommendRoutes = require('./routes/recommend');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8888;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.api(req.method, req.url, req.method === 'POST' ? req.body : null);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('CozyPod API is running');
});

// Mount route modules
app.use('/auth', authRoutes);
app.use('/recommend', recommendRoutes);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Auth endpoints: /auth/login, /auth/callback, /auth/refresh_token`);
  logger.info(`Recommendation endpoint: /recommend`);
});

// Instructions for .env file (since we can't create it directly):
/*
Create a file named .env in the server directory with the following content:

# Spotify
SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI=http://127.0.0.1:8888/callback

# Server Port
PORT=8888

# Azure OpenAI
AZURE_OPENAI_ENDPOINT=YOUR_AZURE_ENDPOINT
AZURE_OPENAI_API_KEY=YOUR_AZURE_API_KEY
AZURE_OPENAI_DEPLOYMENT_NAME=YOUR_AZURE_DEPLOYMENT_NAME
*/