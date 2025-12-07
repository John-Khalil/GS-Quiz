// src/components/DynamicForm/ProgressBar.jsx
import React from 'react';
import './DynamicForm.css';

const ProgressBar = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="df-progress-container">
      <div className="df-progress-label">
        <span>Question {current} of {total}</span>
        <span>{percentage}% Completed</span>
      </div>
      <div className="df-progress-track">
        <div 
          className="df-progress-fill" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
