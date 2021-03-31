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
    try {
      const bd = await this.connect()
      return await bd.query('SELECT * FROM comments;')
    } catch (error) {
      console.log("Sem tabela existente, criando..")
      let create = await mysql.createConnection('mysql://jacksonUser:123456@localhost:3306/')
      await create.query("CREATE DATABASE smarkio;")
      create = await mysql.createConnection('mysql://jacksonUser:123456@localhost:3306/smarkio')
      await create.query("CREATE TABLE comments( id int(4) AUTO_INCREMENT, comment varchar(280) NOT NULL, PRIMARY KEY (id) );")
      return [[]]
    }
  }

}
