import { Suspense } from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import SearchSection from "../components/dashboard/SearchSection";

export default function Home() {
  return (
    <div className="bg-background flex flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 py-4 px-10 flex flex-col gap-2">
        <Header />
        <div className="flex flex-row mt-6">
          <SearchSection />
        </div>
      </div>
    </div >
  )
}