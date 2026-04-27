// src/features/Post/PostLoading.jsx
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
//import 'react-loading-skeleton/dist/index.css';
import './PostLoading.css';


const PostLoading = () => {
  return (
    <div className="post-loading-card">
      {/* Matching our obsidian card base and highlight colors */}
      <SkeletonTheme baseColor="#1a1a1a" highlightColor="#2a2a2a">
        <div className="loading-wrapper">
          <div className="loading-votes">
            <Skeleton width={30} height={100} />
          </div>
          <div className="loading-content">
            <Skeleton width="80%" height={24} style={{ marginBottom: '1rem' }} />
            <Skeleton height={250} />
            <div className="loading-details">
              <Skeleton circle width={30} height={30} />
              <Skeleton width={100} height={15} />
              <Skeleton width={80} height={15} />
            </div>
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default PostLoading;