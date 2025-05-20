import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackList = ({ feedbackList, originalLength }) => {
  if (originalLength === 0) {
    return <p>No Feedback Yet</p>;
  }

  if (feedbackList.length > 10) {
    return <p>Too many results, please refine your search.</p>;
  }

  return (
    <div className="feedback-list">
      {feedbackList.map((entry, index) => (
        <FeedbackCard key={index} entry={entry} />
      ))}
    </div>
  );
};

export default FeedbackList;
