import React, { useState, useMemo, useEffect, useRef } from 'react';
import FeedbackForm from './Components/FeedbackForm';
import FeedbackList from './Components/FeedbackList';
import SearchBar from './Components/SearchBar';

const App = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      console.log('New feedback added!');
    } else {
      hasMounted.current = true;
    }

    return () => console.log('Component unmounted.');
  }, [feedbackList]);

  const handleAddFeedback = (newFeedback) => {
    setFeedbackList((prev) => [newFeedback, ...prev]);
  };

  const handleClearFeedback = () => {
    setFeedbackList([]);
  };

  const filteredList = useMemo(() => {
    const filtered = feedbackList.filter(entry =>
      entry.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => b.timestamp - a.timestamp);
    }

    return filtered;
  }, [feedbackList, searchQuery, sortBy]);

  return (
    <div className="app-container">
      <h1>Feedback Form Manager</h1>
      <FeedbackForm onAddFeedback={handleAddFeedback} />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onClear={handleClearFeedback}
      />
      <FeedbackList feedbackList={filteredList} originalLength={feedbackList.length} />
    </div>
  );
};

export default App;
