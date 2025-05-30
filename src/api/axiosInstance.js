import axios from "axios";


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const API = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },  
});




export default API;


export const currentWeatherApi = (latAndLon) => {
  return API.get("/forecast.json", {
    params: {
      key: API_KEY,
      q: latAndLon,
      days: 7,
      aqi: "yes",
      alerts: "no",
    },
  });
}

