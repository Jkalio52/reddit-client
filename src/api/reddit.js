export const API = 'https://www.reddit.com';

// Get Posts
export const getSubredditPosts = async (subreddit) => {
  const response = await fetch(`${API}${subreddit}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

// Get Sub-reddits
export const getSubreddits = async () => {
  const response = await fetch(`${API}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

// Get Post Comments
export const getPostComments = async (permalink) => {
  const response = await fetch(`${API}${permalink}.json`);
  const json = await response.json();

  return json[1].data.children.map((subreddit) => subreddit.data);
};
