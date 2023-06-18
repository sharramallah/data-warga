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
import { openDrawerAtom } from "../stateAtom";
import { Main } from "../components/Main";
import { Paper } from "@mui/material";

export default function Layanan() {
  const [openDrawer, setOpenDrawer] = useAtom(openDrawerAtom)

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  return (
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
            Layanan
          </Typography>
        </Toolbar>
      </AppBar>
      <WargaDrawer />
      <Main open={openDrawer}>
        <DrawerHeader />
        <Paper sx={{ bgcolor: '#BB7272', py: 2, px: 5 }} variant="outlined">
          <Typography variant="h4">Selamat Datang, Sharina!</Typography>
        </Paper>
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Typography> */}
      </Main>
    </Box>
  );
}
