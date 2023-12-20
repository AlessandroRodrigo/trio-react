import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { createContext, useContext, useState } from 'react'
import { BookingCalendarConstants } from './BookingCalendar.constants'
import {
  ActionButton,
  ActionWrapper,
  CalendarBodyContainer,
  Content,
  Header,
  MonthDayButton,
  MonthDaysContainer,
  MonthLabel,
  WeekDayLabel,
  WeekDaysContainer,
  YearLabel,
} from './BookingCalendar.styles'
import { BookingCalendarUtils } from './BookingCalendar.utils'

const CalendarContext = createContext<{
  currentDate: Date
  selectedDays: {
    start: Date | null
    end: Date | null
  }
  setCurrentDate: (date: Date) => void
  setSelectedDays: (dates: { start: Date | null; end: Date | null }) => void
}>({
  currentDate: new Date(),
  selectedDays: {
    start: null,
    end: null,
  },
  setCurrentDate: () => {
    throw new Error('setCurrentDate function must be overridden')
  },
  setSelectedDays: () => {
    throw new Error('setSelectedDays function must be overridden')
  },
})

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDays, setSelectedDays] = useState<{
    start: Date | null
    end: Date | null
  }>({
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
      <Content>
        <CalendarHeader />

        <CalendarBody />
      </Content>
    </CalendarContext.Provider>
  )
}

function CalendarHeader() {
  const { currentDate, setCurrentDate } = useContext(CalendarContext)
  const monthName = BookingCalendarUtils.getMonthName(currentDate.getMonth())
  const year = currentDate.getFullYear()
  const shouldDisablePrevMonthButton =
    BookingCalendarUtils.shouldDisablePrevMonthButton(currentDate)

  function handlePrevMonth() {
    setCurrentDate(BookingCalendarUtils.subtractMonths(currentDate, 1))
  }

  function handleNextMonth() {
    setCurrentDate(BookingCalendarUtils.addMonths(currentDate, 1))
  }

  return (
    <Header data-testid='calendar-header'>
      <div>
        <MonthLabel data-testid='month-label'>{monthName}</MonthLabel>
        <YearLabel>{year}</YearLabel>
      </div>

      <ActionWrapper>
        <ActionButton
          onClick={handlePrevMonth}
          disabled={shouldDisablePrevMonthButton}
          data-testid='prev-month-button'
        >
          <ChevronLeft />
        </ActionButton>

        <ActionButton onClick={handleNextMonth} data-testid='next-month-button'>
          <ChevronRight />
        </ActionButton>
      </ActionWrapper>
    </Header>
  )
}

function CalendarBody() {
  const { currentDate, selectedDays, setSelectedDays } = useContext(CalendarContext)
  const daysOfMonth = BookingCalendarUtils.generateDaysOfMonth(currentDate)

  function handleSelectDate(date: Date) {
    if (selectedDays.start === null) {
      setSelectedDays({ start: date, end: null })
    } else if (selectedDays.end === null) {
      setSelectedDays({ start: selectedDays.start, end: date })
    } else {
      setSelectedDays({ start: date, end: null })
    }
  }

  function isSelected(day: Date) {
    if (selectedDays.start === null || selectedDays.end === null) {
      return false
    }

    return BookingCalendarUtils.isBetween(day, selectedDays.start, selectedDays.end)
  }

  return (
    <CalendarBodyContainer>
      <WeekDaysContainer>
        {BookingCalendarConstants.WEEK_DAYS.map((day, index) => (
          <WeekDayLabel key={index} variant='h6' color='primary' fontWeight={700}>
            {day}
          </WeekDayLabel>
        ))}
      </WeekDaysContainer>
      <MonthDaysContainer>
        {daysOfMonth.map((day, index) => (
          <MonthDayButton
            data-testid={`month-day-button-${day.getDate()}`}
            onClick={() => handleSelectDate(day)}
            isToday={BookingCalendarUtils.isSameDay(day, new Date())}
            isSelected={isSelected(day)}
            isTail={!!selectedDays.start && BookingCalendarUtils.isSameDay(day, selectedDays.start)}
            isHead={!!selectedDays.end && BookingCalendarUtils.isSameDay(day, selectedDays.end)}
            disabled={BookingCalendarUtils.shouldDisableDayButton(day)}
            key={index}
          >
            {day.getDate()}
          </MonthDayButton>
        ))}
      </MonthDaysContainer>
    </CalendarBodyContainer>
  )
}
