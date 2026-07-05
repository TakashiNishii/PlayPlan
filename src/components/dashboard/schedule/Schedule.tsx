"use client"
import WeekView from "@/components/dashboard/schedule/WeekView"
import { Card, CardHeader } from "@/components/ui/card"
import { useSearchContext } from "@/contexts/search-context"

const Schedule = () => {
  const { videos } = useSearchContext()
  return (
    <Card className="w-full h-full min-h-0 shadow-md border rounded-sm py-4 flex flex-col">
      <CardHeader className="shrink-0">
        <h3 className="text-md text-primary font-bold">Your watch schedule</h3>
      </CardHeader>
      {videos.length === 0 ? (
        <div className="flex-1 min-h-0 flex flex-col items-center justify-center h-48">
          <p className="text-sm text-muted-foreground">No videos. Please search or change your filters and generate a new schedule.</p>
        </div>
      ) : (<WeekView />)}
    </Card>
  )
}

export default Schedule