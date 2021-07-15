const expect = require("chai").expect
const request = require('supertest')
const server = require('../server')

let app

describe('server.js', () => {

    before( (done) => {
        app = server.listen(8082, done)
    })

    after( (done) => {
        app.close(done)
    })

    it('/create', (done) => {
        request(app)
            .get('/create')
            .expect(res => {
                const body = JSON.parse(res.text)
                expect(body).to.have.property('sessionId')
                expect(body).to.have.property('closeToken')
            }).end(done)
    })
})