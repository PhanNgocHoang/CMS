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
  socket.on('chat_tutor', (data)=>{
    let tutor = '<div user_id ="'+data.tutor_id+'"><img src="/static/images/'+data.tutor_avatar+'" alt="sunil" class="chat_img"><span class="chat_ib">'+data.tutor_full+'</span> <div>'
      $('#chat_user').append(tutor)
  })
  socket.on('chat_student', (data)=>{
    data.students.forEach(student =>{
      let user = '<div user_id ="'+student._id+'"><img src="/static/images/'+student.User_avatar+'" alt="sunil" class="chat_img"><span class="chat_ib">'+student.User_full+'</span> <div>'
      $('#chat_user').append(user)
    })
  })
  $("#send").click(() => {
    socket.emit("message", $("#input-message").val());
    socket.on('r-message', (data)=>{
    })
  });
});
