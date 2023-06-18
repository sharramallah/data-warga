import { useAtom } from 'jotai'
import { dataLengkapUserAtom, userDariStorageAtom } from '../stateAtom'

export const useLogout = () => {
  const [, setUserDariStorage] = useAtom(userDariStorageAtom)
  const [, setDataLengkapUser] = useAtom(dataLengkapUserAtom)
  // const [, setTasksData] = useAtom(tasksDataAtom)
  // const [, setSectionsData] = useAtom(sectionsDataAtom)

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    setUserDariStorage(null)
    setDataLengkapUser(null)
    // setTasksData(null)
    // setSectionsData(null)
  }

  return { logout }
}