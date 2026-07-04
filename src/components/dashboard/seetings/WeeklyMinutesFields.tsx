"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { useSearchContext, type WeekdayKey } from "@/contexts/search-context"

const WEEK_DAYS: Array<{ key: WeekdayKey; label: string }> = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
]

const WeeklyMinutesFields = () => {
  const { dailyAvailableMinutes, setDailyAvailableMinutes } = useSearchContext()

  return WEEK_DAYS.map((day) => {
    const inputId = `daily-minutes-${day.key}`

    return (
      <Field key={day.key} className="items-center">
        <FieldLabel className="w-full justify-center" htmlFor={inputId}>
          {day.label}
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id={inputId}
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            value={dailyAvailableMinutes[day.key]}
            onChange={(e) =>
              setDailyAvailableMinutes({
                ...dailyAvailableMinutes,
                [day.key]: e.target.value,
              })
            }
          />
        </InputGroup>
      </Field>
    )
  })
}

export default WeeklyMinutesFields
