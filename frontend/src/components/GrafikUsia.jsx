import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { dataLengkapUserAtom, usersDataAtom } from '../stateAtom'

export default function GrafikUsia() {
  const [dataLengkapUser] = useAtom(dataLengkapUserAtom)
  const [users] = useAtom(usersDataAtom)

  const [dataGrafik, setDataGrafik] = useState([
    {
      name: '0-5',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '6-10',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '11-15',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '16-20',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '21-25',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '26-30',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '31-35',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '36-40',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '41-45',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '46-50',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '51-55',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '56-60',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '61-65',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '66-70',
      lakiLaki: 0,
      perempuan: 0
    },
    {
      name: '> 70',
      lakiLaki: 0,
      perempuan: 0
    }
  ])

  useEffect(() => {
    function getUsia(tanggalLahir) {
      return new Date().getFullYear() - new Date(tanggalLahir).getFullYear()
    }

    function getJumlahByUsiaJK(users, batasBawah, batasAtas) {
      // perempuan : JK === 'perempuan'
      // laki laki : JK === 'lakiLaki
      return users.filter(
        (u) =>
          getUsia(u.tanggalLahir) >= batasBawah &&
          getUsia(u.tanggalLahir) <= batasAtas
      ).length
    }

    const usersLaki = users.filter((u) => u.JK === 'lakiLaki')
    const usersPerempuan = users.filter((u) => u.JK === 'perempuan')

    let data = [...dataGrafik]
    data[0].lakiLaki = getJumlahByUsiaJK(usersLaki, 0, 5)
    data[0].perempuan = getJumlahByUsiaJK(usersPerempuan, 0, 5)

    for (let i = 1, j = 6, k = 10; i <= 13; i++, j += 5, k += 5) {
      data[i].lakiLaki = getJumlahByUsiaJK(usersLaki, j, k)
      data[i].perempuan = getJumlahByUsiaJK(usersPerempuan, j, k)
      // console.log(i, j, k)
    }
    // console.log(dataGrafik)
  }, [])

  return (
    <ResponsiveContainer width={'100%'} minHeight={300}>
      <BarChart
        width={200}
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
        <XAxis dataKey='name' />
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
