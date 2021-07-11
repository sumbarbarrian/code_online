const express = require('express')
const ws = require('ws')
const cors = require('cors')
const server = express()

server.use('*', cors()) 

  
/**
 *  this endpoint opens session
 */
server.get('/create', (req, res) => {
    var id = 1;
    var obj = { sessionId : 1, closeToken: "token" };
    //написать метод, который сгенерирует уникальный айди и сохранить его
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