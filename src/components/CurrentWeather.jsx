import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../redux/slice/BookmarkSlice';
import { Star, StarOff } from "lucide-react";


const CurrentWeather = () => {
  const currentWeather = useSelector((state) => state.weather)
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const dispatch = useDispatch();
  const bookmarks = useSelector(state => state.bookmarks.bookmarks);
  const isBookmarked = bookmarks.some(b => b.url === currentWeather.location?.name);

  const { location, current: { condition, temp_c, feelslike_c } } = currentWeather;
  const today = currentWeather.forecast.forecastday[0];
  const weatherIcon = `https:${condition.icon}`;

  const formatTo12Hour = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Find the current hour index
    const now = new Date(currentWeather.location.localtime);
    const currentHourIdx = today.hour.findIndex(
      (h) => new Date(h.time).getHours() === now.getHours()
    );
    // Scroll to the current hour card
    if (scrollRef.current && currentHourIdx > 0) {
      const cardWidth = 112; 
      scrollRef.current.scrollLeft = currentHourIdx * cardWidth;
    }
  }, [currentWeather.location.localtime, today.hour]);

  return (

    <div className="h-[500px] max-w-md  bg-white/10 rounded-2xl p-8 shadow-xl text-center backdrop-blur-sm text-white">

      <div className='flex text-right absolute top-5 right-5 '>
        <button
          onClick={() =>
            isBookmarked
              ? dispatch(removeBookmark({ url: currentWeather.location?.name }))
              : dispatch(addBookmark({
                name: currentWeather.location?.name,
                region: currentWeather.location?.region,
                country: currentWeather.location?.country,
                url: currentWeather.location?.name,
                current: currentWeather.current
              }))
          }
          className="cursor-pointer"
          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          {isBookmarked ? <Star className="text-yellow-400" /> : <StarOff className="text-white/60" />}
        </button>
      </div>
      {/* Location & Time */}
      <div className="text-lg md:text-xl">{currentWeather.location.localtime}</div>
      <div className="text-2xl md:text-3xl font-bold mt-1">
        {location.name}, {location.region}
      </div>


      {/* Weather Icon & Temperature */}
      <div className="my-8 flex flex-col items-center">
        <img src={weatherIcon} alt={condition.text} className="w-20 h-20" />
        <div className="text-md md:text-lg mt-3">{condition.text}</div>
        <div className="text-5xl font-light mt-1">{temp_c}°C</div>
        <div className="text-sm text-gray-200 mt-1">Feels like {feelslike_c}°C</div>
      </div>

      {/* Every Hour Details */}

      <div className="overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex gap-4 min-w-fit">
          {today.hour.map((hour, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center min-w-[100px] bg-white/10 p-3 rounded-xl border border-white/10"
            >
              <span className="text-sm font-medium mb-1 ">
                {formatTo12Hour(hour.time)}
              </span>
              <img
                src={hour.condition.icon}
                alt={hour.condition.text}
                className="w-10 h-10 mb-1"
              />
              <span className="text-base font-semibold">{hour.temp_c}°C</span>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default CurrentWeather;
