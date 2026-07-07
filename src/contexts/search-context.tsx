import { VideoInfo } from "@/types/youtube-response";
import { createContext, useContext, useState } from "react";

export type WeekdayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

export type DailyAvailableMinutes = Record<WeekdayKey, string>

interface SearchContextProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedThemes: string[]
  setSelectedThemes: (themes: string[]) => void
  dailyAvailableMinutes: DailyAvailableMinutes
  setDailyAvailableMinutes: (minutes: DailyAvailableMinutes) => void
  generatedDailyAvailableMinutes: DailyAvailableMinutes | null
  setGeneratedDailyAvailableMinutes: (minutes: DailyAvailableMinutes | null) => void
  videos: VideoInfo[]
  setVideos: (videos: VideoInfo[]) => void
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

interface SearchProviderProps {
  children: React.ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [dailyAvailableMinutes, setDailyAvailableMinutesState] = useState<DailyAvailableMinutes>({
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  });
  const [generatedDailyAvailableMinutes, setGeneratedDailyAvailableMinutesState] = useState<DailyAvailableMinutes | null>(null)

  const setDailyAvailableMinutes = (minutes: DailyAvailableMinutes) => {
    setDailyAvailableMinutesState(minutes)
  }

  const setGeneratedDailyAvailableMinutes = (minutes: DailyAvailableMinutes | null) => {
    setGeneratedDailyAvailableMinutesState(minutes)
  }

  const [videos, setVideos] = useState<VideoInfo[]>([]);


  const contextValue: SearchContextProps = {
    searchTerm,
    setSearchTerm,
    selectedThemes,
    setSelectedThemes,
    dailyAvailableMinutes,
    setDailyAvailableMinutes,
    generatedDailyAvailableMinutes,
    setGeneratedDailyAvailableMinutes,
    videos,
    setVideos,
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}
