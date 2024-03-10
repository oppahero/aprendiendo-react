import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'


function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe contener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }

}

function App() {

  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search })

  // ? useRef para referenciar un elemento del dom
  // const inputRef = useRef()


  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
    // const fields = new FormData(event.target)
    // const query = fields.get('query')

    // const { query } = Object.fromEntries(new window.FormData(event.target))
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }


  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input value={search} onChange={handleChange} name='query' placeholder='Avengers, Star Wars..' />
          <button type='submit'>Buscar</button>
        </form>
        {
          error && <p className='error'>{error}</p>
        }
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}


export default App
