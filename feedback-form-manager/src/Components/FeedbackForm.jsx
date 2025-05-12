import React, { useState, useRef } from 'react';

const FeedbackForm = ({ onAddFeedback }) => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const ratingRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const rating = parseInt(ratingRef.current.value);

    if (!name.trim() || !feedback.trim()) {
      alert('Name and Feedback are required.');
      return;
    }

    const newEntry = {
      name,
      feedback,
      rating: rating || 0,
      timestamp: new Date().getTime(),
    };

    onAddFeedback(newEntry);
    setName('');
    setFeedback('');
    ratingRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
      ></textarea>
      <input
        type="number"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        ref={ratingRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
