import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingCalendar from 'pages/BikeDetails/components/BookingCalendar/BookingCalendar.component'
import { BookingCalendarUtils } from 'pages/BikeDetails/components/BookingCalendar/BookingCalendar.utils'
import { BrowserRouter } from 'react-router-dom'

describe('BookingCalendar component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BookingCalendar />
      </BrowserRouter>,
    )
  })

  it('should has a header', () => {
    const headerElement = screen.getByTestId('calendar-header')
    expect(headerElement).toBeInTheDocument()
  })

  it('should initial with the current month', () => {
    const currentMonthName = BookingCalendarUtils.getMonthName(new Date().getMonth())

    const monthLabel = screen.getByTestId('month-label')

    expect(monthLabel?.textContent).toBe(currentMonthName)
  })

  it('should initial with the previous month button disabled', () => {
    const prevButton = screen.getByTestId('prev-month-button')

    expect(prevButton).toBeDisabled()
  })

  it('should highlight the current day with a border', () => {
    const today = new Date().getDate()

    const dayButton = screen.getByTestId(`month-day-button-${today}`)

    expect(dayButton).toHaveStyle('border: 1px solid #9e9e9e')
  })

  it('should not highlight the current day with a border when is not the current month', () => {
    const today = new Date().getDate()

    const nextButton = screen.getByTestId('next-month-button')

    userEvent.click(nextButton)

    const dayButton = screen.getByTestId(`month-day-button-${today}`)

    expect(dayButton).not.toHaveStyle('border: 1px solid #9e9e9e')
  })

  it('changes month when previous button is clicked', () => {
    const currentMonthName = BookingCalendarUtils.getMonthName(new Date().getMonth() + 1)
    const prevMonthName = BookingCalendarUtils.getMonthName(new Date().getMonth())

    const prevButton = screen.getByTestId('prev-month-button')
    const nextButton = screen.getByTestId('next-month-button')
    const monthLabel = screen.getByTestId('month-label')

    userEvent.click(nextButton)

    expect(monthLabel?.textContent).toBe(currentMonthName)

    userEvent.click(prevButton)

    expect(monthLabel?.textContent).toBe(prevMonthName)
  })

  it('changes month when next button is clicked', () => {
    const currentMonthName = BookingCalendarUtils.getMonthName(new Date().getMonth())
    const nextMonthName = BookingCalendarUtils.getMonthName(new Date().getMonth() + 1)

    const nextButton = screen.getByTestId('next-month-button')
    const monthLabel = screen.getByTestId('month-label')

    expect(monthLabel?.textContent).toBe(currentMonthName)

    userEvent.click(nextButton)

    expect(monthLabel?.textContent).toBe(nextMonthName)
  })

  it('should select a range of days', () => {
    const nextMonthButton = screen.getByTestId('next-month-button')

    userEvent.click(nextMonthButton)

    const day1 = screen.getByTestId('month-day-button-1')
    const day5 = screen.getByTestId('month-day-button-5')

    userEvent.click(day1)

    expect(day1).toHaveStyle('background-color: #fff')

    userEvent.click(day5)

    expect(day5).toHaveStyle('background-color: #fff')

    const day2 = screen.getByTestId('month-day-button-2')
    expect(day2).toHaveStyle('background-color: rgba(255, 255, 255, 0.3)')

    const day3 = screen.getByTestId('month-day-button-3')
    expect(day3).toHaveStyle('background-color: rgba(255, 255, 255, 0.3)')

    const day4 = screen.getByTestId('month-day-button-4')
    expect(day4).toHaveStyle('background-color: rgba(255, 255, 255, 0.3)')
  })
})

describe('BookingCalendar utils', () => {
  it('should get the correct number of days in a month', () => {
    const input = new Date(2021, 0, 1)

    const output = BookingCalendarUtils.generateDaysOfMonth(input)

    expect(output).toHaveLength(30)
  })

  it('should get the correct name of the month', () => {
    const input = new Date(2021, 0, 1).getMonth()

    const output = BookingCalendarUtils.getMonthName(input)

    expect(output).toBe('January')
  })

  it('should disable the previous month button when is current or before current month', () => {
    const input = new Date()

    const output =
      BookingCalendarUtils.isSameMonth(input, new Date()) &&
      BookingCalendarUtils.isSameYear(input, new Date())

    expect(output).toBe(true)
  })

  it('should not disable the previous month button when is after current month', () => {
    const input = new Date(2021, 1, 1)

    const output =
      BookingCalendarUtils.isSameMonth(input, new Date()) &&
      BookingCalendarUtils.isSameYear(input, new Date())

    expect(output).toBe(false)
  })

  it('should disable day button when is before current day', () => {
    const input = new Date(2021, 0, 1)

    const output = BookingCalendarUtils.isBefore(input)

    expect(output).toBe(true)
  })

  it('should not disable day button when is after current day', () => {
    const input = new Date()

    const output = BookingCalendarUtils.isBefore(input)

    expect(output).toBe(false)
  })

  it('should add months to a date', () => {
    const input = new Date(2021, 0, 1)
    const months = 1

    const output = BookingCalendarUtils.addMonths(input, months)

    expect(output.getMonth()).toBe(1)
  })

  it('should subtract months to a date', () => {
    const input = new Date(2021, 0, 1)
    const months = 1

    const output = BookingCalendarUtils.subtractMonths(input, months)

    expect(output.getMonth()).toBe(11)
  })

  it('should check if a date is between two dates', () => {
    const input = new Date(2021, 0, 1)
    const start = new Date(2020, 0, 1)
    const end = new Date(2022, 0, 1)

    const output = BookingCalendarUtils.isBetween(input, start, end)

    expect(output).toBe(true)
  })

  it('should check if a date is not between two dates', () => {
    const input = new Date(2023, 0, 1)
    const start = new Date(2020, 0, 1)
    const end = new Date(2022, 0, 1)

    const output = BookingCalendarUtils.isBetween(input, start, end)

    expect(output).toBe(false)
  })

  it('should check if a date is equal to another date', () => {
    const input = new Date(2021, 0, 1)
    const date = new Date(2021, 0, 1)

    const output = BookingCalendarUtils.isSameDay(input, date)

    expect(output).toBe(true)
  })
})
