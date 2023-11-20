const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 4200

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movies => movies.genre.some(g => g.toLocaleLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
})

app.post('/movies', (req, res) => {
  const { title, genre, year, director, duration, poster, rate } = req.body

  const newMovie = {
    id: crypto.randomUUID(),
    title,
    year,
    director,
    duration,
    poster,
    rate: rate ?? 0,
    genre
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})
