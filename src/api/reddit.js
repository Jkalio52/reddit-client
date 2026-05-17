// src/api/reddit.js

// FIXED: Changed from 'https://www.reddit.com' to '/api'.
// This forces all outgoing traffic to go through your Netlify proxy setup in _redirects.
// Netlify handles the handshake on the server side, bypassing the browser's CORS block completely.
export const API_ROOT = '/api'; 

export const getSubredditPosts = async (subreddit, after = null, searchTerm = '') => {
  try {
    const cleanSubreddit = subreddit.replace(/\/$/, "");
    let url = "";

    if (searchTerm) {
      url = `${API_ROOT}${cleanSubreddit}/search.json?q=${encodeURIComponent(searchTerm)}&restrict_sr=1${after ? `&after=${after}` : ''}`;
    } else {
      url = `${API_ROOT}${cleanSubreddit}.json${after ? `?after=${after}` : ''}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();

    return {
      posts: json.data.children.map((post) => post.data),
      after: json.data.after
    };
  } catch (error) {
    console.error("Error fetching reddit data:", error);
    return { posts: [], after: null };
  }
};

// Now seamlessly utilizing the API_ROOT proxy prefix
export const getSubreddits = async () => {
  try {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
  } catch (error) {
    console.error("Error fetching subreddits list:", error);
    return [];
  }
};

// Now seamlessly utilizing the API_ROOT proxy prefix
export const getPostComments = async (permalink) => {
  try {
    const cleanPermalink = permalink.replace(/\/$/, "");
    const response = await fetch(`${API_ROOT}${cleanPermalink}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json[1].data.children.map((comment) => comment.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
