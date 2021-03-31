const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const BancoDb = require('./infra/repository/mysql')

let urlEncodedParser = bodyParser.urlencoded({extended:false})
let app = express()
app.use(cors());
app.use(express.static('src/interface'));
app.use(express.static('favicon.ico'));


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

app.get('/api/comments', urlEncodedParser, async (req, res) => {
  const db = new BancoDb()

  const [list] = await db.selectCustomers()
  res.send(list)
})

app.get('/test', (req, res) => {
  res.send('Hello Worlds')
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/interface/index.html');
})

app.listen(3333, (req, res) => {
  console.log(' Rodando na porta 3333')
})
