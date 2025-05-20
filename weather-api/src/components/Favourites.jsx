import React from 'react';
import useFetchWeather from '../Hooks/useWeather';

const FavouriteWeatherCard = ({ city, onSelect, onRemove }) => {
  const { data, isLoading, error } = useFetchWeather(city);

  return (
    <div style={{margin:'20px'}}>
      <div onClick={() => onSelect(city)}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error</p>}
        {data && (
         <div>
            <h2>Hello, {data.name}</h2>
            <p>
                <strong>Temperature:</strong> {data.main.temp} °C
            </p>
            <p>
                <strong>Weather Condition:</strong> {data.weather[0].main}
            </p>
            <p>
                <strong>Humidity:</strong> {data.main.humidity} %
            </p>
            <p>
                <strong>Wind Speed:</strong> {data.wind.speed} m/s
            </p>
         </div>
        )}

         
      </div>
      <button
        onClick={() => onRemove(city)}
        title="Remove"
      >
        Delete
      </button>
    </div>
  );
};

const Favourites = ({ favourites, onSelect, onRemove }) => {
  if (!favourites.length) return null;

  return (
    <div>
      <h2> Favourite Cities with Weather</h2>
      <div style={{display:'flex', margin: '5px'}}>
        {favourites.map(city => (
          <FavouriteWeatherCard
            key={city}
            city={city}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Favourites;
