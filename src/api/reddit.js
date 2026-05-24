// src/api/reddit.js

// We are bypassing the Netlify proxy and Reddit's data-center block 
// by routing our requests through a public CORS proxy.
export const REDDIT_ROOT = 'https://www.reddit.com';
const PROXY_ROOT = 'https://corsproxy.io/?url=';

export const getSubredditPosts = async (subreddit, after = null, searchTerm = '') => {
  try {
    const cleanSubreddit = subreddit.replace(/\/$/, "");
    let targetUrl = "";

    if (searchTerm) {
      targetUrl = `${REDDIT_ROOT}${cleanSubreddit}/search.json?q=${encodeURIComponent(searchTerm)}&restrict_sr=1${after ? `&after=${after}` : ''}`;
    } else {
      targetUrl = `${REDDIT_ROOT}${cleanSubreddit}.json${after ? `?after=${after}` : ''}`;
    }
    
    // Wrap the fully constructed Reddit URL in the AllOrigins proxy
    const response = await fetch(`${PROXY_ROOT}${encodeURIComponent(targetUrl)}`);
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

export const getSubreddits = async () => {
  try {
    const targetUrl = `${REDDIT_ROOT}/subreddits.json`;
    const response = await fetch(`${PROXY_ROOT}${encodeURIComponent(targetUrl)}`);
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
    const targetUrl = `${REDDIT_ROOT}${cleanPermalink}.json`;
    const response = await fetch(`${PROXY_ROOT}${encodeURIComponent(targetUrl)}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json[1].data.children.map((comment) => comment.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
