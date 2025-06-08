/**
 * Authentication routes for Spotify OAuth
 */
const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const logger = require('../utils/logger');

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

// Login endpoint - redirects to Spotify authorization
router.get('/login', (req, res) => {
  logger.debug('Login endpoint called');
  
  const scopes = ['user-read-private', 'user-top-read'];
  const authUrl = spotifyApi.createAuthorizeURL(scopes);
  
  logger.debug(`Redirecting to Spotify auth: ${authUrl}`);
  res.redirect(authUrl);
});

// Callback endpoint - handles the response from Spotify
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  logger.debug('Callback received with code');
  
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = data.body;
    
    logger.debug(`Auth tokens received. Expires in ${expires_in} seconds`);
    
    // For a real app, you'd want to store tokens securely
    // For this demo, we'll redirect with tokens in URL (not recommended for production)
    res.redirect(`http://localhost:5173?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    logger.error('Error in callback:', error);
    res.redirect('http://localhost:5173?error=auth_failed');
  }
});

// Token refresh endpoint
router.post('/refresh_token', async (req, res) => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    logger.error('No refresh token provided');
    return res.status(400).json({ error: 'No refresh token provided' });
  }
  
  // Set the refresh token
  spotifyApi.setRefreshToken(refresh_token);
  
  try {
    logger.debug('Attempting to refresh access token');
    const data = await spotifyApi.refreshAccessToken();
    const { access_token, expires_in } = data.body;
    
    logger.debug(`Token refreshed. New token expires in ${expires_in} seconds`);
    res.json({ access_token, expires_in });
  } catch (error) {
    logger.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

module.exports = router;