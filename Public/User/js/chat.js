const socket = io();

$(document).ready(() => {
    let user_id = $("#user_id").val()
    let user_role = $("#role").val()
    let user_full = $("#user_full").val()
  socket.emit('user_info', {
    user_id,
    user_role,
    user_full
  })
  socket.on('chat_info', (data)=>{
    $('<img src="/static/images/'+data.tutor_avatar+'" alt="sunil">').appendTo('div.chat_img')
    $('<h5>'+data.tutor_full+'</h5>').appendTo('div.chat_ib')
  })
  $("#send").click(() => {
    socket.emit("message", $("#input-message").val());
    socket.on('r-message', (data)=>{
      console.log(data)
    })
  });
});
