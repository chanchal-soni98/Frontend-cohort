import React from 'react';

const FeedbackCard = ({ entry }) => {
  const date = new Date(entry.timestamp).toLocaleString();

  return (
    <div
      className={`feedback-card ${entry.rating === 5 ? 'highlight' : ''}`}
    >
      <h3>{entry.name}</h3>
      <p>{entry.feedback}</p>
      <p><strong>Rating:</strong> {entry.rating}</p>
      <p>{date}</p>
    </div>
  );
};

export default FeedbackCard;
