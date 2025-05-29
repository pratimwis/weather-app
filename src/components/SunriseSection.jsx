import React from 'react'
import { useSelector } from 'react-redux'

const SunriseSection = () => {
  const astroData = useSelector((state) => state.weather.forecast.forecastday[0].astro)
  return (
    <div className='w-full  max-w-md bg-white/10 rounded-2xl p-6 shadow-xl text-white backdrop-blur-sm overflow-hidden'>
      <h2 className='text-lg font-semibold mb-4 text-center'>Sunrise & Sunset</h2>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col items-center'>
          <span className='text-sm font-medium'>Sunrise</span>
          <span className='text-base font-semibold'>{astroData.sunrise}</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-sm font-medium'>Sunset</span>
          <span className='text-base font-semibold'>{astroData.sunset}</span>
        </div>
      </div>  
    </div>
  )
}

export default SunriseSection