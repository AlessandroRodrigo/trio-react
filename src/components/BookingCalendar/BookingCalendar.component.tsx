import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useCalendarContext } from 'components/BookingCalendar/BookingCalendar.context'
import { BookingCalendarConstants } from './BookingCalendar.constants'
import {
  ActionButton,
  ActionWrapper,
  CalendarBodyContainer,
  Header,
  MonthDayButton,
  MonthDaysContainer,
  MonthLabel,
  WeekDayLabel,
  WeekDaysContainer,
  Wrapper,
  YearLabel,
} from './BookingCalendar.styles'
import { BookingCalendarUtils } from './BookingCalendar.utils'

export default function BookingCalendar() {
  return (
    <Wrapper>
      <CalendarHeader />

      <CalendarBody />
    </Wrapper>
  )
}

function CalendarHeader() {
  const { currentDate, setCurrentDate } = useCalendarContext()
  const monthName = BookingCalendarUtils.getMonthName(currentDate.getMonth())
  const year = currentDate.getFullYear()
  const shouldDisablePrevMonthButton =
    BookingCalendarUtils.isSameMonth(currentDate, new Date()) &&
    BookingCalendarUtils.isSameYear(currentDate, new Date())

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
  const { currentDate, selectedDays, setSelectedDays, onChange } = useCalendarContext()
  const daysOfMonth = BookingCalendarUtils.generateDaysOfMonth(currentDate)

  function handleSelectDate(date: Date) {
    if (selectedDays.start === null) {
      setSelectedDays({ start: date, end: null })
    } else if (selectedDays.end === null) {
      setSelectedDays({ start: selectedDays.start, end: date })
      onChange({ start: selectedDays.start, end: date })
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
            disabled={
              BookingCalendarUtils.isBefore(day) ||
              !BookingCalendarUtils.isSameMonth(day, currentDate)
            }
            key={index}
          >
            {day.getDate()}
          </MonthDayButton>
        ))}
      </MonthDaysContainer>
    </CalendarBodyContainer>
  )
}
