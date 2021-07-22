const { expect } = require('chai')
const SessionStorage = require('../../store/session-store')
describe('SessionStore', () => {

  it('sessionStrore does exist', async () => {
    const sessionStore = await SessionStorage.get()
    expect(sessionStore).to.be.not.null
  })

  describe('#modification', () => {
    let sessionStore
    const sessionId = '1'
    const closeId = '2'
    
    const createSession = async (sessionId, closeId) => {
      sessionStore = await SessionStorage.get()
      return sessionStore.create(sessionId, closeId)
    } 

    before( async () => {
      sessionStore = await SessionStorage.get()
    })

    beforeEach(() => {
      expect(sessionStore.get(sessionId)).to.be.undefined
    })

    after( async () => {
      sessionStore.clear()
    } )

    afterEach(() => {
      sessionStore.clear()
    })

    it('#create', async () => {
      const session = await createSession(sessionId, closeId)
      expect(session).to.be.not.null
      expect(session.uuid).to.equals(sessionId)
      expect(session.closeId).to.equals(closeId)
    })

    it('#get', async () => {
      sessionStore.create(sessionId, closeId)
      const session = sessionStore.get(sessionId)
      expect(session).to.be.not.null
      expect(session.uuid).to.equals(sessionId)
      expect(session.closeId).to.equals(closeId)
    })

    it('#getByCloseId', async () => {
      sessionStore.create(sessionId, closeId)
      const session = sessionStore.getByCloseId(closeId)
      expect(session).to.be.not.null
      expect(session.uuid).to.equals(sessionId)
      expect(session.closeId).to.equals(closeId)
    })

    it('#remove', async () => {
      sessionStore.create(sessionId, closeId)
      sessionStore.remove(sessionId)
      const session = sessionStore.get(closeId)
      expect(session).to.be.undefined
    })
    it('#clear', async () => {
      sessionStore.create(sessionId, closeId)
      sessionStore.create('2', '2')
      sessionStore.clear()
      expect(sessionStore.get(sessionId)).to.be.undefined
      expect(sessionStore.get('2')).to.be.undefined
    })

  })
  
  

})