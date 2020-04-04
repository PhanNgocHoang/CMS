const socket = io('http://localhost:1000/user')

let username = $('#user')
let message = $('#message')
let chat = $('#chat')
let btn = $('#btn')

btn.click(()=>{
    socket.emit('user_connect', {
        username,
        message
    })
})
