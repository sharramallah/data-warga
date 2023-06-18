import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ButtonSimpan = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#FFFFFF'),
  backgroundColor: '#686B7B',
  color: 'white',
  border: '2px solid transparent',
  '&:hover': {
    backgroundColor: '#090D22',
    color: 'white',
    border: '2px solid #090D22'
  },
  textTransform: 'none',
  borderRadius: 7,
  padding: '8px 20px',
  fontSize: 16
}))
