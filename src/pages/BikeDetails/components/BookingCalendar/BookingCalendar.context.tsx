import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type TSelectedDate = {
  start: Date | null
  end: Date | null
}

type ProviderProps = {
  onChange: (dates: TSelectedDate) => void
}

type TCalendarContext = {
  currentDate: Date
  selectedDays: TSelectedDate
  setCurrentDate: (date: Date) => void
  setSelectedDays: (dates: TSelectedDate) => void
  onChange: ProviderProps['onChange']
} | null

const CalendarContext = createContext<TCalendarContext>(null)

export function useCalendarContext() {
  const context = useContext(CalendarContext)

  if (!context) {
    throw new Error('useCalendarContext must be used within a CalendarProvider')
  }

  return context
}

export function CalendarProvider({ children, onChange }: PropsWithChildren<ProviderProps>) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDays, setSelectedDays] = useState<TSelectedDate>({
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
        onChange,
      }}
    >
      {children}
    </CalendarContext.Provider>
  )
}
