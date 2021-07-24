const request = require('supertest')
const app = require('../server')

let server

describe('Server', () => {

    beforeEach(done => {
        server = app.listen(3001, done)
    })

    afterEach( done => {
        server.close(done)
    })

    it('should start server', done => {
        request(server).get('/create').expect('').end(done)
    })
})

