import React, { useState } from 'react'
import {
  Alert,
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
  TextField
} from '@mui/material'
import { ButtonSimpan } from './ButtonSimpan'
import { useAtom } from 'jotai'
import {
  dataLengkapUserAtom,
  userDariStorageAtom,
  usersDataAtom
} from '../stateAtom'
import { useEffect } from 'react'
import dateFormat, { masks } from 'dateformat'

export default function FormDataPribadi() {
  const [dataLengkapUser, setDataLengkapUser] = useAtom(dataLengkapUserAtom)
  const [userDariStorage] = useAtom(userDariStorageAtom)
  const [users, setUsers] = useAtom(usersDataAtom)

  const [email, setEmail] = useState(
    dataLengkapUser.email ? dataLengkapUser.email : ''
  )
  // const [pw, setPw] = useState(user.pw ? user.pw : '')
  const [namaLengkap, setNamaLengkap] = useState(
    dataLengkapUser.namaLengkap ? dataLengkapUser.namaLengkap : ''
  )
  const [namaPanggilan, setNamaPanggilan] = useState(
    dataLengkapUser.namaPanggilan ? dataLengkapUser.namaPanggilan : ''
  )
  const [JK, setJK] = useState(dataLengkapUser.JK ? dataLengkapUser.JK : '')
  const [tempatLahir, setTempatLahir] = useState(
    dataLengkapUser.tempatLahir ? dataLengkapUser.tempatLahir : ''
  )
  const [tanggalLahir, setTanggalLahir] = useState(
    dataLengkapUser.tanggalLahir
      ? dateFormat(dataLengkapUser.tanggalLahir, 'yyyy-mm-dd')
      : ''
  )
  const [isIndo, setIsIndo] = useState(
    dataLengkapUser.isIndo ? dataLengkapUser.isIndo : false
  )
  const [kewarganegaraan, setKewarganegaraan] = useState(
    dataLengkapUser.kewarganegaraan ? dataLengkapUser.kewarganegaraan : ''
  )
  const [statusNikah, setStatusNikah] = useState(
    dataLengkapUser.statusNikah ? dataLengkapUser.statusNikah : ''
  )
  const [namaPasangan, setNamaPasangan] = useState(
    dataLengkapUser.namaPasangan ? dataLengkapUser.namaPasangan : ''
  )
  const [pendidikanTerakhir, setPendidikanTerakhir] = useState(
    dataLengkapUser.pendidikanTerakhir ? dataLengkapUser.pendidikanTerakhir : ''
  )

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [emptyFields, setEmptyFields] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!dataLengkapUser) {
      setError('Anda harus login')
      return
    }

    const datapribadi = {
      email,
      namaLengkap,
      namaPanggilan,
      JK,
      tempatLahir,
      tanggalLahir,
      isIndo,
      kewarganegaraan,
      statusNikah,
      namaPasangan,
      pendidikanTerakhir
    }

    const response = await fetch('/api/user/' + dataLengkapUser._id, {
      method: 'PATCH',
      body: JSON.stringify(datapribadi),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userDariStorage.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      const token = JSON.parse(localStorage.getItem('user')).token
      localStorage.setItem('user', JSON.stringify({ email, token }))

      setDataLengkapUser((prev) => ({ ...prev, ...datapribadi }))
      setUsers((previous) =>
        previous.map((t) => {
          if (t._id === json._id) {
            return { ...t, ...datapribadi }
          } else {
            return t
          }
        })
      )
      setError(null)
      setSuccess(true)
      setEmptyFields([])
    }
  }

  return (
    <Grid item flexGrow={1} mr={2}>
      <form onSubmit={handleSubmit}>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              label='Email'
              variant='outlined'
            />
          </Grid>
          {/* <Grid item>
          <TextField fullWidth type={'password'} value={pw} onChange={(e) => setPw(e.target.value)} id="password" label="Password" variant="outlined" />
        </Grid> */}
          <Grid item>
            <TextField
              fullWidth
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              id='namalengkap'
              label='Nama Lengkap'
              variant='outlined'
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              value={namaPanggilan}
              onChange={(e) => setNamaPanggilan(e.target.value)}
              id='namapanggilan'
              label='Nama Panggilan'
              variant='outlined'
            />
          </Grid>
          <Grid item>
            <FormControl>
              <FormLabel id='jeniskelamin'>Jenis Kelamin</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='female'
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
                  id='tempatlahir'
                  label='Tempat Lahir'
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id='tanggal'
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
                  <InputLabel id='isindolabel'>Kewarganegaraan</InputLabel>
                  <Select
                    labelId='isindolabel'
                    id='isindo'
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
                  <InputLabel id='statusnikahlabel'>
                    Status Pernikahan
                  </InputLabel>
                  <Select
                    labelId='statusnikahlabel'
                    id='statusnikah'
                    value={statusNikah}
                    label='Status Pernikahan'
                    onChange={(e) => setStatusNikah(e.target.value)}
                  >
                    <MenuItem value={'belum menikah'}>Belum Menikah</MenuItem>
                    <MenuItem value={'sudah menikah'}>Sudah Menikah</MenuItem>
                    <MenuItem value={'bercerai'}>Bercerai</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  value={namaPasangan}
                  onChange={(e) => setNamaPasangan(e.target.value)}
                  id='namapasangan'
                  label='Nama Istri/Suami'
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id='pendidikanlabel'>Pendidikan terakhir</InputLabel>
              <Select
                labelId='pendidikanlabel'
                id='pendidikanterakhir'
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
          <Grid item>
            {success && (
              <Alert
                sx={{ mb: 2 }}
                onClose={() => {
                  setSuccess(false)
                }}
              >
                Data pribadi berhasil disimpan!
              </Alert>
            )}
            {error && (
              <Alert sx={{ mb: 2 }} severity='error'>
                {error}
              </Alert>
            )}
            <ButtonSimpan type='submit'>SIMPAN DATA PRIBADI</ButtonSimpan>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}
