const expect = require("chai").expect
const request = require('supertest')
const server = require('../server')
const assert = require("assert");

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

    it  ('/close/:closeid returns 200', async () => {
        const response = await request(app)
            .get('/create')
        const json = JSON.parse(response.text)
        const responseCloseId = await request(app)
            .get('/close/' + json.closeToken)
        expect(responseCloseId.statusCode).equals(201)
    })

    it  ('/close/:closeid returns 404', async () => {
        const responseCloseId = await request(app)
            .get('/close/l')
        expect(responseCloseId.statusCode).equals(404)
        expect(responseCloseId.text).to.not.equals("")
        expect(JSON.parse(responseCloseId.text)).to.have.property('errorMessage', 'Session does not exist')
    })






})