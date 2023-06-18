import * as React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleJenisForm({ formTerpilih, setFormTerpilih }) {
  const [view, setView] = React.useState('list')

  const handleChange = (event, nextView) => {
    setView(nextView)
  }

  return (
    <ToggleButtonGroup
      orientation='vertical'
      value={view}
      exclusive
      onChange={(e) => setFormTerpilih(e.target.value)}
    >
      <ToggleButton
        value='data pribadi'
        sx={{
          justifyContent: 'start',
          pr: 20,
          border: 'none',
          ...(formTerpilih === 'data pribadi'
            ? { bgcolor: '#686B7B', color: 'white' }
            : '')
        }}
      >
        Data Pribadi
      </ToggleButton>
      {/* <ToggleButton value="data keluarga" sx={{ justifyContent: 'start', border: 'none', ...(formTerpilih === 'data keluarga' ? { bgcolor: '#E8DEDE' } : '') }}>
        Data Keluarga
      </ToggleButton> */}
      <ToggleButton
        value='data alamat'
        sx={{
          justifyContent: 'start',
          border: 'none',
          ...(formTerpilih === 'data alamat'
            ? { bgcolor: '#686B7B', color: 'white' }
            : '')
        }}
      >
        Data Alamat
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
