import BookingCalendar from 'components/BookingCalendar/BookingCalendar.component'
import { CalendarProvider } from 'components/BookingCalendar/BookingCalendar.context'

type Props = {
  onChange: Parameters<typeof CalendarProvider>[0]['onChange']
}

export function BookingCalendarContainer({ onChange }: Props) {
  return (
    <CalendarProvider onChange={onChange}>
      <BookingCalendar />
    </CalendarProvider>
  )
}
