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
import { alpha, Grid, InputBase, Paper } from "@mui/material";
import TabelDataWarga from "../components/TabelDataWarga";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  // marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function DataWarga() {
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
                Data Warga
              </Typography>
            </Toolbar>
          </AppBar>
          <WargaDrawer />
          <Main open={openDrawer}>
            <DrawerHeader />
            <Grid container direction={'column'} spacing={2}>
              <Grid item>
                <Paper>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Cari..."
                      inputProps={{ 'aria-label': 'search' }}
                    />
                  </Search>
                </Paper>
              </Grid>
              <Grid item>
                <TabelDataWarga />
              </Grid>
            </Grid>
          </Main>
        </Box>
      }
    </>
  );
}
