// src/features/Subreddits/Subreddits.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card/Card';
import { fetchSubreddits, selectSubreddits } from '../../store/subRedditSlice';
import './Subreddits.css';
import {
  setSelectedSubreddit,
  selectSelectedSubreddit,
} from '../../store/redditSlice';

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  return (
    <Card className="subreddit-card">
      <h2>Subreddits</h2>
      <h3>Top Communities</h3>
      <ul className="subreddits-list">
        {subreddits.map((subreddit) => (
          <li
            key={subreddit.id}
            className={selectedSubreddit === subreddit.url ? 'selected-subreddit' : ''}
          >
            <button
              type="button"
              onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
            >
              <img
                src={
                  subreddit.icon_img ||
                  `https://ui-avatars.com/api/?name=${subreddit.display_name}&background=121212&color=00f2ff&rounded=true`
                }
                alt={`${subreddit.display_name}`}
                className="subreddit-icon"
                style={{ 
                  border: `2px solid ${subreddit.primary_color || 'rgba(255,255,255,0.1)'}` 
                }}
              />
              {subreddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Subreddits;
