import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import useLocation from "../hooks/useLocation"

const SearchLocation = () => {
  const { fetchLocation, handleLocationClick } = useLocation();
  const [locations, setLocations] = useState([]);

  const handleChange = async (input) => {
    if (!input.trim()) {
      setLocations([]);
      return;
    };
    const locationsByApi = await fetchLocation(input);
    setLocations(locationsByApi || []);
  };
  

  return (
    <div className="relative w-full max-w-xs">
      <div className="bg-white/10 rounded-full p-2 text-white flex items-center shadow-md">
        <input
          type="text"
          className="rounded-full pl-3 p-2 bg-transparent border-none outline-none focus:ring-0 flex-1 text-sm placeholder-white/70"
          placeholder="Enter location"
          onChange={(e) => {
            handleChange(e.target.value)
          }}
        />
        <SearchIcon className=" w-5 h-5 cursor-pointer hover:text-blue-300 transition mr-2" />
      </div>
      <div className='relative px-10'>
        {locations && locations.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white/80 text-black rounded-xl shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto">
            {locations.map((location, idx) => (
              <div
                key={idx}
                className="px-8 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0"
                onClick={()=>{
                  setLocations([]),
                  handleLocationClick(location)

                }}
              >
                {location.name}
                {location.region ? `, ${location.region}` : ""}
                {location.country ? `, ${location.country}` : ""}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default SearchLocation;