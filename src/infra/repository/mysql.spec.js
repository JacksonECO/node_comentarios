const mysql = require('mysql2/promise')

class BancoDb {
  async connect() {
    if (this.connection && this.connection.state !== 'disconnected')      {
      return this.connection
    }

    this.connection = await mysql.createConnection('mysql://jacksonUser:123456@localhost:3306/smarkio')
    // console.log('Conectou no MySQL!')
    return this.connection
  }

  async disconnect() {
    await this.connection.end()
  }

  async insertCustomer(customer) {
    const bd = await this.connect()
    const sql = 'INSERT INTO teste1(name,text) VALUES (?,?);'
    const values = [customer.nome, customer.text]
    return await bd.query(sql, values)
  }

  async selectCustomers() {
    const conn = await this.connect()
    const [rows] = await conn.query('SELECT * FROM teste1;')
    return rows
  }

}

describe('MySql', () => {
  test('Should Connection', async () => {
    const sut = new BancoDb()
    const banco = await sut.connect()
    expect(banco).toBeTruthy()
    await sut.disconnect()
  })

  test('Should InsertData', async () => {
    const sut = new BancoDb()
    const data = {
      nome: 'Jackson',
      text: 'test'
    }
    const resp = await sut.insertCustomer(data)
    expect(resp).toBeTruthy()
    await sut.disconnect()
  })

  test('Should ViewData', async () => {
    const sut = new BancoDb()
    const resp = await sut.selectCustomers()
    // console.log(resp[0].name)
    expect(resp).toBeTruthy()
    await sut.disconnect()
  })
})
