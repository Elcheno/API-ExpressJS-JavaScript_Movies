const express = require('express')

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 4200

// Middleware
// app.use((req, _res, next) => {
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''

//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     req.body = data // Con esta línea mutamos el body de la request recibida
//     next()
//   })

//   console.log('Ejecutando Middleware')
// })

// Middleware que nos proporciona ExpressJS para parsear y mutar el body de una request a JSON
app.use(express.json())

// Ruta /
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

app.get('/persona', (req, res) => {
  console.log(req.body)
  res.send('✅')
})

// Error 404
app.use((req, res) => {
  res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})
