import React from 'react'
import { useSelector } from 'react-redux'

const MoonriseSection = () => {
  
  const astroData = useSelector((state) => state.weather.forecast.forecastday[0].astro)

  return (
    <div className="w-full max-w-md">
      <div className="w-full max-w-md bg-white/10 rounded-2xl p-6 shadow-xl text-white backdrop-blur-sm overflow-hidden">
        <h2 className="text-xl font-bold mb-6 text-center tracking-wide drop-shadow-lg">
          Moonrise & Moonset
        </h2>
        <div className="flex justify-between items-center gap-4">
          {/* Moonrise */}
          <div className="flex flex-col items-center flex-1">
            <span className="text-xs font-medium text-indigo-200 mb-1">Moonrise</span>
            <span className="text-xs font-bold tracking-wide flex items-center gap-1">

              {astroData.moonrise}
            </span>
          </div>
          {/* Moon Phase */}
          <div className="flex flex-col items-center flex-1">
            <span className="text-xs font-medium text-indigo-200 mb-1">Moon Phase</span>
            <span className="text-xs font-bold tracking-wide flex items-center gap-1">

              {astroData.moon_phase}
            </span>
          </div>
          {/* Moonset */}
          <div className="flex flex-col items-center flex-1">
            <span className="text-xs font-medium text-indigo-200 mb-1">Moonset</span>
            <span className="text-xs font-bold tracking-wide flex items-center gap-1">

              {astroData.moonset}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoonriseSection