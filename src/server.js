const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const BancoDb = require('./infra/repository/mysql')

let app = express()
app.use(cors());
let urlEncodedParser = bodyParser.urlencoded({extended:false})

app.post('/api/addComment', urlEncodedParser, function async(req, res) {
  const db = new BancoDb()

  db.insertCustomer(req.body.name)
  console.log("jgfddfg")
  let obj = {
    name: req.body.name,
    age: 18
  }
  res.json(obj);
})

app.get('/test', (req, res) => {
  return res.send('Hello Worlds')
})

app.listen(3333, (req, res) => {
  console.log(' Rodando na porta 3333')
})
