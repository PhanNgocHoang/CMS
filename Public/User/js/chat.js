const socket = io();
$("#list_mess").hide();
let Create_at = new Date();
let date =
  Create_at.getFullYear() +
  "-" +
  (Create_at.getMonth() + 1) +
  "-" +
  Create_at.getDate() +
  "/" +
  Create_at.getHours() +
  ":" +
  Create_at.getMinutes() +
  ":" +
  Create_at.getSeconds();

$(document).ready(() => {
  let user_id = $("#user_id").val();
  let user_role = $("#role").val();
  let user_full = $("#user_full").val();
  let user_img = $("#us_img").val();
  socket.emit("user_info", {
    user_id,
    user_role,
    user_full,
  });
  socket.on("chat_tutor", (data) => {
    let tutor =
      "<li id='chat-icon'><div Id ='" +
      data.tutor_id +
      "' name ='" +
      data.tutor_full +
      "' class='a-user'><img src='/static/images/" +
      data.tutor_avatar +
      "' alt='sunil' class='chat_img'><div class='chat_title' >" +
      data.tutor_full +
      "</div><div class='chat_date'>Dec 25</div><br><div class='chat_ib'></div><div class='clearfix'></div></div></li>";
    $(".list_people").append(tutor);
  });
  socket.on("chat_student", (data) => {
    data.students.forEach((student) => {
      let user =
        "<li id='chat-icon'><div Id ='" +
        student._id +
        "'  name ='" +
        student.User_full +
        "'class='a-user'><img src='/static/images/" +
        student.User_avatar +
        "' alt='sunil' class='chat_img'><div class='chat_title' >" +
        student.User_full +
        "</div><div class='chat_date'>Dec 25</div><br><div class='chat_ib'></div><div class='clearfix'></div></div></li>";
      $(".list_people").append(user);
    });
  });
  $(document).on("click", ".a-user", function () {
    let id = $(this).attr("Id");
    let name = $(this).attr("name");
    $("#list_mess").show(500);
    socket.emit("get_mess", { id, name });
    socket.on("list_message", (sender, receiver, name) => {
      sender.Message.forEach((msg_sender) => {
        $("#my_msg").html('')
        let msg =
          "<p>" +
          msg_sender.message +
          "</p><span class='time_date'>" +
          msg_sender.Date +
          "</span>";
        $("#my_msg").append(msg);
      });
      let receiver_info = new Array(receiver.Sender);
      receiver_info.forEach((img_receiver) => {
        $("#msg_come").html('')
        $("#img_come").html('')
        let img =
          "<img class='chat_img' src='/static/images/" +
          img_receiver.User_avatar +
          "' alt='sunil'>";
        $("#img_come").append(img);
      });
      receiver.Message.forEach((msg_receiver) => {
        let msg =
          "<p>" +
          msg_receiver.message +
          "</p><span class='time_date'>" +
          msg_receiver.Date +
          "</span>";
        $("#msg_come").append(msg);
      });
    });
    $("#input-message").on("keyup", (event) => {
      let message = $("#input-message").val();
      if (event.keyCode === 13 && message != "") {
        console.log(message)
        let my_msg =
          "<p>" + message + "</p><span class='time_date'>" + date + "</span>";
        $("#my_msg").append(my_msg);
        socket.emit("send_message", {
          id,
          message,
          time: date,
          user_img,
        });
        $("#input-message").val("");
      }
      else if(event.keyCode === 13)
      {
        alert("Please enter your message")
      }
    });
  });
  socket.on("user-message", (data) => {
     bt = setInterval(() => {
      $("#chat-icon").css("background-color", "blue");
    }, 50);
  });
  $(document).on('click', '#set_time', ()=>{
    let time = $('#time').val()
    let date = $('#date').val()
    console.log(date)
    console.log(time)
  })
});
