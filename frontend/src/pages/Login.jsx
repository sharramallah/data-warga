import { Alert, Grid, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useAtom } from 'jotai'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonSimpan } from '../components/ButtonSimpan'
import { useLogin } from '../hooks/useLogin'
import { alertBerhasilDaftarAtom, userDataAtom } from '../stateAtom'

export default function Login() {
  const { login, error, isLoading } = useLogin()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const [alertBerhasilDaftar, setAlertBerhasilDaftar] = useAtom(
    alertBerhasilDaftarAtom
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, pw)
    setAlertBerhasilDaftar(false)
  }

  return (
    <Grid container height={'100vh'}>
      <Grid item xs={6}>
        <Box width={'100%'} height={'100%'} bgcolor={'#090D22'}>
          <Grid
            container
            height={'100%'}
            justifyContent='center'
            alignItems='center'
          >
            <Grid
              item
              sx={{
                border: '10px solid #F5F5F5',
                px: 5,
                py: 2,
                borderRadius: 7
              }}
            >
              <Typography color={'#F5F5F5'} variant='h2' fontWeight={'bold'}>
                wargaku
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box width={'100%'} height={'100%'} bgcolor={'#E8E8E8'}>
          <Grid
            container
            height={'100%'}
            direction='column'
            justifyContent={'center'}
          >
            <Box px={20}>
              {alertBerhasilDaftar && (
                <Alert
                  sx={{ mb: 3 }}
                  onClose={() => {
                    setAlertBerhasilDaftar(false)
                  }}
                >
                  Anda berhasil daftar! Silakan masuk
                </Alert>
              )}
              <Typography
                align='center'
                mb={3}
                variant='h3'
                sx={{ fontWeight: 'medium' }}
              >
                Masuk
              </Typography>
              {error && (
                <Alert sx={{ mb: 3 }} severity='error'>
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <Grid container direction='column' spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id='email'
                      label='Email'
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type='password'
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      id='pw'
                      label='Password'
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent={'center'} mt={4}>
                      <Grid item>
                        <ButtonSimpan
                          type='submit'
                          sx={{ px: 10, fontSize: 18, fontWeight: 'bold' }}
                        >
                          Masuk
                        </ButtonSimpan>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
              <Typography
                sx={{ color: 'black', '&:hover': { color: '#0829D7' } }}
                align='center'
                mt={2}
                display={'block'}
                component={Link}
                to={'/signup'}
              >
                Belum punya akun? Daftar
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
