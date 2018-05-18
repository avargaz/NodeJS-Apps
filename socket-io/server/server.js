const path = require('path')
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname + '/../public')
const port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected')
    socket.emit('newMessage', {
        from: 'John',
        text: 'This is a text',
        createdAt: 123
    })
    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    })
    socket.on('Disconnect', () => {
        console.log('Client disconnected')
    })
})

server.listen(port, () => {
    console.log('Server is up in port ' + port)
})
