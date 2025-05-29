import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWeather } from "../redux/slice/WeatherSlice";
import { setSearchHistory } from "../redux/slice/SearchHistory";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const useLocation = () => {

  const [location, setLocation] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village;
          setLocation(city);
        } catch {
          console.error("Failed to fetch location data");
        }
      },
      () => setLocation("")
    );
  }

  const fetchCurrentWeather = async (loc) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${loc}&days=7&aqi=yes&alerts=no
`
      );
      const data = await res.json();
      if(data){
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
      fetchCurrentLocation();
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