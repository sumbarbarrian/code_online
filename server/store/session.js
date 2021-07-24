/**
 * Editor Session object  
 * Contains all data about connected clients.
 */
 class Session {

    #uuid
    #clients
    #closeId

    constructor(uuid, closeId) {
        this.#uuid = uuid
        this.#clients = []
        this.#closeId = closeId
    }

    /**
     * Returns id of this session
     */
    get uuid() {
        return this.#uuid
    }

    /**
     * Returns close session id of this item
     */
    get closeId() {
        return this.#closeId
    }

    /**
     * Add new Client to this session
     * @param {Client} client 
     * @returns {boolean} `true` if client is new and added, `false` otherwise.
     */
    addClient(client) {
        if (client) {
            const _client = this.#clients.find( ({ id }) => id === client.id )
            if (!_client) {
                this.#clients.push(client)
                return true
            }
        }
        return false
    }

    /**
     * Add new Client to this session
     * @param {string} clientId 
     * @returns {boolean} `true` if client was found and removed, `false` otherwise.
     */
    removeClient(clientId) {
        if (typeof clientId === 'string' && clientId.length > 0) {
            let index = -1
            this.#clients.some( ({ id }, i) => {
                if (id === clientId) {
                    index = i
                    return true
                }
            })

            if (index >= 0) {
                this.#clients.splice(index, 1)
                return true
            }
        }
        return false
    }

    /**
     * @returns {Client[]} Returns all clients
     */
    getClients() {
        return [...this.#clients]
    }
}

module.exports = Session