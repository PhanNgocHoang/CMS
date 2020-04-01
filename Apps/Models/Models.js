const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    _id: {type:mongoose.Schema.ObjectId, auto: true},
    roleName: String
})
const UserSchema = new Schema({
    _id: {type:mongoose.Schema.ObjectId, auto: true},
    User_ID: String,
    User_full: String,
    User_pass: String,
    User_role: [{type: Schema.Types.ObjectId, ref: 'Role'}],
    User_mail: {type: String, unique: true},
    User_address: String,
    User_gender: String,
    User_phone: String,
    User_avatar: String,
    User_birth: String,
    Faculty_id:[{type: Schema.Types.ObjectId, ref: 'Faculty'}],
    Create_at: Date,
    Update_at: Date,
})
const FacultySchema = new Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    Faculty_name: {type: String, unique: true},
    Faculty_des: String
})
const SubjectSchema = new Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    Subject_ID: {type: String, unique: true},
    Subject_name: {type: String, unique: true},
    Subject_des: String,
    Create_at: {type: Date},
    Update_at: {type: Date},
    Faculty_id: {type: mongoose.Schema.ObjectId, ref: 'Faculty'}
})
const ClassSchema = new Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    Class_ID: {type: String},
    Class_name: {type: String},
    Tutor_id: {type: mongoose.Schema.ObjectId, ref: 'User'},
    Student_id: Array,
    Create_at: Date,
    Update_at: Date,
    Subject_id: [{type: mongoose.Schema.ObjectId, ref: 'Subject'}]
})
const RoomSchema = new Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    Create_at: Date,
    Update_at: Date,
    User_id: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
})
const ExerciseSchema = new Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    Class_id : {type:mongoose.Schema.ObjectId, ref: 'Class'},
    File_Exercise: String,
    Exercise_des: String,
    Create_at: Date,
    Deadline: Date
})
const CommentSchema = new Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    Exercise_id: [{type: mongoose.Schema.ObjectId, ref: 'Exercise'}],
    User_id: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    Date_time: Date,
    Comment_detail: String
})

const Role = mongoose.model('Role', RoleSchema, 'Role')
const User = mongoose.model('User', UserSchema, 'User')
const Faculty = mongoose.model('Faculty', FacultySchema, 'Faculty')
const Subject = mongoose.model('Subject',SubjectSchema, 'Subject' )
const Class = mongoose.model('Class', ClassSchema, 'Class')
const Room = mongoose.model('Room_meet', RoleSchema, 'Room_meet')
const Exercise = mongoose.model('Exercise', ExerciseSchema, 'Exercise')
const Comment = mongoose.model('Comment', CommentSchema, 'Comment')
module.exports = {
    RoleModel : Role,
    UserModel : User,
    FacultyModel : Faculty,
    SubjectModel : Subject,
    ClassModel : Class,
    Room : Room,
    ExerciseModel : Exercise,
    CommentModel : Comment
}
