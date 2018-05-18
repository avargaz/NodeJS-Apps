var socket = io()
socket.on('connect', function () {
    console.log('Connected to server')
    socket.emit('createEmail', {
      to: 'me@hotmail.com',
      text: 'This is client to server text'
    })
})
socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newEmail', function (data) {
  console.log('New Email: ' + JSON.stringify(data))
})
