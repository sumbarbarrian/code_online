/**
 * Object represents connected client to specific session.
 */
class Client {
    #id = null
    constructor(id) {
        this.#id = id
    }

    get id() {
        return this.#id
    }

}

module.exports = Client