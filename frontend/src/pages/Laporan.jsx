import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "../components/AppBar";
import { DrawerHeader } from "../components/DrawerHeader";
import WargaDrawer from "../components/WargaDrawer";
import { useAtom } from "jotai";
import { dataLengkapUserAtom, openDrawerAtom, userDariStorageAtom, usersDataAtom } from "../stateAtom";
import { Main } from "../components/Main";
import { Grid, Paper } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import GrafikUsia from "../components/GrafikUsia";
import GrafikPendidikan from "../components/GrafikPendidikan";

export default function Laporan() {
  const [openDrawer, setOpenDrawer] = useAtom(openDrawerAtom)
  const [users, setUsersData] = useAtom(usersDataAtom)
  const [userDariStorage,] = useAtom(userDariStorageAtom)
  const [dataLengkapUser, setDataLengkapUser] = useAtom(dataLengkapUserAtom)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user', {
        headers: { 'Authorization': `Bearer ${userDariStorage.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        setUsersData(json)
        const dataUser = json.filter(d => d.email === userDariStorage.email)[0]
        setDataLengkapUser(dataUser)
      }
    }

    if (userDariStorage) {
      fetchUsers()
    }

  }, [setUsersData])

  return (
    <>
      {users &&
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" open={openDrawer} bgcolor="#FBFBFB" elevation={0}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
                // sx={{ mr: 2, ...(open && { display: "none" }) }}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Laporan
              </Typography>
            </Toolbar>
          </AppBar>
          <WargaDrawer />
          {users &&
            <Main open={openDrawer}>
              <DrawerHeader />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant='h4'>{users.length}</Typography>
                    <Typography mt={1}><InfoIcon sx={{ width: 15, height: 15, mr: '4px' }} />Total Data Warga</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant='h4'>{users.filter(e => e.JK === 'lakiLaki').length}</Typography>
                    <Typography mt={1}><InfoIcon sx={{ width: 15, height: 15, mr: '4px' }} />Total Warga Laki-laki</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant='h4'>{users.filter(e => e.JK === 'perempuan').length}</Typography>
                    <Typography mt={1}><InfoIcon sx={{ width: 15, height: 15, mr: '4px' }} />Total Warga Perempuan</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Paper sx={{ mt: 2, p: 2 }}>
                <Grid container justifyContent='space-between' mb={3}>
                  <Grid item>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Laporan Data Warga Berdasarkan Usia</Typography>
                  </Grid>
                </Grid>
                <GrafikUsia />
              </Paper>
              <Paper sx={{ mt: 2, p: 2 }}>
                <Grid container justifyContent='space-between' mb={3}>
                  <Grid item>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Laporan Data Warga Berdasarkan Pendidikan</Typography>
                  </Grid>
                </Grid>
                <GrafikPendidikan />
              </Paper>
            </Main >
          }
        </Box >
      }
    </>
  );
}
