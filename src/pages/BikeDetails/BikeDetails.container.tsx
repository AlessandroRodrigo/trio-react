import Bike from 'models/Bike'
import { TSelectedDate } from 'pages/BikeDetails/components/BookingCalendar/BookingCalendar.context'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from 'services/api'
import BikeDetails from './BikeDetails.component'

type StateReceived = {
  bike: Bike
}

const BikeDetailsContainer = () => {
  const { state } = useLocation()
  const [successfullyBooked, setSuccessfullyBooked] = useState(false)

  const [currentBikeData, setCurrentBikeData] = useState<Bike>()

  useEffect(() => {
    if (state) {
      const { bike } = state as StateReceived
      setCurrentBikeData(bike)
    }
  }, [])

  async function handleBooking(selectedDate: TSelectedDate) {
    const response = await apiClient.post('/rentals', {
      candidateId: Number(process.env.REACT_APP_BOILERPLATE_CANDIDATE_ID),
      bikeId: currentBikeData?.id,
      start: selectedDate.start,
      end: selectedDate.end,
    })

    if (response.status === 201) {
      setSuccessfullyBooked(true)
    }
  }

  return (
    <BikeDetails
      bike={currentBikeData}
      onBooking={handleBooking}
      successfullyBooked={successfullyBooked}
    />
  )
}

export default BikeDetailsContainer
