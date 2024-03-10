const API_KEY = '52c914c3'

export const searchMovies = async ({ search }) => {

  console.log(search);
  if (search === '') return null

  if (search) {

    return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
      .then(response => response.json())
      .then(data => {

        const movies = data.Search

        return movies?.map(movie => (
          {
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          }
        ))
      })
      .catch(e => {
        throw new Error(`Error searching movies: ${e.message}`)
      })
  }
}