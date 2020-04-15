const socket= io()
$(document).ready(()=>{
    let role_id = $('#role_id').val()
    socket.emit('RoleId', role_id)
    socket.on("Sender_Receiver", (sender, receiver, User)=>{
       User.forEach(user=>{
           let user_full = "<td>"+user.User_full+"| <a href='/staff/DetailMessage/"+user._id+"' title='Detail'><i class='fa fa-eye'>Detail</i></a></th>"
           $('#user_full').append(user_full)
       })
        sender.forEach(element => {
           let num_sender = "<td>"+element+"</td>"
           $('#sender').append(num_sender)
       });
       receiver.forEach(receiver=>{
           let num_receiver = "<td>"+receiver+"</td>"
           $('#receiver').append(num_receiver)
       })
    })
    let user_id = $('#user_id').val()
    socket.emit('detail-mess', user_id)
    socket.on('message_detail', (arr_mess_sent, arr_mess_receiver)=>{
         $('#sent').append(arr_mess_sent.length)
         $('#receive').append(arr_mess_receiver.length)
         let arr_sent = []
         let arr_receive = []
         for(i = 0; i<=arr_mess_sent.length-1; i++)
         {
            arr_sent.push(arr_mess_sent[i].Date)
         }
         for(i = 0; i<=arr_mess_receiver.length -1; i++)
         {
             arr_receive.push(arr_mess_receiver[i].Date)
         }
         $('#h_sent').append(arr_sent.join(';'))
         $('#h_receive').append(arr_receive.join(';'))
    })
})
