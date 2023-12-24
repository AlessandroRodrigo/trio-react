import { PropsWithChildren, createContext, useContext, useState } from 'react'

type TSelectedDays = {
  start: Date | null
  end: Date | null
}

type TCalendarContext = {
  currentDate: Date
  selectedDays: {
    start: Date | null
    end: Date | null
  }
  setCurrentDate: (date: Date) => void
  setSelectedDays: (dates: TSelectedDays) => void
} | null

const CalendarContext = createContext<TCalendarContext>(null)

export function useCalendarContext() {
  const context = useContext(CalendarContext)

  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider')
  }

  return context
}

export function CalendarProvider({ children }: PropsWithChildren) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDays, setSelectedDays] = useState<TSelectedDays>({
    start: null,
    end: null,
  })

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        selectedDays,
        setCurrentDate,
        setSelectedDays,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
