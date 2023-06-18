import * as React from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from '../components/AppBar'
import { DrawerHeader } from '../components/DrawerHeader'
import WargaDrawer from '../components/WargaDrawer'
import { useAtom } from 'jotai'
import {
  dataLengkapUserAtom,
  openDrawerAtom,
  userDariStorageAtom,
  usersDataAtom
} from '../stateAtom'
import { Main } from '../components/Main'
import { Paper } from '@mui/material'
import { useEffect } from 'react'

export default function Dashboard() {
  const [openDrawer, setOpenDrawer] = useAtom(openDrawerAtom)
  const [dataLengkapUser, setDataLengkapUser] = useAtom(dataLengkapUserAtom)
  const [userDariStorage] = useAtom(userDariStorageAtom)
  const [users, setUsersData] = useAtom(usersDataAtom)

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${userDariStorage.token}` }
      })
      const json = await response.json()

      if (response.ok) {
        setUsersData(json)
        const dataUser = json.filter(
          (d) => d.email === userDariStorage.email
        )[0]
        setDataLengkapUser(dataUser)
      }
    }

    if (userDariStorage) {
      fetchUsers()
    }
  }, [setUsersData])

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <>
      {users && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            position='fixed'
            open={openDrawer}
            bgcolor='#FBFBFB'
            elevation={0}
          >
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={toggleDrawer}
                edge='start'
                // sx={{ mr: 2, ...(open && { display: "none" }) }}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' noWrap component='div'>
                Beranda
              </Typography>
            </Toolbar>
          </AppBar>
          <WargaDrawer />
          <Main open={openDrawer}>
            <DrawerHeader />
            <Paper
              sx={{ bgcolor: '#E8E8E8', py: 2, px: 5, color: 'black' }}
              variant='outlined'
            >
              {dataLengkapUser && (
                <Typography variant='h4'>
                  Selamat Datang, {dataLengkapUser.namaLengkap}!
                </Typography>
              )}
            </Paper>
            {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Typography> */}
          </Main>
        </Box>
      )}
    </>
  )
}
