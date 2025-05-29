import AirFlow from "./components/AirFlow";
import CurrentWeather from "./components/CurrentWeather";
import MoonriseSection from "./components/MoonriseSection";
import SevenDayWeather from "./components/SevenDayWeather";
import SunriseSection from "./components/SunriseSection";
import useLocation from "./hooks/useLocation";
import { Loader } from "lucide-react";
import SearchLocation from "./components/SearchLocation";
import HistoryBookmark from "./components/HistoryBookmark";

export default function App() {
  const { currentWeather } = useLocation();
  if (!currentWeather) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-b from-[#002f4b] to-[#00b4db]">
        <Loader className="size-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#002f4b] to-[#00b4db] flex flex-col items-center px-2 md:px-6 pt-10">
      <div className="w-full  flex justify-center mb-6">
        <SearchLocation />
        <HistoryBookmark/>
      </div>
      <div className=" max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        <div className="md:col-span-5 col-span-1">
          <CurrentWeather />
        </div>
        <div className="md:col-span-4 col-span-1 flex flex-col gap-6 md:gap-8">
          <SevenDayWeather />
        </div>
        <div className="md:col-span-3 col-span-1 flex flex-col gap-4 md:gap-6 min-h-[400px]">
          <SunriseSection />
          <MoonriseSection />
          <AirFlow />
        </div>
      </div>
    </div>
  );
}
