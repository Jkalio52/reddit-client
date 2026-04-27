// src/features/Post/Post.jsx
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import './Post.css';
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from 'react-icons/ti';
import moment from 'moment';
import shortenNumber from '../../utils/shortenNumber';
import Card from '../../components/Card/Card';
import Comment from '../Comment/Comment';
import Avatar from '../Avatar/Avatar';

const Post = (props) => {
  const [voteValue, setVoteValue] = useState(0);
  const { post, onToggleComments } = props;

  const onHandleVote = (newValue) => {
    setVoteValue(newValue === voteValue ? 0 : newValue);
  };

  const activeVoteClass = (val) => (voteValue === val ? 'active' : '');

  // --- THE MISSING LOGIC ---
  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div className="comment-error">
          <h3>Error loading comments</h3>
        </div>
      );
    }

    if (post.loadingComments) {
      return (
        <div className="comment-loading">
          <Skeleton count={3} />
        </div>
      );
    }

    if (post.showingComments) {
      return (
        <div className="comment-list">
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }

    return null;
  };
  // -------------------------

  return (
    <article className="post-item">
      <Card>
        <div className="post-wrapper">
          <div className="post-votes-container">
            <button
              type="button"
              className={`icon-action-button up-vote ${activeVoteClass(1)}`}
              onClick={() => onHandleVote(1)}
              aria-label="Up vote"
            >
              {voteValue === 1 ? <TiArrowUpThick /> : <TiArrowUpOutline />}
            </button>
            
            <p className={`post-votes-value ${voteValue === 1 ? 'up-vote' : voteValue === -1 ? 'down-vote' : ''}`}>
              {shortenNumber(post.ups, 1)}
            </p>

            <button
              type="button"
              className={`icon-action-button down-vote ${activeVoteClass(-1)}`}
              onClick={() => onHandleVote(-1)}
              aria-label="Down vote"
            >
              {voteValue === -1 ? <TiArrowDownThick /> : <TiArrowDownOutline />}
            </button>
          </div>

          <div className="post-container">
            <h3 className="post-title">{post.title}</h3>

            {post.url && (
              <div className="post-image-container">
                <img src={post.url} alt={post.title} className="post-image" />
              </div>
            )}

            <div className="post-details">
              <span className="author-details">
                <Avatar name={post.author} />
                <span className="author-username">{post.author}</span>
              </span>
              <span>{moment.unix(post.created_utc).fromNow()}</span>
              <span className="post-comments-container">
                <button
                  type="button"
                  className={`icon-action-button ${post.showingComments ? 'showing-comments' : ''}`}
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="Show comments"
                >
                  <TiMessage />
                </button>
                {shortenNumber(post.num_comments, 1)}
              </span>
            </div>

            {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
};

export default Post;
