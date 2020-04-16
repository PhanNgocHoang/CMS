const Models = require('../Models/Models')
const mongoose = require("../../common/database")();
async function Index_Page(req, res)
{
    let staff = await Models.RoleModel.findOne({roleName: "Staff"})
    return res.render('TutorAndStudent/index', {data:{staff_id: staff._id}})
}
function Profile_Page(req, res)
{
    res.render('TutorAndStudent/profile/detail')
}
async function Chat(req, res)
{
    return res.render('TuTorAndStudent/chatbox/index')
}
async function Dashboard(req, res)
{
    let user = await Models.UserModel.findById({_id:req.params.user_id})
    let Role = await Models.RoleModel.findById({_id: user.User_role})
    return  res.render('TutorAndStudent/dashboard/index', {data:{user_id: req.params.user_id, Role: Role.roleName}})
}
async function Get_Contact(req, res)
{

}
module.exports = {
    Index_Page: Index_Page,
    Profile_Page: Profile_Page,
    Chat: Chat,
    Dashboard: Dashboard,
    Get_Contact: Get_Contact
}