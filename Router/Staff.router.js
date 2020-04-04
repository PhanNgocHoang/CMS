const express = require('express')
const router = express.Router()
const StaffController = require('../Apps/Controllers/Staff.controller')

router.route('/')
    .get(StaffController.Page_Index)
router.route('/profile')
    .get(StaffController.Staff_Profile)
router.route('/PersonalSupport')
    .get(StaffController.Group_Page)
router.route('/PersonalSupport/CreateGroup')
    .get(StaffController.Get_Create_Group)
    .post(StaffController.Post_Create_Group)
router.route('/PersonalSupport/GroupDetail/:group_id')
    .get(StaffController.Get_Group_Detail)
router.route('/PersonalSupport/UpdateGroup/:group_id')
    .get(StaffController.Get_Update_Group)
    .post(StaffController.Post_Update_Group)
router.route('/PersonalSupport/DeleteGroup/:group_id')
    .get(StaffController.Get_Delete_Group)
router.route('/PersonalSupport/Group/:group_id/AddStudent/:role_id')
    .get(StaffController.Get_List_Student)
router.route('/PersonalSupport/Group/:group_id/AddStudent/:role_id/:student_id')
    .get(StaffController.Add_To_ListStudent)
router.route('/PersonalSupport/Group/:group_id/ListAddStudent/:role_id')
    .get(StaffController.Get_Add_Student)
    .post(StaffController.Post_Add_Student)
router.route('/PersonalSupport/Group/:group_id/ListAddStudent/:role_id/delete/:student_id')
    .get(StaffController.Delete_StudentInListAdd)
router.route('/Account')
    .get(StaffController.Index_Account)
router.route('/Account/:role_id')
    .get(StaffController.List_Account)
router.route('/Account/:role_id/Create')
    .get(StaffController.Get_Create_Account)
    .post(StaffController.Post_Create_Account)
router.route('/Account/:role_id/Detail/:user_id')
    .get(StaffController.Detail_Account)
router.route('/Account/:role_id/Update/:user_id')
    .get(StaffController.Get_Update_Account)
    .post(StaffController.Post_Update_Account)
router.route('/Account/:role_id/Delete/:user_id')
    .get(StaffController.Get_Delete_Account)

module.exports = router
