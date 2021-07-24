const { expect } = require("chai")
const Client = require("../../store/client")

describe('Client', () => {

    it('create', () => {
        const client = new Client('id')
        expect(client.id).be.equals('id')
    })

})