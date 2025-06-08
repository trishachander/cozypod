/**
 * Recommendation routes for podcast suggestions
 */
const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const logger = require('../utils/logger');

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

// Initialize Azure OpenAI client
const openaiClient = new OpenAIClient(
  process.env.AZURE_OPENAI_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY)
);

// Recommendation endpoint
router.post('/', async (req, res) => {
  logger.debug('Recommend endpoint called');
  
  const { mood, accessToken } = req.body;
  
  if (!mood) {
    logger.error('No mood provided in request');
    return res.status(400).json({ error: 'Mood is required' });
  }
  
  if (!accessToken) {
    logger.error('No access token provided');
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    // Set the access token on the Spotify client
    spotifyApi.setAccessToken(accessToken);
    
    // Get user's top artists
    logger.debug('Fetching user top artists from Spotify');
    const topArtistsData = await spotifyApi.getMyTopArtists({ limit: 5 });
    const topArtists = topArtistsData.body.items.map(artist => artist.name);
    
    logger.debug(`User's top artists: ${topArtists.join(', ')}`);
    
    // Construct prompt for OpenAI
    const prompt = `Based on the mood "${mood}" and considering these favorite artists: ${topArtists.join(', ')}, 
    suggest 5 specific podcast episodes (not just shows) that would match this vibe. 
    For each episode, provide: 1) Episode title, 2) Podcast name, 3) A brief description of why it matches the mood.
    Format as a JSON array with objects having fields: "episodeTitle", "podcastName", "description".`;
    
    logger.debug('Sending prompt to Azure OpenAI');
    logger.debug(`Prompt: ${prompt}`);
    
    // Call Azure OpenAI
    const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
    const response = await openaiClient.getCompletions(deploymentName, [prompt], {
      temperature: 0.7,
      maxTokens: 800,
    });
    
    logger.debug('Received response from Azure OpenAI');
    
    // Parse the response - assumes it's properly formatted JSON
    let recommendations;
    try {
      const responseText = response.choices[0].text.trim();
      logger.debug(`Raw response: ${responseText}`);
      recommendations = JSON.parse(responseText);
    } catch (error) {
      logger.error('Failed to parse OpenAI response as JSON', error);
      // Fallback to a simple parsing approach if JSON parsing fails
      recommendations = response.choices[0].text
        .split('\n\n')
        .filter(line => line.trim().length > 0)
        .map(item => {
          const parts = item.split('\n');
          return {
            episodeTitle: parts[0].replace(/^\d+\.\s+/, '').trim(),
            podcastName: parts[1].trim(),
            description: parts.slice(2).join(' ').trim()
          };
        });
    }
    
    // Enrich with Spotify data
    logger.debug('Enriching recommendations with Spotify data');
    const enrichedRecommendations = await Promise.all(
      recommendations.map(async (rec) => {
        try {
          // Search for the podcast episode
          const query = `${rec.episodeTitle} ${rec.podcastName}`;
          const searchResult = await spotifyApi.searchEpisodes(query, { limit: 1 });
          
          if (searchResult.body.episodes.items.length > 0) {
            const episode = searchResult.body.episodes.items[0];
            return {
              ...rec,
              uri: episode.uri,
              imageUrl: episode.images[0].url,
              duration: episode.duration_ms,
              releaseDate: episode.release_date,
              spotifyUrl: episode.external_urls.spotify,
              matchPercentage: Math.floor(85 + Math.random() * 10) // Mock match percentage between 85-95%
            };
          }
          return {
            ...rec,
            uri: null,
            imageUrl: 'https://i.scdn.co/image/ab67656300005f1f8a5f139abff3e340209c25b6', // Default image
            matchPercentage: Math.floor(85 + Math.random() * 10)
          };
        } catch (error) {
          logger.error(`Error enriching recommendation "${rec.episodeTitle}"`, error);
          return rec;
        }
      })
    );
    
    logger.debug(`Returning ${enrichedRecommendations.length} recommendations`);
    res.json({ recommendations: enrichedRecommendations });
  } catch (error) {
    logger.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

module.exports = router;