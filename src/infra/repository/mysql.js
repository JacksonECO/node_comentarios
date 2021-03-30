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

  async insertCustomer(comment) {
    const bd = await this.connect()
    const sql = 'INSERT INTO comments (comment) VALUES (?);'
    return await bd.query(sql, comment)
  }

  async selectCustomers() {
    const conn = await this.connect()
    return await conn.query('SELECT * FROM comments;')
  }

}
