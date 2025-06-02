import { HomeIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import useLocation from "../hooks/useLocation"

const SearchLocation = () => {

  const { fetchLocation, handleLocationClick } = useLocation();
  const [locations, setLocations] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  const handleChange = async (input) => {
    setSearchLocation(input)
    if (!input.trim()) {
      setLocations([]);
      return;
    };
    const locationsByApi = await fetchLocation(input);
    setLocations(locationsByApi || []);
  };



  return (
      <>
      <div onClick={()=>{
        window.location.reload();
      }}>
        <button
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition shadow-md flex items-center justify-center mr-4 cursor-pointer text-white"
          title="Go Home"
        >
          <HomeIcon className="w-7 h-7" />
        </button>
      </div>
      <div className="relative w-full max-w-md">
        <div className="bg-white/10 rounded-full p-2 text-white flex items-center shadow-md">
          <input
            type="text"
            value={searchLocation}
            className="rounded-full pl-8 p-1 bg-transparent border-none outline-none focus:ring-0 flex-1 text-sm placeholder-white/70 placeholder:font-semibold"
            placeholder="Enter location"
            onChange={(e) => {
              handleChange(e.target.value)
            }}
          />
          <SearchIcon className=" w-5 h-5 cursor-pointer hover:text-blue-300 transition mr-2" />
        </div>
        <div className="relative px-10">
          {locations && locations.length > 0 && (
            <>
              <div className="absolute left-0 right-0 mt-2 bg-blue-300 text-black rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto z-20">
                {locations.map((location, idx) => (
                  <div
                    key={idx}
                    className="px-8 py-2 hover:bg-white/40 cursor-pointer text-sm "
                    onClick={() => {
                      setLocations([]);
                      handleLocationClick(location);
                      setSearchLocation(location.name);
                    }}
                  >
                    {location.name}
                    {location.region ? `, ${location.region}` : ""}
                    {location.country ? `, ${location.country}` : ""}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchLocation;