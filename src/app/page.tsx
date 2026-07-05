import Schedule from "@/components/dashboard/schedule/Schedule";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import SearchSection from "../components/dashboard/search/SearchSection";
import SettingsSection from "../components/dashboard/seetings/SettingsSection";

export default function Home() {
  return (
    <div className="bg-background flex flex-row h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 min-h-0 py-4 px-10 flex flex-col gap-2 overflow-hidden">
        <Header />
        <div className="flex flex-row mt-6 gap-4 shrink-0">
          <SearchSection />
          <SettingsSection />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <Schedule />
        </div>
      </div>
    </div >
  )
}