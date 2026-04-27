// src/store/redditSlice.js
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from '../api/reddit';

const initialState = {
  posts: [],
  after: null,
  error: false,
  isLoading: false,
  isFetchingMore: false,
  searchTerm: '',
  selectedSubreddit: '/r/pics/',
};

const redditSlice = createSlice({
  name: 'redditPosts',
  initialState,
  reducers: {
    startGetPosts(state) {
      state.isLoading = true;
      state.error = false;
    },
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.after = action.payload.after;
    },
    getPostsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    startGetMorePosts(state) {
      state.isFetchingMore = true;
    },
    getMorePostsSuccess(state, action) {
      state.isFetchingMore = false;
      state.posts = [...state.posts, ...action.payload.posts];
      state.after = action.payload.after;
    },
    getMorePostsFailed(state) {
      state.isFetchingMore = false;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = ''; // Reset search when switching subreddits
      state.posts = [];
      state.after = null;
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
    },
    startGetComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) return;
      state.posts[action.payload].loadingComments = true;
    },
    getCommentsSuccess(state, action) {
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    getCommentsFailed(state, action) {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
    },
  },
});

export const {
  startGetPosts,
  getPostsSuccess,
  getPostsFailed,
  startGetMorePosts,
  getMorePostsSuccess,
  getMorePostsFailed,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  startGetComments,
  getCommentsSuccess,
  getCommentsFailed
} = redditSlice.actions;

export default redditSlice.reducer;

// 1. Initial Fetch / Search Trigger
export const fetchPosts = (subreddit, searchTerm = '') => async (dispatch) => {
  try {
    dispatch(startGetPosts());
    const data = await getSubredditPosts(subreddit, null, searchTerm);

    const postsWithMetadata = data.posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));

    dispatch(getPostsSuccess({ posts: postsWithMetadata, after: data.after }));
  } catch (error) {
    dispatch(getPostsFailed());
  }
};

// 2. Fetch More (Infinite Scroll + Search Support)
export const fetchMorePosts = (subreddit, after, searchTerm = '') => async (dispatch) => {
  if (!after) return;
  try {
    dispatch(startGetMorePosts());
    const data = await getSubredditPosts(subreddit, after, searchTerm);

    const postsWithMetadata = data.posts.map((post) => ({
      ...post,
      showingComments: false,
      comments: [],
      loadingComments: false,
      errorComments: false,
    }));

    dispatch(getMorePostsSuccess({ posts: postsWithMetadata, after: data.after }));
  } catch (error) {
    dispatch(getMorePostsFailed());
  }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(startGetComments(index));
    const comments = await getPostComments(permalink);
    dispatch(getCommentsSuccess({ index, comments }));
  } catch (error) {
    dispatch(getCommentsFailed(index));
  }
};

// Selectors
export const selectPosts = (state) => state.reddit.posts;
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;

// Simplified Selector: The API now handles the filtering for us!
export const selectFilteredPosts = createSelector(
  [selectPosts],
  (posts) => posts
);
