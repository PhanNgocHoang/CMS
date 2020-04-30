const socket = io();
$(document).ready(() => {
  let role_id = $("#role_id").val();
  socket.emit("RoleId", role_id);
  socket.on("Sender_Receiver", (sender, receiver, User) => {
    User.forEach((user) => {
      let user_full =
        "<td>" +
        user.User_full +
        "| <a href='/staff/DetailMessage/" +
        user._id +
        "' title='Detail'><i class='fa fa-eye'>Detail</i></a></th>";
      $("#user_full").append(user_full);
    });
    sender.forEach((element) => {
      let num_sender = "<td>" + element + "</td>";
      $("#sender").append(num_sender);
    });
    receiver.forEach((receiver) => {
      let num_receiver = "<td>" + receiver + "</td>";
      $("#receiver").append(num_receiver);
    });
  });
  let user_id = $("#user_id").val();
  socket.emit("detail-mess", user_id);
  socket.on("message_detail", (arr_mess_sent, arr_mess_receiver) => {
    $("#sent").append(arr_mess_sent.length);
    $("#receive").append(arr_mess_receiver.length);
    arr_mess_sent.forEach((message) => {
      let list = "<li>" + message.Date + "</li>";
      $("#h_sent").append(list);
    });
    arr_mess_receiver.forEach((message) => {
      let list = "<li>" + message.Date + "</li>";
      $("#h_receive").append(list);
    });
  });
  socket.emit("student_support");
  socket.on("detail_student", (List_student, Student_notSupport) => {
    List_student.forEach((student) => {
      let list = "<li>" + student.User_full + "</li>";
      let lis_id = "<li>" + student.User_ID + "</li>";
      $("#st_tutor").append(list);
      $("#st_tutor_id").append(lis_id);
    });
    Student_notSupport.forEach((student) => {
      let list = "<li>" + student.User_full + "</li>";
      let lis_id = "<li>" + student.User_ID + "</li>";
      $("#st_not_tutor").append(list);
      $("#st_not_tutor_id").append(lis_id);
    });
  });
  socket.emit("tutor", $("#tutor_id").val());
  let tutor_id = $("#tutor_id").val();
  socket.emit("list_student_support", tutor_id);
  socket.on("sum_student_support", (list_student, Student) => {
    Student.forEach((student) => {
      let user_full = "<li>" + student.User_full + "</li></br>";
      let student_id = "<li>" + student.User_ID + "</li></br>";
      $("#student_name").append(user_full);
      $("#student_id").append(student_id);
    });
  });
});
