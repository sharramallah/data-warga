import React, { useState } from 'react'
import { Alert, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { ButtonSimpan } from './ButtonSimpan';
import { useAtom } from 'jotai';
import { dataLengkapUserAtom, userDariStorageAtom, usersDataAtom } from '../stateAtom';


export default function FormDataAlamat() {

  const [dataLengkapUser, setDataLengkapUser] = useAtom(dataLengkapUserAtom)
  const [userDariStorage,] = useAtom(userDariStorageAtom)
  const [users, setUsers] = useAtom(usersDataAtom)

  const [statusTinggal, setStatusTinggal] = useState(dataLengkapUser.statusTinggal ? dataLengkapUser.statusTinggal : '')
  const [prov, setProv] = useState(dataLengkapUser.prov ? dataLengkapUser.prov : '')
  const [kabKota, setKabKota] = useState(dataLengkapUser.kabKota ? dataLengkapUser.kabKota : '')
  const [kecamatan, setKecamatan] = useState(dataLengkapUser.kecamatan ? dataLengkapUser.kecamatan : '')
  const [kelDes, setKelDes] = useState(dataLengkapUser.kelDes ? dataLengkapUser.kelDes : '')
  const [rw, setRw] = useState(dataLengkapUser.rw ? dataLengkapUser.rw : '')
  const [rt, setRt] = useState(dataLengkapUser.rt ? dataLengkapUser.rt : '')
  const [jalan, setJalan] = useState(dataLengkapUser.jalan ? dataLengkapUser.jalan : '')
  const [noRumah, setNoRumah] = useState(dataLengkapUser.noRumah ? dataLengkapUser.noRumah : '')

  // Submit
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!dataLengkapUser) {
      setError('Anda harus login')
      return
    }
    const dataalamat = { statusTinggal, prov, kabKota, kecamatan, kelDes, rw, rt, jalan, noRumah }

    const response = await fetch('/api/user/' + dataLengkapUser._id, {
      method: 'PATCH',
      body: JSON.stringify({ ...dataalamat, email: dataLengkapUser.email }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userDariStorage.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setDataLengkapUser(prev => ({ ...prev, ...dataalamat }))
      setUsers(previous => previous.map(t => {
        if (t._id === json._id) {
          return { ...t, ...dataalamat }
        } else {
          return t
        }
      }))
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
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Status Tempat Tinggal</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="menikah"
                name="radio-buttons-group"
                value={statusTinggal}
                onChange={(e) => setStatusTinggal(e.target.value)}
              >
                <FormControlLabel value="tetap" control={<Radio />} label="Tetap" />
                <FormControlLabel value="tidakTetap" control={<Radio />} label="Tidak Tetap" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth value={prov} onChange={(e) => setProv(e.target.value)} id="standard-basic" label="Provinsi" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth value={kabKota} onChange={(e) => setKabKota(e.target.value)} id="kabkot" label="Kabupaten / Kota" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} id="kecamatan" label="Kecamatan" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth value={kelDes} onChange={(e) => setKelDes(e.target.value)} id="keldes" label="Kelurahan / Desa" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth value={rw} onChange={(e) => setRw(e.target.value)} id="rw" label="RW" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth value={rt} onChange={(e) => setRt(e.target.value)} id="rt" label="RT" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth value={jalan} onChange={(e) => setJalan(e.target.value)} id="jalan" label="Nama Jalan" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth value={noRumah} onChange={(e) => setNoRumah(e.target.value)} id="norumah" label="No Rumah" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {success &&
              <Alert sx={{ mb: 2 }} onClose={() => { setSuccess(false) }}>Data alamat berhasil disimpan!</Alert>
            }
            {error &&
              <Alert sx={{ mb: 2 }} severity="error">{error}</Alert>
            }
            <ButtonSimpan type='submit'>SIMPAN DATA ALAMAT</ButtonSimpan>
          </Grid>
        </Grid>
      </form>
    </Grid>
  )
}
