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
async function Personal_Tutor(req, res)
{
    let user_id = req.params.user_id
    let tutor_id = await Models.GroupModel.findOne({Student_id: user_id})
    let Tutor = await Models.UserModel.findById({_id: tutor_id.Tutor_id})
    return res.render('TuTorAndStudent/chatbox/index', {data:{Tutor: Tutor, tutorId: tutor_id.Tutor_id}})
}
async function Class_Page(req, res)
{
    let subject = req.params.subject_id
    let user = req.params.user_id
    let faculty = req.params.faculty_id
    let Class = await Models.ClassModel.find({$or:[{Subject_id: subject, Student_id: user},{Tutor_id: user}]})
    return res.render('TutorAndStudent/class/listclass', {data:{class:Class, subject:subject, faculty:faculty}})

}
async function Detail_Class(req, res)
{
    let class_id = req.params.class_id
    let Exercise = await Models.ExerciseModel.find({Class_id: class_id})
    return res.render('TutorAndStudent/exercise/index')
}

module.exports = {
    Index_Page: Index_Page,
    Profile_Page: Profile_Page,
    Personal_Tutor:Personal_Tutor,
    Class_Page: Class_Page,
    Detail_Class: Detail_Class,
}