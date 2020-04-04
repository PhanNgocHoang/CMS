const express = require('express')
const router = express.Router()
const Student = require('../Apps/Controllers/Student.controller')

router.route('/')
    .get(Student.Index_Page)
router.route('/profile')
    .get(Student.Profile_Page)
router.route('/:user_id/PersonalTutor')
    .get(Student.Personal_Tutor)
module.exports = router