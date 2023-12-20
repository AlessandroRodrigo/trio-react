import dayjs from 'dayjs'

function getMonthName(monthNumber: number) {
  return new Date(0, monthNumber).toLocaleString('en', { month: 'long' })
}

function generateDaysOfMonth(date: Date): Date[] {
  const startOfMonth = dayjs(date).startOf('month')
  const endOfMonth = dayjs(date).endOf('month')

  const days = []
  let day = startOfMonth

  while (day.isBefore(endOfMonth, 'day')) {
    days.push(day.toDate())
    day = day.add(1, 'day')
  }

  return days
}

function shouldDisablePrevMonthButton(currentDate: Date) {
  const date = new Date()

  return (
    currentDate.getMonth() === date.getMonth() && currentDate.getFullYear() === date.getFullYear()
  )
}

function shouldDisableDayButton(day: Date) {
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

function isBetween(date: Date, startDate: Date, endDate: Date) {
  return dayjs(date).isAfter(startDate, 'day') && dayjs(date).isBefore(endDate, 'day')
}

export const BookingCalendarUtils = {
  getMonthName,
  generateDaysOfMonth,
  shouldDisablePrevMonthButton,
  shouldDisableDayButton,
  addMonths,
  subtractMonths,
  isSameDay,
  isBetween,
}
