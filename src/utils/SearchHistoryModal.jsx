import { useSelector } from "react-redux";
import useLocation from "../hooks/useLocation";

const SearchHistoryModal = ({ isOpen, setIsOpen }) => {
  const searchHistory = useSelector((state) => state.searchHistory.searchHistory) || [];
  const { handleLocationClick } = useLocation();
  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#002f4b] to-[#00b4db] text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="text-left p-4 mb-10 space-y-4">
                {searchHistory && searchHistory.length > 0 ? (
                  searchHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/10 rounded-xl px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow transition hover:bg-white/20 cursor-pointer"
                      onClick={() => {
                        handleLocationClick(item),
                          setIsOpen(false)
                      }}
                    >
                      {/* Left Info Block */}
                      <div className="w-full sm:w-2/3">
                        <p className="font-semibold text-base sm:text-lg tracking-wide text-white/90 line-clamp-1">
                          {item.name}
                          {item.region ? `, ${item.region}` : ""}
                          {item.country ? `, ${item.country}` : ""}
                        </p>
                        <p className="text-xs sm:text-sm text-white/60 mt-1">
                          Last checked: {item.current.last_updated || "N/A"}
                        </p>
                      </div>

                      {/* Weather Info */}
                      <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="text-xl sm:text-2xl font-bold text-blue-200">
                          {item.current.temp_c}°C
                        </span>
                        <img
                          src={item.current.condition.icon}
                          alt={item.current.condition.text}
                          className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white/60 py-8">No search history yet.</div>
                )}
              </div>
              <div className="flex gap-2 justify-end">

                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold py-2 px-8 rounded mr-4 cursor-pointer"
                >
                  Go back!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  );
};

export default SearchHistoryModal;