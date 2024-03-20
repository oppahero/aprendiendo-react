import { useEffect } from 'react'

export default function Search ({ routeParams }) {
  useEffect(() => {
    document.title = `Has buscado ${routeParams.query}`
  }, [])

  return (
    <h1>search: {routeParams.query}</h1>
  )
}
