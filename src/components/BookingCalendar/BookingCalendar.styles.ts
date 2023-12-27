import {
  alpha,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material'

export const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: 30,
  padding: 24,
  minWidth: 350,
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
}))

export const Header = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
}))

export const ActionButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: 20,
  width: 52,
  height: 52,

  svg: {
    color: theme.palette.common.white,
  },

  '&.Mui-disabled': {
    opacity: 0.5,
  },
}))

export const ActionWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}))

export const MonthLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 34,
  fontWeight: 800,
  color: theme.palette.common.white,
  lineHeight: '117%',
}))

export const YearLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 16,
  fontWeight: 600,
  color: theme.palette.common.white,
  lineHeight: '147%',
  opacity: 0.5,
}))

export const CalendarBodyContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}))

export const WeekDaysContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
}))

export const WeekDayLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  color: theme.palette.common.white,
  lineHeight: '147%',
  textAlign: 'center',
  opacity: 0.5,
}))

export const MonthDaysContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  placeItems: 'center',
  rowGap: 8,
}))

interface MonthDayButtonProps extends IconButtonProps {
  isToday: boolean
  isSelected: boolean
  isTail?: boolean
  isHead?: boolean
}

export const MonthDayButton = styled(IconButton)<MonthDayButtonProps>(
  ({ theme, isToday, isSelected, isTail, isHead }) => ({
    borderRadius: 20,
    width: 40,
    height: 40,
    fontSize: 16,
    color: theme.palette.common.white,
    '&.Mui-disabled': {
      opacity: 0.5,
      color: theme.palette.common.white,
    },
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.3),
      ...((isTail || isHead) && {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
      }),
    },
    ...(isToday && {
      border: `1px solid ${theme.palette.grey[500]}`,
      color: theme.palette.common.white,
    }),
    ...(isSelected && {
      backgroundColor: alpha(theme.palette.common.white, 0.3),
    }),
    ...((isTail || isHead) && {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    }),
  }),
)
