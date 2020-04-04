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
    Create_at: Date,
    Update_at: Date,
})
const GroupSchema = new Schema({
    _id: {type: mongoose.Schema.ObjectId, auto: true},
    Group_ID: {type: String , unique: true},
    Group_name: {type: String},
    Tutor_id: {type: mongoose.Schema.ObjectId, ref: 'User'},
    Student_id: Array,
    Create_at: Date,
    Update_at: Date,
})


const Role = mongoose.model('Role', RoleSchema, 'Role')
const User = mongoose.model('User', UserSchema, 'User')
const Group = mongoose.model('Group', GroupSchema, 'Group')
module.exports = {
    RoleModel : Role,
    UserModel : User,
    GroupModel: Group,
}
