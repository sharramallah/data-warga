import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
// import MuiAppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Button, Grid } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AssessmentIcon from '@mui/icons-material/Assessment'
import GroupsIcon from '@mui/icons-material/Groups'
import DvrIcon from '@mui/icons-material/Dvr'
import EventIcon from '@mui/icons-material/Event'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { useAtom } from 'jotai'
import { dataLengkapUserAtom, openDrawerAtom, userDataAtom } from '../stateAtom'
import { Link, useLocation } from 'react-router-dom'
import KonfirmasiLogout from './KonfirmasiLogout'
import { alertKonfirmasiLogoutAtom } from '../stateAtom'

const drawerWidth = 255

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#FFFFFF'),
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#686B7B'
  },
  textTransform: 'none',
  borderRadius: 7,
  padding: '2px'
  // border: '2px solid black'
}))

const TulisanLinks = styled(Typography)(({ theme }) => ({
  fontSize: 12
}))

export default function WargaDrawer() {
  const location = useLocation()
  const [openDrawer] = useAtom(openDrawerAtom)
  const [alertLogout, setAlertLogout] = useAtom(alertKonfirmasiLogoutAtom)
  const [dataLengkapUser] = useAtom(dataLengkapUserAtom)

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={openDrawer}
      >
        <Grid
          container
          direction={'column'}
          alignItems={'center'}
          bgcolor='#090D22'
          height='100vh'
        >
          <Grid container width='100%' justifyContent='center' mt={3}>
            <Grid item>
              <Typography
                border='1px solid #FFFFFF'
                borderRadius={10}
                padding='8px 32px'
                color='#FFFFFF'
              >
                wargaku
              </Typography>
            </Grid>
          </Grid>
          <Grid item mt={2} sx={{ color: 'white' }}>
            <Box align='center'>
              <Avatar sx={{ width: 70, height: 70 }} alt='Remy Sharp' />
            </Box>
            <Typography mt={2} align='center'>
              {dataLengkapUser.namaLengkap}
            </Typography>
            <Typography align='center' variant='body2'>
              {dataLengkapUser.email}
            </Typography>
            <Box mt={2} align='center'>
              <KonfirmasiLogout />
              <ColorButton
                onClick={() => setAlertLogout(true)}
                sx={{ px: 2, py: 1 }}
                startIcon={<LogoutIcon />}
                variant='contained'
                disableElevation
              >
                Log out
              </ColorButton>
            </Box>
          </Grid>

          <Grid mt={2} container spacing={2} justifyContent={'center'}>
            <Grid item>
              <ColorButton
                component={Link}
                to={'/dashboard'}
                variant='contained'
                disableElevation
                sx={{
                  width: 80,
                  height: 80,
                  ...(location.pathname === '/dashboard'
                    ? { bgcolor: '#686B7B' }
                    : {})
                }}
              >
                <Grid container justifyContent={'center'}>
                  <HomeOutlinedIcon sx={{ width: 45, height: 45 }} />
                  <TulisanLinks>Beranda</TulisanLinks>
                </Grid>
              </ColorButton>
            </Grid>
            <Grid item>
              <ColorButton
                component={Link}
                to={'/laporan'}
                variant='contained'
                disableElevation
                sx={{
                  width: 80,
                  height: 80,
                  ...(location.pathname === '/laporan'
                    ? { bgcolor: '#686B7B' }
                    : {})
                }}
              >
                <Grid container justifyContent={'center'}>
                  <AssessmentIcon sx={{ width: 45, height: 45 }} />
                  <TulisanLinks>Laporan</TulisanLinks>
                </Grid>
              </ColorButton>
            </Grid>
            <Grid item>
              <ColorButton
                component={Link}
                to={'/data-warga'}
                variant='contained'
                disableElevation
                sx={{
                  width: 80,
                  height: 80,
                  ...(location.pathname === '/data-warga'
                    ? { bgcolor: '#686B7B' }
                    : {})
                }}
              >
                <Grid container justifyContent={'center'}>
                  <GroupsIcon sx={{ width: 45, height: 45 }} />
                  <TulisanLinks>Data Warga</TulisanLinks>
                </Grid>
              </ColorButton>
            </Grid>
            {/* <Grid item>
              <ColorButton component={Link} to={'/layanan'} variant="contained" disableElevation sx={{ width: 80, height: 80, ...(location.pathname === '/layanan' ? { bgcolor: '#C76D6D' } : {}) }}>
                <Grid container justifyContent={'center'}>
                  <DvrIcon sx={{ width: 45, height: 45 }} />
                  <TulisanLinks>
                    Layanan
                  </TulisanLinks>
                </Grid>
              </ColorButton>
            </Grid> */}
            {/* <Grid item>
              <ColorButton component={Link} to={'/agenda'} variant="contained" disableElevation sx={{ width: 80, height: 80, ...(location.pathname === '/agenda' ? { bgcolor: '#C76D6D' } : {}) }}>
                <Grid container justifyContent={'center'}>
                  <EventIcon sx={{ width: 45, height: 45 }} />
                  <TulisanLinks>
                    Agenda
                  </TulisanLinks>
                </Grid>
              </ColorButton>
            </Grid> */}
            <Grid item>
              <ColorButton
                component={Link}
                to={'/akun'}
                variant='contained'
                disableElevation
                sx={{
                  width: 80,
                  height: 80,
                  ...(location.pathname === '/akun'
                    ? { bgcolor: '#686B7B' }
                    : {})
                }}
              >
                <Grid
                  container
                  justifyContent={'center'}
                  alignItems='center'
                  direction={'column'}
                >
                  <ManageAccountsIcon sx={{ width: 45, height: 45 }} />
                  <TulisanLinks>Akun</TulisanLinks>
                </Grid>
              </ColorButton>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  )
}
