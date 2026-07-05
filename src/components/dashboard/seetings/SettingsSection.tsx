"use client"

import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import WeeklyMinutesFields from "./WeeklyMinutesFields"
import InfoMessage from "@/components/common/InfoMessage"
import { Button } from "@/components/ui/button"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"
import { useSearchContext } from "@/contexts/search-context"
import { searchVideosQueryOptions } from "@/queries/youtube.query"
import { VideoInfo } from "@/types/youtube-response"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const SettingsSection = () => {
  const { selectedThemes, setVideos } = useSearchContext()
  const queryClient = useQueryClient()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateSchedule = async () => {
    if (selectedThemes.length === 0 || isGenerating) {
      return
    }

    setIsGenerating(true)

    try {
      const data = await queryClient.fetchQuery(searchVideosQueryOptions(selectedThemes))

      if (!data) {
        setVideos([])
        return
      }

      const normalizedVideos = Array.isArray(data)
        ? (data as VideoInfo[])
        : ((data as { items?: VideoInfo[] }).items ?? [])

      setVideos(normalizedVideos)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="flex-1 justify-between shadow-md border rounded-sm py-4">
      <CardHeader>
        <h3 className="text-md text-primary font-bold">2. Set your daily available time (minutes)</h3>
      </CardHeader>
      <CardContent className="flex flex-row gap-4">
        <WeeklyMinutesFields />
      </CardContent>
      <CardAction className="flex flex-row w-full items-center justify-between px-6">
        <InfoMessage message="You won't watch more than the daily limit. You must finish a video in the same day." />
        <Button
          variant="default"
          className="px-4 py-2 h-10"
          onClick={handleGenerateSchedule}
          disabled={selectedThemes.length === 0 || isGenerating}
        >
          <CalendarDaysIcon className="w-4 h-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate Schedule"}
        </Button>
      </CardAction>
    </Card >
  )
}

export default SettingsSection