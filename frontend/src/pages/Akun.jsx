import React, { useEffect, useState } from 'react'
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
import { Grid, Paper } from '@mui/material'
import ToggleJenisForm from '../components/ToggleJenisForm'
import FormDataPribadi from '../components/FormDataPribadi'
import FormDataKeluarga from '../components/FormDataKeluarga'
import FormDataAlamat from '../components/FormDataAlamat'

export default function Akun() {
  const [openDrawer, setOpenDrawer] = useAtom(openDrawerAtom)
  const [formTerpilih, setFormTerpilih] = useState('data pribadi')
  const [userDariStorage] = useAtom(userDariStorageAtom)
  const [users, setUsersData] = useAtom(usersDataAtom)
  const [dataLengkapUser, setDataLengkapUser] = useAtom(dataLengkapUserAtom)

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
                Akun
              </Typography>
            </Toolbar>
          </AppBar>
          <WargaDrawer />
          <Main open={openDrawer}>
            <DrawerHeader />
            <Paper variant='outlined' sx={{ bgcolor: '#E8E8E8', py: 3 }}>
              <Grid container spacing={3}>
                <Grid item>
                  <ToggleJenisForm
                    formTerpilih={formTerpilih}
                    setFormTerpilih={setFormTerpilih}
                  />
                </Grid>
                {formTerpilih === 'data pribadi' && <FormDataPribadi />}
                {formTerpilih === 'data keluarga' && <FormDataKeluarga />}
                {formTerpilih === 'data alamat' && <FormDataAlamat />}
              </Grid>
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
