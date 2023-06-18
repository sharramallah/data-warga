import { useAtom } from 'jotai'
import React, { PureComponent, useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts'
import { usersDataAtom } from '../stateAtom'

export default function GrafikPendidikan() {
  const [users] = useAtom(usersDataAtom)

  const [dataGrafik, setDataGrafik] = useState([
    {
      name: 'TK',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'SD',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'SMP',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'SMA/SMK',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'D1',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'D2',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'D3',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'D4/S1',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'S2',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'S3',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: 'Prof',
      lakiLaki: 0,
      perempuan: 0
    }
  ])

  useEffect(() => {
    function getJumlahByPendidikan(users, pendidikan) {
      // perempuan : JK === 'perempuan'
      // laki laki : JK === 'lakiLaki
      return users.filter((u) => u.pendidikanTerakhir === pendidikan).length
    }

    const usersLaki = users.filter((u) => u.JK === 'lakiLaki')
    const usersPerempuan = users.filter((u) => u.JK === 'perempuan')

    let dataPendidikan = dataGrafik.map((d) => ({
      ...d,
      lakiLaki: getJumlahByPendidikan(usersLaki, d.name),
      perempuan: getJumlahByPendidikan(usersPerempuan, d.name)
    }))
    setDataGrafik(dataPendidikan)
  }, [])

  return (
    <ResponsiveContainer width='100%' minHeight={300}>
      <BarChart
        width={300}
        height={300}
        data={dataGrafik}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name'></XAxis>
        <YAxis
          allowDecimals={false}
          label={{ value: 'Jumlah', angle: -90, position: 'insideBottomLeft' }}
        />
        <Tooltip />
        <Legend />
        <Bar name='Laki-laki' dataKey='lakiLaki' fill='#FF3B30' />
        <Bar name='Perempuan' dataKey='perempuan' fill='#EEBE2B' />
      </BarChart>
    </ResponsiveContainer>
  )
}
