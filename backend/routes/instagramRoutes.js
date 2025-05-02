// backend/routes/instagramRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// In-memory cache to reduce API calls
let instagramCache = {
  data: null,
  timestamp: 0
};

// GET /api/instagram/feed - Fetch Instagram posts
router.get('/feed', async (req, res) => {
  try {
    const currentTime = Date.now();
    // Only fetch new data if cache is older than 1 hour
    if (!instagramCache.data || currentTime - instagramCache.timestamp > 3600000) {
      // Instagram Graph API endpoint for getting user media
      const response = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${process.env.INSTAGRAM_TOKEN}`
      );
      
      // Format the data to match what our component expects
      const formattedData = response.data.data.map(post => ({
        id: post.id,
        imageUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
        caption: post.caption || '',
        permalink: post.permalink,
        timestamp: post.timestamp
      }));
      
      // Update cache
      instagramCache = {
        data: formattedData,
        timestamp: currentTime
      };
    }
    
    res.json({
      success: true,
      data: instagramCache.data
    });
  } catch (error) {
    console.error('Instagram API error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch Instagram data' 
    });
  }
});

// GET /api/instagram/refresh-token - Refresh the Instagram token
router.get('/refresh-token', async (req, res) => {
  try {
    // Token should be refreshed ~45 days after getting it (before the 60-day expiration)
    const response = await axios.get(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.INSTAGRAM_TOKEN}`
    );
    
    const newToken = response.data.access_token;
    
    // In a production app, you would update this in your database
    console.log('New token received, expires in ~60 days');
    
    res.json({
      success: true,
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    console.error('Token refresh error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh token'
    });
  }
});

module.exports = router;