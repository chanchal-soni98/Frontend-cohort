import { useEffect, useState } from "react";

const API_KEY = "fd70b236cf1c36965986751de3a7228f";

const useFetchWeather = (city) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error('City not found');
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return { data, isLoading, error };
};

export default useFetchWeather;
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=fd70b236cf1c36965986751de3a7228f&units=metric

// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid=fd70b236cf1c36965986751de3a7228f