/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { SortBy, type APIResults, type User } from './types.d'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const originalUsers = useRef<User[]>([])

  const toggleColor = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch('https://randomuser.me/api?results=100')
      .then(async (res) => await res.json())
      .then((res: APIResults) => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch((e) => {
        console.error(e)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    return (filterCountry !== null && filterCountry.length > 0)
      ? users.filter((user) => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const properties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractPropertie = properties[sorting]
      return extractPropertie(a).localeCompare(extractPropertie(b))
    })

    // if (sorting === SortBy.COUNTRY) {
    //   return filteredUsers.toSorted(
    //     (a, b) => { return a.location.country.localeCompare(b.location.country) }
    //   )
    // }

    // if (sorting === SortBy.NAME) {
    //   return filteredUsers.toSorted(
    //     (a, b) => { return a.name.first.localeCompare(b.name.first) }
    //   )
    // }

    // if (sorting === SortBy.LAST) {
    //   return filteredUsers.toSorted(
    //     (a, b) => { return a.name.last.localeCompare(b.name.last) }
    //   )
    // }
  }, [filteredUsers, sorting])

  return (
    <>
      <div>
        <h1>Prueba Técnica Typescript</h1>
        <header>
          <button onClick={toggleColor}>Colorear files</button>
          <button onClick={toogleSortByCountry}>
           { sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país' }
          </button>
          <button onClick={handleReset}>Resetear estado</button>
          <input placeholder='Filtra por país' type="text" onChange={(e) => {
            setFilterCountry(e.target.value)
          }} />
        </header>
        <main>
          <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
