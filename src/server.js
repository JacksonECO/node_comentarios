const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const BancoDb = require('./infra/repository/mysql')

let app = express()
app.use(cors());
let urlEncodedParser = bodyParser.urlencoded({extended:false})

app.post('/api/addComment', urlEncodedParser, async(req, res) => {
  const db = new BancoDb()

  try {
    await db.insertCustomer(req.body.name)
    console.log(req.body.name)
    res.send("Add: " + req.body.name);
  } catch (error) {
    res.statusCode = 503; //503 - Serviço indisponível (Service Unavailable)
    res.send("Banco não funcionando")
  }

})

app.get('/test', (req, res) => {
  return res.send('Hello Worlds')
})

app.listen(3333, (req, res) => {
  console.log(' Rodando na porta 3333')
})
