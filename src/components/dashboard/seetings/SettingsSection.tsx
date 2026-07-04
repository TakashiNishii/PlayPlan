import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import WeeklyMinutesFields from "./WeeklyMinutesFields"
import InfoMessage from "@/components/common/InfoMessage"
import { Button } from "@/components/ui/button"
import { CalendarDaysIcon } from "@heroicons/react/24/outline"

const SettingsSection = () => {
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
        <Button variant="default" className="px-4 py-2 h-10">
          <CalendarDaysIcon className="w-4 h-4 mr-2" />
          Generate Schedule
        </Button>
      </CardAction>
    </Card >
  )
}

export default SettingsSection