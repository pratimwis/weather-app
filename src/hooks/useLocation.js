import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWeather } from "../redux/slice/WeatherSlice";
import { setSearchHistory } from "../redux/slice/SearchHistory";
import { currentWeatherApi, searchListClickApi, searchLocationApi } from "../api/axiosInstance";

const useLocation = () => {

  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const dispatch = useDispatch();

  const fetchCurrentWeather = async () => {
    try {
      const res = await currentWeatherApi(location);
      const data =  res.data;
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
      const res = await searchLocationApi(input);
      if (res.status !== 200) {
        return;
      }
      const data =  res.data;
      return data;
    } catch (error) {
      console.error("Failed to fetch location data", error);
    }
  }

  const handleLocationClick = async (locationData) => {
    const res = await searchListClickApi(locationData.url);
    const data = res.data;

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