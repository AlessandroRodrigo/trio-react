import dayjs from 'dayjs'
import { TSelectedDate } from 'pages/BikeDetails/components/BookingCalendar/BookingCalendar.context'

function getMonthName(monthNumber: number) {
  return new Date(0, monthNumber).toLocaleString('en', { month: 'long' })
}

function generateDaysOfMonth(date: Date): Date[] {
  let startOfMonth = dayjs(date).startOf('month')
  let endOfMonth = dayjs(date).endOf('month')

  if (startOfMonth.day() !== 0) {
    startOfMonth = startOfMonth.day(0).subtract(0, 'day')
  }

  if (endOfMonth.day() !== 6) {
    endOfMonth = endOfMonth.day(6).add(0, 'days')
  }

  const days = []
  let day = startOfMonth

  while (day.isBefore(endOfMonth, 'day') || day.isSame(endOfMonth, 'day')) {
    days.push(day.toDate())
    day = day.add(1, 'day')
  }

  return days
}

function isBefore(day: Date) {
  return dayjs(day).isBefore(dayjs(), 'day')
}

function addMonths(date: Date, months: number) {
  return dayjs(date).add(months, 'month').toDate()
}

function subtractMonths(date: Date, months: number) {
  return dayjs(date).subtract(months, 'month').toDate()
}

function isSameDay(...dates: Date[]) {
  const [firstDate, ...restDates] = dates

  return restDates.every((date) => dayjs(firstDate).isSame(date, 'day'))
}

function isSameMonth(...dates: Date[]) {
  const [firstDate, ...restDates] = dates

  return restDates.every((date) => dayjs(firstDate).isSame(date, 'month'))
}

function isSameYear(...dates: Date[]) {
  const [firstDate, ...restDates] = dates

  return restDates.every((date) => dayjs(firstDate).isSame(date, 'year'))
}

function isBetween(date: Date, startDate: Date, endDate: Date) {
  return dayjs(date).isAfter(startDate, 'day') && dayjs(date).isBefore(endDate, 'day')
}

function getTotalDays(date: TSelectedDate) {
  return dayjs(date.end).diff(date.start, 'day')
}

export const BookingCalendarUtils = {
  getMonthName,
  generateDaysOfMonth,
  isBefore,
  addMonths,
  subtractMonths,
  isSameDay,
  isSameMonth,
  isSameYear,
  isBetween,
  getTotalDays,
}
