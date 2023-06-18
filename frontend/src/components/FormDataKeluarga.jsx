import React, { useState } from 'react'
import { FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { ButtonSimpan } from './ButtonSimpan';

export default function FormDataKeluarga() {

  const [statusNikah, setStatusNikah] = useState('')
  const [namaKepala, setNamaKepala] = useState('')
  const [namaPasangan, setNamaPasangan] = useState('')
  const [jumlahAnak, setJumlahAnak] = useState(0)
  const [dataAnak, setDataAnak] = useState([])
  const [inputDataAnak, setInputDataAnak] = useState([])

  return (
    <Grid item flexGrow={1} mr={2}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Status Pernikahan</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue="menikah"
              name="radio-buttons-group"
              value={statusNikah}
              onChange={(e) => setStatusNikah(e.target.value)}
            >
              <FormControlLabel value="menikah" control={<Radio />} label="Menikah" />
              <FormControlLabel value="belumMenikah" control={<Radio />} label="Belum Menikah" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField fullWidth value={namaKepala} onChange={(e) => setNamaKepala(e.target.value)} id="standard-basic" label="Nama Kepala Keluarga" variant="outlined" />
        </Grid>
        <Grid item>
          <TextField fullWidth value={namaPasangan} onChange={(e) => setNamaPasangan(e.target.value)} id="standard-basic" label="Nama Istri / Suami" variant="outlined" />
        </Grid>
        <Grid item>
          <TextField type='number' value={jumlahAnak} onChange={(e) => setJumlahAnak(e.target.value)} id="standard-basic" label="Jumlah Anak" variant="outlined" />
        </Grid>
        <Grid item>
          <ButtonSimpan>SIMPAN DATA KELUARGA</ButtonSimpan>
        </Grid>
      </Grid>
    </Grid>
  )
}
