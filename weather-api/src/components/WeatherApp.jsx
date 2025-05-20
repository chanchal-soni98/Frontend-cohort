import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';
import Loading from './Loading';
import Error from './Error';
import useFetchWeather from '../Hooks/useWeather';
import Favourites from './Favourites';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [newCity, setNewCity] = useState('');
  const [favourites, setFavourites] = useState(() => {
   
    return JSON.parse(localStorage.getItem('favourites')) || [];
  });

  const { data, isLoading, error } = useFetchWeather(newCity);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      setNewCity(city.trim());
    }
  };

  const handleAddToFavourites = () => {
    const trimmedCity = newCity.trim();
    if (trimmedCity && !favourites.includes(trimmedCity)) {
      const updated = [...favourites, trimmedCity];
      setFavourites(updated);
      localStorage.setItem('favourites', JSON.stringify(updated));
    }
  };

  const handleSelectFavourite = (cityName) => {
    setCity(cityName);
    setNewCity(cityName);
  };

  const handleRemoveFavourite = (cityToRemove) => {
    const updated = favourites.filter(city => city !== cityToRemove);
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  return (
    <div>
      <h1 > Weather App</h1>
      
      <SearchBar city={city} setCity={setCity} handleSubmit={handleSubmit} />

      {newCity && !favourites.includes(newCity) && (
        <div>
          <button
            onClick={handleAddToFavourites} 
          >
            Add {newCity} to Favourites
          </button>
        </div>
      )}

      <Favourites
        favourites={favourites}
        onSelect={handleSelectFavourite}
        onRemove={handleRemoveFavourite}
      />
      {isLoading && <Loading />}
      {error && <Error message={error} />}
      {data && !isLoading && !error && <WeatherInfo data={data} />}
    </div>
  );
};

export default WeatherApp;
