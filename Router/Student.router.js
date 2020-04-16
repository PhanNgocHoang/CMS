const express = require('express')
const router = express.Router()
const Student = require('../Apps/Controllers/Student.controller')

router.route('/')
    .get(Student.Index_Page)
router.route('/profile')
    .get(Student.Profile_Page)
router.route('/chat')
    .get(Student.Chat)
router.route('/dashboard/:user_id')
    .get(Student.Dashboard)
router.route('/contact/:id')
    .get(Student.Get_Contact)
module.exports = router