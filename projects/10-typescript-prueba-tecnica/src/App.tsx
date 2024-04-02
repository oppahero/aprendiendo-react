/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList.tsx'
import { type APIResults, type User } from './types.d'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toggleColor = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async (res) => await res.json())
      .then((data: APIResults) => {
        setUsers(data.results)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <>
      <div>
        <h1>Prueba Técnica Typescript</h1>
        <header>
          <button onClick={toggleColor}>Colorear files</button>
          <button onClick={toogleSortByCountry}>
           { sortByCountry ? 'No ordenar por país' : 'Ordenerar por país' }
          </button>
        </header>
        <main>
          <UsersList showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
