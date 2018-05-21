const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname + '/../public')
const port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected')
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'))
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
        io.emit('newMessage', generateMessage(message.from, message.text))
    })
    socket.on('Disconnect', () => {
        console.log('Client disconnected')
    })
})

server.listen(port, () => {
    console.log('Server is up in port ' + port)
})