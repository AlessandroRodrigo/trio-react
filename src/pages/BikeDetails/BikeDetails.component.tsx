import { Box, Breadcrumbs, Divider, Link, Stack, Typography } from '@mui/material'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import BookingAddressMap from 'components/BookingAddressMap'
import { BookingCalendarContainer } from 'components/BookingCalendar/BookingCalendar.container'
import { TSelectedDate } from 'components/BookingCalendar/BookingCalendar.context'
import { BookingCalendarUtils } from 'components/BookingCalendar/BookingCalendar.utils'
import Header from 'components/Header'
import Bike from 'models/Bike'
import { useState } from 'react'
import {
  BookingButton,
  BreadcrumbContainer,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Content,
  DetailsContainer,
  FavoriteIcon,
  InfoIcon,
  LikeButton,
  OverviewContainer,
  PriceRow,
} from './BikeDetails.styles'
import { getServicesFee } from './BikeDetails.utils'

interface BikeDetailsProps {
  bike?: Bike
  onBooking?: (selectedDate: TSelectedDate) => Promise<void>
  successfullyBooked?: boolean
}

const BikeDetails = ({ bike, onBooking, successfullyBooked }: BikeDetailsProps) => {
  const [selectedDate, setSelectedDate] = useState<TSelectedDate>({
    start: null,
    end: null,
  })
  const rateByDay = bike?.rate || 0
  const rateByWeek = rateByDay * 7

  const subTotal = rateByDay * BookingCalendarUtils.getTotalDays(selectedDate)
  const servicesFee = getServicesFee(subTotal)
  const total = subTotal + servicesFee

  return (
    <div data-testid='bike-details-page'>
      <Header />

      <BreadcrumbContainer data-testid='bike-details-breadcrumbs'>
        <Breadcrumbs separator={<BreadcrumbSeparator />}>
          <Link underline='hover' display='flex' alignItems='center' color='white' href='/'>
            <BreadcrumbHome />
          </Link>

          <Typography fontWeight={800} letterSpacing={1} color='white'>
            {bike?.name}
          </Typography>
        </Breadcrumbs>
      </BreadcrumbContainer>

      <Content>
        <DetailsContainer variant='outlined' data-testid='bike-details-container'>
          {!!bike?.imageUrls && <BikeImageSelector imageUrls={bike.imageUrls} />}

          <BikeSpecs bodySize={bike?.bodySize} maxLoad={bike?.maxLoad} ratings={bike?.ratings} />

          <Divider />

          <Box marginY={2.25}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <div>
                <Typography
                  variant='h1'
                  fontSize={38}
                  fontWeight={800}
                  marginBottom={0.5}
                  data-testid='bike-name-details'
                >
                  {bike?.name}
                </Typography>

                <BikeType type={bike?.type} />
              </div>

              <LikeButton>
                <FavoriteIcon />
              </LikeButton>
            </Box>

            <Typography marginTop={1.5} fontSize={14}>
              {bike?.description}
            </Typography>
          </Box>

          <Divider />

          <Box marginY={2.25} data-testid='bike-prices-details'>
            <PriceRow>
              <Typography>Day</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByDay} €
              </Typography>
            </PriceRow>

            <PriceRow>
              <Typography>Week</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByWeek} €
              </Typography>
            </PriceRow>
          </Box>

          <Divider />

          <Box marginTop={3.25}>
            <Typography variant='h1' fontSize={24} fontWeight={800}>
              Full adress after booking
            </Typography>

            <BookingAddressMap />
          </Box>
        </DetailsContainer>

        <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
          {successfullyBooked ? (
            <SuccessfullyBookedFeedback
              imageUrls={bike?.imageUrls}
              name={bike?.name}
              type={bike?.type}
            />
          ) : (
            <>
              <Typography variant='h2' fontSize={24} fontWeight={800} marginBottom={1.25}>
                Select date and time
              </Typography>

              <BookingCalendarContainer onChange={setSelectedDate} />

              <Typography variant='h2' fontSize={16} marginTop={4} marginBottom={1.25}>
                Booking Overview
              </Typography>

              <Divider />

              <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
                <Box display='flex' alignItems='center'>
                  <Typography marginRight={1}>Subtotal</Typography>
                  <InfoIcon fontSize='small' />
                </Box>

                <Typography>{subTotal | 0} €</Typography>
              </PriceRow>

              <PriceRow marginTop={1.5} data-testid='bike-overview-single-price'>
                <Box display='flex' alignItems='center'>
                  <Typography marginRight={1}>Service Fee</Typography>
                  <InfoIcon fontSize='small' />
                </Box>

                <Typography>{servicesFee | 0} €</Typography>
              </PriceRow>

              <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
                <Typography fontWeight={800} fontSize={16}>
                  Total
                </Typography>
                <Typography variant='h2' fontSize={24} letterSpacing={1}>
                  {total | 0} €
                </Typography>
              </PriceRow>

              <BookingButton
                fullWidth
                disableElevation
                variant='contained'
                data-testid='bike-booking-button'
                disabled={!selectedDate.start || !selectedDate.end}
                onClick={() => onBooking?.(selectedDate)}
              >
                Add to booking
              </BookingButton>
            </>
          )}
        </OverviewContainer>
      </Content>
    </div>
  )
}

export default BikeDetails

function SuccessfullyBookedFeedback(bike: Partial<Pick<Bike, 'imageUrls' | 'name' | 'type'>>) {
  return (
    <Stack gap='24px' alignItems='center' justifyContent='center'>
      <Typography fontSize={24} fontWeight={800}>
        Thank you!
      </Typography>

      <Typography fontSize={16} fontWeight={600}>
        Your bike is booked.
      </Typography>

      <Stack gap='16px' alignItems='center' justifyContent='center'>
        <img
          src={bike.imageUrls?.[0]}
          width={150}
          height={150}
          style={{
            objectFit: 'contain',
          }}
        />

        <Stack alignItems='center' justifyContent='center'>
          <Typography fontSize={18} fontWeight={700}>
            {bike.name}
          </Typography>

          <BikeType type={bike.type} />
        </Stack>
      </Stack>
    </Stack>
  )
}
