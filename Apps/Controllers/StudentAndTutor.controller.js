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
async function Subject_Page(req, res)
{
    let faculty = req.params.faculty_id
    let subject = await Models.SubjectModel.find({Faculty_id: faculty})
    return res.render('TutorAndStudent/subject/listsubject', {data:{subject:subject, faculty:faculty}})
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
    Subject_Page:Subject_Page,
    Class_Page: Class_Page,
    Detail_Class: Detail_Class
}