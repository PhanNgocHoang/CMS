const socket = io();
$('#list_mess').hide()

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
    let tutor = "<div Id ='"+data.tutor_id+"' class='a-user'><img src='/static/images/"+data.tutor_avatar+"' alt='sunil' class='chat_img'><div class='chat_title'>"+data.tutor_full+"</div><div class='chat_date'>Dec 25</div><br><div class='chat_ib'>Test, which is a new approach to have all solutions astrology under one roof.</div></div>"
      $('#chat_user').append(tutor)
  })
  socket.on('chat_student', (data)=>{
    data.students.forEach(student =>{
      let user = "<div Id ='"+student._id+"' class='a-user'><img src='/static/images/"+student.User_avatar+"' alt='sunil' class='chat_img'><div class='chat_title'>"+student.User_full+"</div><div class='chat_date'>Dec 25</div><br><div class='chat_ib'>Test, which is a new approach to have all solutions astrology under one roof.</div></div>"
      $('#chat_user').append(user)
    })
  })
  $(document).on("click", ".a-user", function(){
    let id = $(this).attr("Id")
    socket.emit('get_mess', id)
    socket.on('list_message', (data)=>{
      console.log(data.sender)
      console.log(data.receiver)
    })
    $('#list_mess').show(1000)
    $("#send").click(() => {
      let message = $("#input-message").val()
      socket.emit("send_message", {
        id,
        message
      });
    });
  })
  socket.on('user-message', (data)=>{
    console.log(data)
  })
});
