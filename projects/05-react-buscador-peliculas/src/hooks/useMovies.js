import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousMovies = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
        if (search === previousMovies.current) return

        try {
            setLoading(true)
            setError(null)
            previousMovies.current = search
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sort, movies])

    return { movies: sortedMovies, getMovies, loading, error }
}