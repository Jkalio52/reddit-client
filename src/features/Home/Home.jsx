// src/features/Home/Home.jsx
// Add useRef and useCallback to your React import
import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import PostLoading from '../Post/PostLoading';
import { 
  fetchPosts, 
  fetchMorePosts, 
  selectFilteredPosts, 
  selectSelectedSubreddit,
  selectSearchTerm
} from '../../store/redditSlice';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);
  const searchTerm = useSelector(selectSearchTerm);
  const { isLoading, error, after, isFetchingMore } = useSelector((state) => state.reddit);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit, searchTerm));
  }, [selectedSubreddit, searchTerm, dispatch]);

  const onToggleComments = (index) => (permalink) => {
    // Logic for comments is handled via state in the Post component
  };

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading || isFetchingMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && after) {
          // Removed the console.log for production
          dispatch(fetchMorePosts(selectedSubreddit, after, searchTerm));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingMore, after, selectedSubreddit, searchTerm, dispatch]
  );

  if (isLoading && posts.length === 0) {
    return (
      <div className="home-loading">
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load posts.</h2>
        <button onClick={() => dispatch(fetchPosts(selectedSubreddit, searchTerm))}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home-container">
      {posts.length === 0 && !isLoading && (
        <div className="no-results">
          <h2>No posts found for "{searchTerm}"</h2>
        </div>
      )}

      {posts.map((post, index) => {
        const isLastElement = posts.length === index + 1;
        return (
          <div 
            key={`${post.id}-${index}`} 
            ref={isLastElement ? lastPostElementRef : null}
          >
            <Post
              post={post}
              onToggleComments={onToggleComments(index)}
            />
          </div>
        );
      })}

      {isFetchingMore && (
        <div className="fetching-more-loader">
          <PostLoading />
        </div>
      )}
    </div>
  );
};

export default Home;
