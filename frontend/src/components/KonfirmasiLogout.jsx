import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAtom } from 'jotai';
import { alertKonfirmasiLogoutAtom } from '../stateAtom';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useLogout } from '../hooks/useLogout';

export default function KonfirmasiLogout() {
  const [alertLogout, setAlertLogout] = useAtom(alertKonfirmasiLogoutAtom)
  const { logout } = useLogout()

  const handleClose = () => {
    setAlertLogout(false);
  };

  const handleLogout = async () => {
    logout()
    setAlertLogout(false)
  }

  return (
    <div>
      <Dialog
        open={alertLogout}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Yakin ingin logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Anda perlu masuk kembali.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon={<CloseOutlinedIcon />} onClick={handleClose}>BATAL</Button>
          <Button startIcon={<LogoutIcon />} color='error' onClick={handleLogout} autoFocus>
            LOGOUT
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}