const express = require('express')
const ws = require('ws')
const cors = require('cors')
const server = express()
const { v4: uuidv4 } = require('uuid');
let map = new Map(); //creating map for uuid as key and token as value
server.use('*', cors()) 

const setUUID = (newUuid, unicCloseToken) => {
  map.set(newUuid, unicCloseToken); //saving uuid and token in map
}

const createObj = (newUuid, unicCloseToken) => {
    return { sessionId : newUuid, closeToken: unicCloseToken };
}

/**
 *  this endpoint opens session
 */
server.get('/create', (req, res) => {
    const newUuid = uuidv4(); //generating unic id
    const unicCloseToken = uuidv4(); //generating unic token
    const obj = createObj(newUuid, unicCloseToken);
    
    setUUID(newUuid)
console.log('create session')
    res.send(JSON.stringify(obj))
})



/**
 *  this endpoint closes session
 */
server.get('/close', (req, res) => {
    console.log('close session')
    res.send()
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