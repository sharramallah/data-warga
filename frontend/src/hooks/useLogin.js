import { useAtom } from 'jotai'
import { useState } from 'react'
import { dataLengkapUserAtom, userDariStorageAtom, usersDataAtom } from '../stateAtom'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [, setUserDariStorage] = useAtom(userDariStorageAtom)
  const [, setDataLengkapUser] = useAtom(dataLengkapUserAtom)
  const [, setUsersData] = useAtom(usersDataAtom)

  const login = async (email, pw) => {
    setIsLoading(true)
    setError(null)

    // Login
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pw })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      // localStorage.setItem('user', JSON.stringify(json))
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      // dispatch({ type: 'LOGIN', payload: json })
      setUserDariStorage(json)

      // update loading state
      setIsLoading(false)
    }

    // Ambil Users
    const responseUsersData = await fetch('/api/user', {
      headers: { 'Authorization': `Bearer ${json.token}` },
    })
    const jsonUsersData = await responseUsersData.json()

    if (responseUsersData.ok) {
      setUsersData(jsonUsersData)
      const dataUser = jsonUsersData.filter(d => d.email === json.email)[0]
      setDataLengkapUser(dataUser)
    }
  }

  return { login, isLoading, error }
}