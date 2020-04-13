const express = require("express");
const app = express();
const session = require("express-session");
require("express-group-routes");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const router = express.Router();
const ejsLint = require("ejs-lint");
const cookieParser = require("cookie-parser");
const Body_parser = require("body-parser");
const expressValidator = require("express-validator");
const home = require("./Router/Home.router");
const staff = require("./Router/Staff.router");
const auth = require("./Apps/midderware/au.midderware");
const Student = require("./Router/Student.router");
const Models = require("./Apps/Models/Models");
require("./Apps/kernal")(app, express, Body_parser, session);
app.use(cookieParser("123@123@!T"));
app.use("/", home);
app.use("/staff", auth.reqAuth, auth.CheckStaff, staff);
app.use("/user", auth.reqAuth, auth.CheckTutorAndStudent, Student);
io.on("connection", (socket) => {
  socket.on("user_info", async (data) => {
    socket.name = data.user_full;
    socket.user_room = data.user_id;
    socket.user = data.user_id;
    socket.join(socket.user_room);
    if (data.user_role === "Student") {
      let group = await Models.GroupModel.findOne({ Student_id: data.user_id });
      let tutor = await Models.UserModel.findById({ _id: group.Tutor_id });
      let tutor_id = group.Tutor_id;
      let tutor_full = tutor.User_full;
      let tutor_avatar = tutor.User_avatar;
      socket.emit("chat_tutor", {
        tutor_id,
        tutor_full,
        tutor_avatar,
      });
    }
    if (data.user_role === "Tutor") {
      let group = await Models.GroupModel.findOne({ Tutor_id: data.user_id });
      let students = await Models.UserModel.find({ _id: group.Student_id });
      socket.emit("chat_student", {
        students,
      });
    }
    socket.on("send_message", async (data) => {
      let sender = await Models.MessageModel.findOne({
        Sender: socket.user,
        Receiver: data.id,
      });
      let receiver = await Models.MessageModel.findOne({
        Sender: data.id,
        Receiver: socket.user,
      });
      let message = data.message;
      let name = socket.name;
      let time = data.time
      let img = data.user_img
      io.sockets.to(data.id).emit("user-message", {
        name,
        message,
        time, 
        img
      });
      if(sender == null)
      {
          let new_mess_sender = new Models.MessageModel({
              Sender: socket.user,
              Receiver: data.id,
              Message: [
                {
                  message: message,
                  Date: data.time
                }
              ]
          })
          await new_mess_sender.save()
      }
      else{
        await Models.MessageModel.findByIdAndUpdate({_id: sender._id},{$addToSet:{Message: {message: message, Date: data.time}}})
      }
    });
    socket.on("get_mess", async (data) => {
      let sender = await Models.MessageModel.findOne({
        Sender: socket.user,
        Receiver: data.id,
      }).populate("Receiver, Sender");
      let receiver = await Models.MessageModel.findOne({
        Sender: data.id,
        Receiver: socket.user
      }).populate("Receiver, Sender")
      let name = data.name
      socket.emit("list_message", sender, receiver ,name);
    });
  });
});
server.listen(1000);
module.exports = app;
