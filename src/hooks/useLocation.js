import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWeather } from "../redux/slice/WeatherSlice";
import { setSearchHistory } from "../redux/slice/SearchHistory";
import { currentWeatherApi } from "../api/axiosInstance";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const useLocation = () => {

  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);//store lat and lon
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchCurrentWeather = async () => {
    try {
      const res = await currentWeatherApi(location);
      const data =  res.data;
      console.log("Weather data fetched:", data);
      if (data) {
        dispatch(setWeather({
          location: data.location,
          current: data.current,
          forecast: data.forecast
        }));
      }

      setCurrentWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
  }

  const fetchLocationBasedOnInput = async (input) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input}`);
      if (response.status !== 200) {
        return;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch location data", error);
    }
  }

  const handleLocationClick = async (locationData) => {
    // Fetch the latest weather for the selected location
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationData.url}&days=7&aqi=yes&alerts=no`
    );
    const data = await res.json();

    // Add current weather to locationData
    const locationDataWithCurrent = {
      ...locationData,
      current: {
        temp_c: data.current.temp_c,
        feelslike_c: data.current.feelslike_c,
        condition: data.current.condition,
        humidity: data.current.humidity,
        last_updated: data.current.last_updated,
      }
    };

    dispatch(setSearchHistory({ locationData: locationDataWithCurrent }));
    const newLocation = locationData.url;
    setLocation(newLocation);
    fetchCurrentWeather(newLocation);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const loc = `${position.coords.latitude},${position.coords.longitude}`;
          setLocation(loc);
        },
        () => setLocation("")
      );
    } else {
      console.log("Geolocation not supported.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchCurrentWeather(location);
    }
  }, [location]);



  return {
    currentWeather,
    location,
    fetchLocation: fetchLocationBasedOnInput,
    handleLocationClick
  };
}
export default useLocation;