import React from 'react'
import { useSelector } from 'react-redux';

const AirFlow = () => {
  const currentWeather = useSelector((state) => state.weather.current)

  const { humidity, wind_kph, wind_dir, uv, air_quality } = currentWeather;
  return (
    <div className="grid grid-cols-2 gap-4 text-sm  text-white text-center">
        <div className="bg-white/10 p-3 rounded-xl">
          <div className="font-semibold">Humidity</div>
          <div>{humidity}%</div>
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <div className="font-semibold">Wind</div>
          <div>{wind_kph} kph {wind_dir}</div>
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <div className="font-semibold">UV Index</div>
          <div>{uv}</div>
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <div className="font-semibold">Air Quality</div>
          <div>PM2.5: {air_quality.pm2_5.toFixed(1)}</div>
        </div>
      </div>  
    )
}

export default AirFlow