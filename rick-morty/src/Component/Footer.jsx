import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000); 

    return () => clearInterval(timer);
  }, []);

  const formatDate = (dateObj) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const time = dateObj.toLocaleTimeString('en-US', { hour12: false });
    const date = dateObj.toLocaleDateString('en-US', options);
    return `${time} ${date}`;
  };

  return (
    <div className='footer'>
      <h1>Rick and Morty</h1>
      <p>{formatDate(date)}</p>
    </div>
  );
};

export default Footer;
