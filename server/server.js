const express = require('express')
const ws = require('ws')
const cors = require('cors')
const SessionStore = require("./store/session-store");
const server = express()
const { v4: uuidv4 } = require('uuid');
server.use('*', cors())

  
/**
 *  this endpoint opens session
 */
server.get('/create', (req, res) => {
    let newUuid = uuidv4(); //generating unic id
    console.log(newUuid);

    let unicCloseToken = uuidv4(); //generating unic token
    console.log(unicCloseToken)

    let promiseStore = SessionStore.get();
    promiseStore.then((store) => {
        store.create(newUuid, unicCloseToken);
        console.log('create session')
        let view = { sessionId : newUuid, closeToken: unicCloseToken }
        res.send(JSON.stringify(view));
    })


})



/**
 *  this endpoint closes session
 */
server.get('/close/:closeId', (req, res) => {
    let promiseStore = SessionStore.get();
    promiseStore.then((store) => {
        let closeId = req.params.closeId;
        let closeSession = store.getByCloseId(closeId);

        if (closeSession != null){
            store.remove(closeSession.uuid)
            res.status(201).send()
        }

        else if (closeSession == null){
            res.status(404).send({errorMessage: 'Session does not exist'});

        }

    })

})

server.listen(8081, () => {
    console.info('Server started')
})
const socket = new ws.Server({ server })

/**
 * ws for messages
 */
socket.on('connection', ws => {
    ws.on('message', message => {
        //iterate over all clients
        ws.clients.forEach(  )
    })
})

module.exports = server