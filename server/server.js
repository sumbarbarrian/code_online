const express = require('express')
const ws = require('ws')
const server = express()

server.get('/create', (req, res) => {
    console.log('create session')
    res.send()
})

server.get('/close', (req, res) => {
    console.log('close session')
    res.send()
})

const socket = new ws.Server({ server })

socket.on('connection', ws => {
    ws.on('message', message => {
        ws.clients.forEach(  )
    })
})

module.exports = server