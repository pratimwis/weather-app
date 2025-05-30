import React from 'react'
import { Droplet } from 'lucide-react'
import { useSelector } from 'react-redux'

const SevenDayWeather = () => {
  const forecast = useSelector((state) => state.weather.forecast.forecastday)
  // let avarageRain=0 ,avarageHighTemp = 0;
  // forecast.map((item)=>{
  //   avarageHighTemp += item.day.maxtemp_c;
  //   avarageRain += item.day.daily_chance_of_rain

  // });
  // console.log("avarage", forecast)
  

  return (
    <div className="w-full h-full min-h-[500px] bg-white/10 rounded-2xl p-8 shadow-xl text-white backdrop-blur-sm overflow-hidden flex flex-col justify-center">
      <h2 className="text-xl font-bold mb-6 text-center tracking-wide drop-shadow-lg">7-Day Forecast</h2>
      <div className="flex-1 flex flex-col justify-center">
        {forecast.map((dayForecast, index) => {
          const { date, day } = dayForecast;
          const { daily_chance_of_rain, condition, maxtemp_c, mintemp_c } = day;
          const dayName = index === 0
            ? 'Today'
            : new Date(date).toLocaleDateString('en-US', { weekday: 'long' })


          return (
          
            <div
              key={index}
              className="flex items-center justify-between border-b border-white/10 py-3 last:border-b-0"
            >
              {/* Day Name */}
              <div className="w-24 font-medium text-sm">{dayName}</div>

              {/* Rain Chance */}
              <div className="flex items-center gap-1 w-14 text-sm">
                <Droplet className="w-4 h-4 text-white/60" />
                {daily_chance_of_rain}%
              </div>

              {/* Weather Icon */}
              <div className="w-10">
                <img
                  src={`https:${condition.icon}`}
                  alt={condition.text}
                  title={condition.text}
                  className="w-6 h-6 mx-auto"
                />
              </div>

              {/* Temps */}
              <div className="text-sm font-semibold w-16 text-right">
                {Math.round(maxtemp_c)}° <span className="text-white/60">{Math.round(mintemp_c)}°</span>
              </div>
              
            </div>
            
            
            
          )
        })}
        {/* <div className=''>
          <p>
          Avarage temp : {avarageHighTemp/forecast.length}
          </p>
          <p> Avarage Rain :{avarageRain / forecast.length}</p>
         
        </div> */}
        
      </div>
    </div>
  )
}

export default SevenDayWeather
