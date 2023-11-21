const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    required_error: 'Movie title is required',
    invalid_type_error: 'Movie title must be a string'
  }),
  genre: z.array(z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'])),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    message: 'Poster there is a url'
  })
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

const validatePartialMovie = (object) => {
  return movieSchema.partial(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
