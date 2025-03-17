
import axios from 'axios';


let API_KEY =import.meta.env.VITE_YOUTUBE_API_KEY || 'AIzaSyAQIwsdrVa6Z5sZhJa-wuAhZOXZRQxNTDc';

// Endpoint base dell'API YouTube
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Dati di fallback in caso l'API non funzioni
const FALLBACK_VIDEOS = [
  {
    id: { videoId: "dQw4w9WgXcQ" },
    snippet: {
      title: "Rick Astley - Never Gonna Give You Up",
      description: "Official music video for Rick Astley - Never Gonna Give You Up",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg" }
      },
      channelTitle: "Rick Astley"
    }
  },
  {
    id: { videoId: "djV11Xbc914" },
    snippet: {
      title: "a-ha - Take On Me (Official Video)",
      description: "Official music video for a-ha - Take On Me",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/djV11Xbc914/mqdefault.jpg" }
      },
      channelTitle: "a-ha"
    }
  },
  {
    id: { videoId: "fJ9rUzIMcZQ" },
    snippet: {
      title: "Queen - Bohemian Rhapsody (Official Video)",
      description: "Official music video for Queen - Bohemian Rhapsody",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/mqdefault.jpg" }
      },
      channelTitle: "Queen Official"
    }
  },
  {
    id: { videoId: "YR5ApYxkU-U" },
    snippet: {
      title: "Pink Floyd - Another Brick In The Wall (HQ)",
      description: "Pink Floyd - Another Brick In The Wall",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/YR5ApYxkU-U/mqdefault.jpg" }
      },
      channelTitle: "Pink Floyd"
    }
  },
  {
    id: { videoId: "y8OtzJtp-EM" },
    snippet: {
      title: "AC/DC - Thunderstruck (Official Video)",
      description: "Official video of Thunderstruck by AC/DC",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/y8OtzJtp-EM/mqdefault.jpg" }
      },
      channelTitle: "AC/DC"
    }
  },
  {
    id: { videoId: "1w7OgIMMRc4" },
    snippet: {
      title: "Guns N' Roses - Sweet Child O' Mine",
      description: "Official music video for Guns N' Roses - Sweet Child O' Mine",
      thumbnails: {
        medium: { url: "https://i.ytimg.com/vi/1w7OgIMMRc4/mqdefault.jpg" }
      },
      channelTitle: "GunsNRosesVEVO"
    }
  }
];

/**
 * Cerca video su YouTube usando la query fornita
 * @param {string} query - La query di ricerca
 * @param {number} maxResults - Numero massimo di risultati (default: 12)
 * @returns {Promise} - Promise con i risultati della ricerca
 */
export const searchVideos = async (query, maxResults = 12) => {
  try {
    console.log("Searching YouTube API with query:", query);
    console.log("Using API key:", API_KEY ? "API key is hardcoded" : "API key is missing");
    
    // Controlla se l'API key esiste
    if (!API_KEY) {
      console.warn("YouTube API key is missing, using fallback data");
      return filterFallbackResults(query);
    }
    
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults,
        q: query,
        key: API_KEY,
        type: 'video'
      }
    });
    
    console.log("YouTube API response status:", response.status);
    
    if (response.data && response.data.items && response.data.items.length > 0) {
      console.log(`Found ${response.data.items.length} videos from YouTube API`);
      return response.data.items;
    } else {
      console.warn("No videos found from YouTube API, using fallback data");
      return filterFallbackResults(query);
    }
  } catch (error) {
    console.error('Errore durante la ricerca video:', error);
    // Log dettagli specifici dell'errore per il debug
    if (error.response) {
      console.error('API Response Error:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    console.warn("Using fallback data due to API error");
    return filterFallbackResults(query);
  }
};

/**
 * Filtra i risultati di fallback in base alla query
 * @param {string} query - La query di ricerca
 * @returns {Array} - Array di video filtrati
 */
function filterFallbackResults(query) {
  if (!query) return FALLBACK_VIDEOS;
  
  const normalizedQuery = query.toLowerCase();
  return FALLBACK_VIDEOS.filter(video => 
    video.snippet.title.toLowerCase().includes(normalizedQuery) ||
    video.snippet.description.toLowerCase().includes(normalizedQuery) ||
    video.snippet.channelTitle.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Ottiene dettagli aggiuntivi di un video (come durata, statistiche, ecc.)
 * @param {string} videoId - ID del video
 * @returns {Promise} - Promise con i dettagli del video
 */
export const getVideoDetails = async (videoId) => {
  try {
    if (!API_KEY) {
      console.warn("YouTube API key is missing, returning placeholder data");
      return {
        contentDetails: { duration: "PT3M30S" },
        statistics: { viewCount: "1000000", likeCount: "50000" }
      };
    }
    
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'contentDetails,statistics',
        id: videoId,
        key: API_KEY
      }
    });
    
    return response.data.items[0];
  } catch (error) {
    console.error('Errore durante il recupero dei dettagli del video:', error);
    // Ritorna dati placeholder
    return {
      contentDetails: { duration: "PT3M30S" },
      statistics: { viewCount: "1000000", likeCount: "50000" }
    };
  }
};

/**
 * Ottiene video correlati a un video specifico
 * @param {string} videoId - ID del video
 * @param {number} maxResults - Numero massimo di risultati (default: 10)
 * @returns {Promise} - Promise con i video correlati
 */
export const getRelatedVideos = async (videoId, maxResults = 10) => {
  try {
    if (!API_KEY) {
      console.warn("YouTube API key is missing, returning fallback data");
      return FALLBACK_VIDEOS;
    }
    
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        relatedToVideoId: videoId,
        maxResults,
        type: 'video',
        key: API_KEY
      }
    });
    
    return response.data.items;
  } catch (error) {
    console.error('Errore durante il recupero dei video correlati:', error);
    return FALLBACK_VIDEOS;
  }
};


export const testApiKey = async () => {
  try {
    if (!API_KEY) {
      return { valid: false, message: 'API key is missing' };
    }
    
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 1,
        q: 'test',
        key: API_KEY
      }
    });
    
    return { valid: true, message: 'API key is valid' };
  } catch (error) {
    console.error('API key test failed:', error.response?.data || error.message);
    return { 
      valid: false, 
      message: error.response?.data?.error?.message || 'API key test failed'
    };
  }
};

export default {
  searchVideos,
  getVideoDetails,
  getRelatedVideos,
  testApiKey
};