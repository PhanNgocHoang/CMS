const Models = require('../Models/Models')
const mongoose = require("../../common/database")();
async function Index_Page(req, res)
{
    return res.render('TutorAndStudent/index')
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
module.exports = {
    Index_Page: Index_Page,
    Profile_Page: Profile_Page,
    Chat: Chat,
    Dashboard: Dashboard
}