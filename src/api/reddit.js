// src/api/reddit.js
export const API = ''; 

// 1. Get Posts (Subreddit or Search)
export const getSubredditPosts = async (subreddit, after = null, searchTerm = '') => {
  try {
    const cleanSubreddit = subreddit.replace(/\/$/, "");
    let url = "";

    if (searchTerm) {
      // Search within the specific subreddit
      url = `${cleanSubreddit}/search.json?q=${encodeURIComponent(searchTerm)}&restrict_sr=1${after ? `&after=${after}` : ''}`;
    } else {
      // Standard subreddit feed
      url = `${cleanSubreddit}.json${after ? `?after=${after}` : ''}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
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

// 2. Get Sub-reddits
export const getSubreddits = async () => {
  try {
    const response = await fetch(`/subreddits.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data.children.map((subreddit) => subreddit.data);
  } catch (error) {
    console.error("Error fetching subreddits list:", error);
    return [];
  }
};

// 3. Get Post Comments
export const getPostComments = async (permalink) => {
  try {
    const cleanPermalink = permalink.replace(/\/$/, "");
    const response = await fetch(`${cleanPermalink}.json`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json[1].data.children.map((comment) => comment.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
