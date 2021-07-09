const express = require('express')
const ws = require('ws')
const server = express()



/**
 *  this endpoint opens session
 */
server.get('/create', (req, res) => {
    console.log('create session')
    res.send()
})

/**
 *  this endpoint closes session
 */
server.get('/close', (req, res) => {
    console.log('close session')
    res.send()
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