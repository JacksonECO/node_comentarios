const BancoDb = require('./mysql')

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
      comment: 'Jackson',
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
