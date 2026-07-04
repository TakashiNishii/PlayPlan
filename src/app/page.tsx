import Sidebar from "../components/common/Sidebar";
import { ThemeToggle } from "../components/common/ThemeToggle";

export default function Home() {
  return (
    <div className="bg-background flex flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Plan your YouTube watch time</h2>
            <p className="text-muted-foreground text-xs">
              Search for videos and create a personalized schedule based on your daily availability.
            </p>
          </div>
          {/* Theme button */}
          <ThemeToggle />
        </div>
      </div>
    </div >
  )
}