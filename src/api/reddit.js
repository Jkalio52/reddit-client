// src/api/reddit.js
export const API_ROOT = 'https://www.reddit.com'; // Absolute path for production

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

// Update these to use API_ROOT as well:
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
