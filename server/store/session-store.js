const Session = require('./session')

class SessionStore {
    static #instance = null

    constructor() {}

    static async get() {
        if (!SessionStore.#instance) {
            SessionStore.#instance = new SessionStoreInternal()
        }
        return SessionStore.#instance
    }

}

class SessionStoreInternal extends SessionStore {
    #sessions = null

    constructor() {
        super()
        this.#sessions = new Map()
    }

    /**
     * Create new session object
     * @param {string} sessionId new session id 
     * @param {string} closeid id for closing this session.
     * @returns {boolean} `true` if deleted, `false` otherwise.
     */
    create(sessionId, closeid) {
        let session = this.#sessions.get(sessionId)
        if (!session) {
            session = new Session(sessionId, closeid)
            this.#sessions.set(sessionId, session)
        }
        return session
    }

    /**
     * Remove specific session object.
     * @param {string} sessionId id for remove
     * @returns {boolean} `true` if deleted, `false` otherwise.
     */
    remove(sessionId) {
        return this.#sessions.delete(sessionId)
    }

    /**
     * Get specific session object by their id
     * @param {string} sessionId 
     * @returns {Session|undefined}  
     */
    get(sessionId) {
        return this.#sessions.get(sessionId)
    }

    /**
     * Get session object by closeId
     * @param {string} closeId 
     * @returns {Session|undefined}
     */
    getByCloseId(closeId) {
        for (let entry of this.#sessions) {
            const session = entry[1]
            if (session.closeId === closeId) {
                return session 
            }
            else return null;
        }
    }

    /**
     * Close all sessions
     */
    clear() {
        this.#sessions.clear()
    }
}

module.exports = SessionStore