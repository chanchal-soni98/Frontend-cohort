import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "fd70b236cf1c36965986751de3a7228f";

const useCurrentLocation = () => {
  const [data, setData] = useState(null);
  const [coords, setCoords] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getLocation = () => {
      setLoading(true);
      if (!navigator.geolocation) {
        setError("location not available.....");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
        },
        (err) => {
          setError(err);
          setLoading(false);
        }
      );
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchWeatherByCoords = async () => {
      if (!coords) return;

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
        );
        const { main, weather, wind, name } = res.data;
        setData({
          temperature: main.temp,
          condition: weather[0].main,
          humidity: main.humidity,
          windSpeed: wind.speed,
          city: name,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherByCoords();
  }, [coords]);

  return { data, isLoading, error };
};

export default useCurrentLocation;
