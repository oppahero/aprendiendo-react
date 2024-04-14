/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMemo, useState } from 'react'
import './App.css'
import { Results } from './components/Results.tsx'
import { UsersList } from './components/UsersList.tsx'
import { useUsers } from './hooks/useUsers.ts'
import { SortBy, type User } from './types.d'

function App () {
  const {
    users,
    isLoading,
    isError,
    hasNextPage,
    refetch,
    fetchNextPage
  } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColor = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (uuid: string) => {
    // const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    // setUsers(filteredUs  ers)
  }

  const handleReset = () => {
    void refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

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
  }, [filteredUsers, sorting])

  return (
    <>
      <div>
        <h1>Prueba Técnica Typescript</h1>
        <Results/>
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
          {
            users.length > 0 &&
            <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
          }
          { isLoading && <strong>Cargando...</strong>}
          { isError && <p>Ha ocurrido un error</p>}
          { !isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
          { !isLoading && !isError && hasNextPage && <button onClick={() => { void fetchNextPage() }}>Cargar más resultados</button>}
          { !isLoading && !isError && !hasNextPage && <p>No hay más resultados</p>}
        </main>
      </div>
    </>
  )
}

export default App
