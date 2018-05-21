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
        from: 'Admin',
        text: 'This is a text',
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User joined',
        createdAt: new Date().getTime()
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
