import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CharDetail.css';

const CharDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  return (
    <div className="char-detail-container">
      <h1 className="char-title">Character Details</h1>
      <div className="char-card">
        <img className="char-image" src={data.image} alt={data.name} />
        <div className="char-info">
          <h2>{data.name}</h2>
          <h3>Species: {data.species}</h3>
          <h3>Status: {data.status}</h3>
          {data.type && <h3>Type: {data.type}</h3>}
          <h3>Gender: {data.gender}</h3>
          <h3>Origin: {data.origin?.name}</h3>
          <h3>Current Location: {data.location?.name}</h3>
          <h3>Episodes: {data.episode ? data.episode.length : 0}</h3>
        </div>
      </div>
    </div>
  );
};

export default CharDetail;
