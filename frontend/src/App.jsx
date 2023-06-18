import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { useAtom } from 'jotai';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Akun from './pages/Akun';
import Dashboard from './pages/Dashboard'
import Laporan from './pages/Laporan';
import Agenda from './pages/Agenda';
import DataWarga from './pages/DataWarga';
import Layanan from './pages/Layanan';
import { dataLengkapUserAtom, userDariStorageAtom, usersDataAtom } from './stateAtom';
import { useEffect } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: 'Open Sans, Arial',
  },
});

export default function App() {
  const [userDariStorage,] = useAtom(userDariStorageAtom)
  const [dataLengkapUser, setDataLengkapUser] = useAtom(dataLengkapUserAtom)
  const [users, setUsersData] = useAtom(usersDataAtom)


  useEffect(() => {
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
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route
                path="/"
                // element={<Navigate to='/dashboard' />}
                element={!dataLengkapUser ? <Navigate to="/login" /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/login"
                // element={<Login />}
                element={!dataLengkapUser ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/signup"
                // element={<SignUp />}
                element={!dataLengkapUser ? <SignUp /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/dashboard"
                // element={<Dashboard />}
                element={userDariStorage ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/akun"
                // element={<Akun />}
                element={userDariStorage ? <Akun /> : <Navigate to="/login" />}
              />
              <Route
                path="/laporan"
                // element={<Laporan />}
                element={userDariStorage ? <Laporan /> : <Navigate to="/login" />}
              />
              <Route
                path="/agenda"
                // element={<Agenda />}
                element={userDariStorage ? <Agenda /> : <Navigate to="/login" />}
              />
              <Route
                path="/data-warga"
                // element={<DataWarga />}
                element={userDariStorage ? <DataWarga /> : <Navigate to="/login" />}
              />
              <Route
                path="/layanan"
                // element={<Layanan />}
                element={userDariStorage ? <Layanan /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}