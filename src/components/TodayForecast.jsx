import React from "react";

const formatTo12Hour = (timeStr) => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const TodayForecast = ({ today }) => {
  if (!today) return null;

  return (
    <div className="w-full max-w-md bg-white/10 rounded-2xl p-6 shadow-xl text-white backdrop-blur-sm overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 text-center">Today's Hourly Forecast</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4  min-w-fit">
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

export default TodayForecast;
