const socket = io();
$('#send_message').hide()

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
    let tutor = "<div Id ='"+data.tutor_id+"' class='a-user'><img src='/static/images/"+data.tutor_avatar+"' alt='sunil' class='chat_img'><span class='chat_ib'>"+data.tutor_full+"</span></div>"
      $('#chat_user').append(tutor)
  })
  socket.on('chat_student', (data)=>{
    data.students.forEach(student =>{
      let user = "<div Id ='"+student._id+"' class='a-user'><img src='/static/images/"+student.User_avatar+"' alt='sunil' class='chat_img'><span class='chat_ib'>"+student.User_full+"</span></div>"
      $('#chat_user').append(user)
    })
  })
  socket.on('user-message', (data)=>{
    alert(data.msg)
  })
  $(document).on("click", ".a-user", function(){
    $('#send_message').show()
    let id = $(this).attr("Id")
    $("#send").click(() => {
      let message = $("#input-message").val()
      socket.emit("message", {
        id,
        message
      });
    });
  })
});
