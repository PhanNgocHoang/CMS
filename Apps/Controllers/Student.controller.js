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
module.exports = {
    Index_Page: Index_Page,
    Profile_Page: Profile_Page,
    Chat: Chat
}