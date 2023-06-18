import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAtom } from 'jotai';
import { dataLengkapUserAtom, userDataAtom, usersDataAtom } from '../stateAtom';

const columns = [
  { id: 'no', label: 'NO', minWidth: 20 },
  { id: 'namaLengkap', label: 'Nama Lengkap', minWidth: 20 },
  {
    id: 'usia',
    label: 'Usia',
    minWidth: 20,
    align: 'center'
  },
  {
    id: 'JK',
    label: 'Jenis Kelamin',
    minWidth: 20,
    align: 'center'
  },
  {
    id: 'statusNikah',
    label: 'Status Pernikahan',
    minWidth: 20,
    align: 'center'
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 20,
    align: 'center'
  },
  {
    id: 'statusTinggal',
    label: 'Status Tempat Tinggal',
    minWidth: 20,
    align: 'center'
  },
];

function createData(no, namaLengkap, usia, JK, statusNikah, email, statusTinggal) {
  // const density = population / size;
  // return { name, code, population, size, density };
  return { no, namaLengkap, usia, JK, statusNikah, email, statusTinggal };
}

export default function TabelDataWarga() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [usersData, setUsersData] = useAtom(usersDataAtom)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = []

  if (usersData) {
    usersData.forEach((u, i) => {
      const namaLengkap = u.namaLengkap.toUpperCase()
      const usia = new Date().getFullYear() - new Date(u.tanggalLahir).getFullYear()
      const JK = (u.JK === 'lakiLaki' ? 'Laki-laki' : 'Perempuan')
      const statusNikah = (u.statusNikah === 'belum menikah' ? 'Belum Menikah' : u.statusNikah === 'sudah menikah' ? 'Sudah Menikah' : 'Bercerai')
      const statusTinggal = (u.statusTinggal === 'tetap' ? 'Tetap' : 'Tidak tetap')

      const newData = createData(i + 1, namaLengkap, usia, JK, statusNikah, u.email, statusTinggal)
      rows.push(newData)
    })
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={"Baris per halaman"}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
