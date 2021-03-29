const express = require('express')
const app = express()

app.get('/test', (req, res) => {
  return res.send('Hello Worlds')
})

app.listen(3333, (req, res) => {
  console.log(' Rodando na porta 3333')
})
