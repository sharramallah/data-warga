import { atom } from "jotai";

export const openDrawerAtom = atom(true)

export const alertBerhasilDaftarAtom = atom(false)
export const alertKonfirmasiLogoutAtom = atom(false)

export const dataLengkapUserAtom = atom(null) // siapa yang login
export const usersDataAtom = atom(null) // load data seluruh users

const dataUserDiStorage = JSON.parse(localStorage.getItem('user'))

let userData
if (dataUserDiStorage) {
  userData = dataUserDiStorage
} else {
  userData = null
}
export const userDariStorageAtom = atom(userData)

