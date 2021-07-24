const { expect } = require("chai")
const Client = require("../../store/client")
const Session = require("../../store/session")

describe('Session', () => {
    it('#create', () => {
        const session = new Session('1', '2')
        expect(session.uuid).to.equals('1')
        expect(session.closeId).to.equals('2')
    })

    it('#getClients', () => {
        const session = new Session('1', '2')
        session.addClient(new Client('clientId'))
        expect(session.getClients().length).to.equals(1)
    })

    it('#addClient', () => {
        const session = new Session('1', '2')
        session.addClient(new Client('clientId'))
        const clients = session.getClients()
        expect(clients.length).to.equals(1)
        expect(clients[0].id).to.equals('clientId')
    })

    it('#removeClient', () => {
        const session = new Session('1', '2')
        session.addClient(new Client('clientId'))
        session.removeClient('clientId')
        const clients = session.getClients()
        expect(clients.length).to.equals(0)
    })
} )