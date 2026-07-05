import { useSearchContext, WeekdayKey } from "@/contexts/search-context"
import { VideoInfo } from "@/types/youtube-response"
import Image from "next/image"
import Link from "next/link"

type WeekMinutesAvailable = Record<WeekdayKey, number>
type WeekSchedule = Record<WeekdayKey, VideoInfo[]>
type ScheduledDay = { day: WeekdayKey; videos: VideoInfo[] }

const ALL_DAYS: WeekdayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

const createEmptyWeekSchedule = (): WeekSchedule => ({
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
})

const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)
const truncateText = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength)}...` : value

const WeekView = () => {
  const { videos, dailyAvailableMinutes } = useSearchContext()

  const convertDurationStringToMinutes = (duration: string): number | null => {
    const durationParts = duration.split(":").map(Number)
    if (durationParts.length > 3) {
      return null // Ignora vídeos com duração maior que 24 horas.
    }
    let durationInMinutes = 0
    if (durationParts.length === 3) {
      durationInMinutes = durationParts[0] * 60 + durationParts[1] + durationParts[2] / 60
    } else if (durationParts.length === 2) {
      durationInMinutes = durationParts[0] + durationParts[1] / 60
    } else if (durationParts.length === 1) {
      durationInMinutes = durationParts[0] / 60
    }
    return durationInMinutes
  }

  const buildWeekMinutesAvailable = (): WeekMinutesAvailable => {
    return ALL_DAYS.reduce((acc, day) => {
      const parsedMinutes = Number(dailyAvailableMinutes[day])
      acc[day] = Number.isFinite(parsedMinutes) ? Math.max(parsedMinutes, 0) : 0
      return acc
    }, {} as WeekMinutesAvailable)
  }

  const generateScheduleForDays = () => {
    const ignoredVideos: VideoInfo[] = []
    const scheduledDays: ScheduledDay[] = []
    const pendingVideos: Array<{ video: VideoInfo; durationInMinutes: number }> = []
    const maxDailyMinutes = Math.max(...ALL_DAYS.map((day) => Number(dailyAvailableMinutes[day]) || 0), 0)

    // Pré-validação: só vai para pending o que pode ser agendado em algum dia.
    videos.forEach((video) => {
      if (!video.duration) {
        ignoredVideos.push(video)
        return
      }

      const durationInMinutes = convertDurationStringToMinutes(video.duration)
      if (durationInMinutes === null) {
        ignoredVideos.push(video)
        return
      }

      if (durationInMinutes > maxDailyMinutes) {
        ignoredVideos.push(video)
        return
      }

      pendingVideos.push({ video, durationInMinutes })
    })

    if (pendingVideos.length === 0 || maxDailyMinutes === 0) {
      ignoredVideos.push(...pendingVideos.map((item) => item.video))
      return { scheduledDays, ignoredVideos }
    }

    while (pendingVideos.length > 0) {
      const weekMinutesAvailable = buildWeekMinutesAvailable()
      const weekSchedule = createEmptyWeekSchedule()
      const nextPendingVideos: Array<{ video: VideoInfo; durationInMinutes: number }> = []
      let scheduledInCurrentWeek = 0

      for (const item of pendingVideos) {
        let videoScheduled = false

        for (const day of ALL_DAYS) {
          const availableMinutes = weekMinutesAvailable[day]
          if (availableMinutes > 0 && item.durationInMinutes <= availableMinutes) {
            weekSchedule[day].push(item.video)
            weekMinutesAvailable[day] -= item.durationInMinutes
            videoScheduled = true
            scheduledInCurrentWeek += 1
            break
          }
        }

        if (!videoScheduled) {
          nextPendingVideos.push(item)
        }
      }

      if (scheduledInCurrentWeek === 0) {
        ignoredVideos.push(...nextPendingVideos.map((item) => item.video))
        break
      }

      for (const day of ALL_DAYS) {
        scheduledDays.push({ day, videos: weekSchedule[day] })
      }

      pendingVideos.length = 0
      pendingVideos.push(...nextPendingVideos)
    }

    while (scheduledDays.length > 0 && scheduledDays[scheduledDays.length - 1].videos.length === 0) {
      scheduledDays.pop()
    }

    return { scheduledDays, ignoredVideos }
  }

  const { scheduledDays, ignoredVideos } = generateScheduleForDays()
  const scheduledVideosCount = scheduledDays.reduce(
    (total, daySchedule) => total + daySchedule.videos.length,
    0,
  )
  const daysCount = scheduledDays.length

  return (
    <div className="flex flex-col gap-2  min-h-0 px-6 -mt-2">
      <p className="shrink-0 text-xs">It will take <span className="font-bold text-primary bg-primary-200">{daysCount}  day(s)</span> to watch all available videos.</p>
      <div className="mt-2 flex-1 min-h-0  overflow-x-auto">
        <div className="flex flex-row gap-2">
          {scheduledDays.map((daySchedule, index) => (
            <div key={`${daySchedule.day}-${index}`} className="flex flex-col gap-2 w-56 bg-muted items-center rounded-md p-2">
              <h5 className="text-sm font-bold">
                Day {index + 1}
              </h5>
              <p className="mb-4">{capitalizeFirstLetter(daySchedule.day)}</p>
              {daySchedule.videos.length === 0 ? (
                <p className="text-xs text-muted-foreground">No videos scheduled.</p>
              ) : (
                daySchedule.videos.map((video) => (
                  <Link
                    key={video.id.videoId}
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center gap-2 bg-white p-2 rounded-md w-full min-w-52 h-24"
                  >
                    <Image
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      width={32}
                      height={32}
                      className="w-12 h-14 object-cover"
                    />
                    <span className="text-xs text-black break-all" title={video.snippet.title}>
                      {truncateText(video.snippet.title, 25)}
                    </span>

                  </Link>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground shrink-0">Scheduled videos: {scheduledVideosCount} | Ignored videos: {ignoredVideos.length}</p>
    </div>
  )
}

export default WeekView