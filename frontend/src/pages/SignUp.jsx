import {
  Alert,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { ButtonSimpan } from '../components/ButtonSimpan'
import { Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSignup } from '../hooks/useSignup'
import { useAtom } from 'jotai'
import { alertBerhasilDaftarAtom } from '../stateAtom'

export default function SignUp() {
  // Data Pribadi
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [namaLengkap, setNamaLengkap] = useState('')
  const [namaPanggilan, setNamaPanggilan] = useState('')
  const [JK, setJK] = useState('')
  const [tempatLahir, setTempatLahir] = useState('')
  const [tanggalLahir, setTanggalLahir] = useState('')
  const [isIndo, setIsIndo] = useState(false)
  const [kewarganegaraan, setKewarganegaraan] = useState('')
  const [statusNikah, setStatusNikah] = useState('')
  const [namaPasangan, setNamaPasangan] = useState('')
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState('')

  // Data Alamat
  const [statusTinggal, setStatusTinggal] = useState('')
  const [prov, setProv] = useState('')
  const [kabKota, setKabKota] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [kelDes, setKelDes] = useState('')
  const [rw, setRw] = useState('')
  const [rt, setRt] = useState('')
  const [jalan, setJalan] = useState('')
  const [noRumah, setNoRumah] = useState('')

  // Daftar
  const { signup, error, isLoading } = useSignup()
  const [, setAlertBerhasilDaftar] = useAtom(alertBerhasilDaftarAtom)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = await signup({
      email,
      pw,
      namaLengkap,
      namaPanggilan,
      JK,
      tempatLahir,
      tanggalLahir,
      isIndo,
      kewarganegaraan,
      statusNikah,
      namaPasangan,
      pendidikanTerakhir,
      statusTinggal,
      prov,
      kabKota,
      kecamatan,
      kelDes,
      rw,
      rt,
      jalan,
      noRumah
    })
    if (data) {
      setAlertBerhasilDaftar(true)
      navigate('/login')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ bgcolor: '#090D22' }}>
        <Grid
          container
          sx={{ height: '100vh', overflow: 'auto' }}
          alignItems={'center'}
        >
          <Grid item xs={12} sx={{ p: 2, overflow: 'auto' }}>
            <Paper sx={{ px: 5, py: 3, overflow: 'auto', bgcolor: '#E8E8E8' }}>
              <Box
                component={Link}
                to='/login'
                sx={{
                  textDecoration: 'none',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#FFFFFF',
                    color: '#0829D7'
                  }
                }}
              >
                <Grid
                  container
                  alignItems={'center'}
                  sx={{ width: 'fit-content' }}
                >
                  <Grid item>
                    <ArrowBackIcon sx={{ display: 'block' }} />
                  </Grid>
                  <Grid item>
                    <Typography align='left' variant='h6'>
                      Login
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Typography
                align='center'
                mb={3}
                variant='h4'
                sx={{ fontWeight: 'bold' }}
              >
                Daftar
              </Typography>
              <Typography
                align='left'
                mb={3}
                variant='h6'
                sx={{ fontWeight: 'bold' }}
              >
                Data Pribadi
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container direction='column' spacing={2} mb={7}>
                <Grid item>
                  <TextField
                    error={error}
                    required
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                    label='Email'
                    variant='outlined'
                  />
                </Grid>
                <Grid item>
                  <TextField
                    error={error}
                    required
                    fullWidth
                    type={'password'}
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    id='pw'
                    label='Password'
                    variant='outlined'
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    fullWidth
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    id='namaLengkap'
                    label='Nama Lengkap'
                    variant='outlined'
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    value={namaPanggilan}
                    onChange={(e) => setNamaPanggilan(e.target.value)}
                    id='namaPanggilan'
                    label='Nama Panggilan'
                    variant='outlined'
                  />
                </Grid>
                <Grid item>
                  <FormControl required>
                    <FormLabel id='JK'>Jenis Kelamin</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby='JK'
                      name='radio-buttons-group'
                      value={JK}
                      onChange={(e) => setJK(e.target.value)}
                    >
                      <FormControlLabel
                        value='perempuan'
                        control={<Radio />}
                        label='Perempuan'
                      />
                      <FormControlLabel
                        value='lakiLaki'
                        control={<Radio />}
                        label='Laki-laki'
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={tempatLahir}
                        onChange={(e) => setTempatLahir(e.target.value)}
                        id='tempatLahir'
                        label='Tempat Lahir'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        required
                        fullWidth
                        id='tanggalLahir'
                        label='Tanggal Lahir'
                        type='date'
                        value={tanggalLahir}
                        onChange={(e) => setTanggalLahir(e.target.value)}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='isIndo'>Kewarganegaraan</InputLabel>
                        <Select
                          labelId='isIndo'
                          id='isIndo'
                          value={isIndo}
                          label='Kewarganegaraan'
                          onChange={(e) => setIsIndo(e.target.value)}
                        >
                          <MenuItem value={true}>Indonesia</MenuItem>
                          <MenuItem value={false}>Non-Indonesia</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={kewarganegaraan}
                        onChange={(e) => setKewarganegaraan(e.target.value)}
                        id='kewarganegaraan'
                        label={isIndo ? 'Indonesia' : 'Kewarganegaraan'}
                        variant='outlined'
                        disabled={isIndo}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id='statusNikah'>
                          Status Pernikahan
                        </InputLabel>
                        <Select
                          labelId='statusNikah'
                          id='statusNikah'
                          value={statusNikah}
                          label='Status Pernikahan'
                          onChange={(e) => setStatusNikah(e.target.value)}
                        >
                          <MenuItem value={'belum menikah'}>
                            Belum Menikah
                          </MenuItem>
                          <MenuItem value={'sudah menikah'}>
                            Sudah Menikah
                          </MenuItem>
                          <MenuItem value={'bercerai'}>Bercerai</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={namaPasangan}
                        onChange={(e) => setNamaPasangan(e.target.value)}
                        id='namaPasangan'
                        label='Nama Istri/Suami'
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <FormControl required fullWidth>
                    <InputLabel id='pendidikanTerakhir'>
                      Pendidikan terakhir
                    </InputLabel>
                    <Select
                      labelId='pendidikanTerakhir'
                      id='pendidikanTerakhir'
                      value={pendidikanTerakhir}
                      label='Kewarganegaraan'
                      onChange={(e) => setPendidikanTerakhir(e.target.value)}
                    >
                      <MenuItem value='TK'>TK</MenuItem>
                      <MenuItem value='SD'>SD</MenuItem>
                      <MenuItem value='SMP'>SMP</MenuItem>
                      <MenuItem value='SMA/SMK'>SMA/SMK</MenuItem>
                      <MenuItem value='D1'>D1</MenuItem>
                      <MenuItem value='D2'>D2</MenuItem>
                      <MenuItem value='D3'>D3</MenuItem>
                      <MenuItem value='D4/S1'>D4/S1</MenuItem>
                      <MenuItem value='S2'>S2</MenuItem>
                      <MenuItem value='S3'>S3</MenuItem>
                      <MenuItem value='Prof'>Prof</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Typography
                align='left'
                mb={3}
                variant='h6'
                sx={{ fontWeight: 'bold' }}
              >
                Data Alamat
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container direction='column' spacing={2} mb={5}>
                <Grid item>
                  <FormControl>
                    <FormLabel id='statusTinggal'>
                      Status Tempat Tinggal
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby='statusTinggal'
                      // defaultValue="menikah"
                      name='radio-buttons-group'
                      value={statusTinggal}
                      onChange={(e) => setStatusTinggal(e.target.value)}
                    >
                      <FormControlLabel
                        value='tetap'
                        control={<Radio />}
                        label='Tetap'
                      />
                      <FormControlLabel
                        value='tidakTetap'
                        control={<Radio />}
                        label='Tidak Tetap'
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={prov}
                        onChange={(e) => setProv(e.target.value)}
                        id='provinsi'
                        label='Provinsi'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={kabKota}
                        onChange={(e) => setKabKota(e.target.value)}
                        id='kabKot'
                        label='Kabupaten / Kota'
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={kecamatan}
                        onChange={(e) => setKecamatan(e.target.value)}
                        id='kecamatan'
                        label='Kecamatan'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={kelDes}
                        onChange={(e) => setKelDes(e.target.value)}
                        id='kelDes'
                        label='Kelurahan / Desa'
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={rw}
                        onChange={(e) => setRw(e.target.value)}
                        id='rt'
                        label='RW'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={rt}
                        onChange={(e) => setRt(e.target.value)}
                        id='rw'
                        label='RT'
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={jalan}
                        onChange={(e) => setJalan(e.target.value)}
                        id='jalan'
                        label='Nama Jalan'
                        variant='outlined'
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        value={noRumah}
                        onChange={(e) => setNoRumah(e.target.value)}
                        id='noRum'
                        label='No Rumah'
                        variant='outlined'
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {error && (
                <Alert sx={{ mb: 3 }} severity='error'>
                  {error}
                </Alert>
              )}
              <Grid container justifyContent={'center'} sx={{ mb: 2 }}>
                <Grid item>
                  <ButtonSimpan type='submit' sx={{ fontWeight: 'bold' }}>
                    DAFTAR
                  </ButtonSimpan>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}
