const mysql = require('mysql2/promise')

module.exports = class BancoDb {
  async connect() {
    if (this.connection && this.connection.state !== 'disconnected') {
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
    const values = [customer.name, customer.text]
    return await bd.query(sql, values)
  }

  async selectCustomers() {
    const conn = await this.connect()
    const [rows] = await conn.query('SELECT * FROM teste1;')
    return rows
  }

}
