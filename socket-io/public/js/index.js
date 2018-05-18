var socket = io()
socket.on('connect', function () {
    console.log('Connected to server')
    socket.emit('createMessage', {
      from: 'Alex',
      text: 'This is client to server text'
    })
})
socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
  console.log('newMessage: ' + JSON.stringify(message))
})
