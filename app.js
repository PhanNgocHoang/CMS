const express = require('express')
const session = require('express-session')
require('express-group-routes')
const app = express()
const router = express.Router()
const ejsLint = require('ejs-lint')
const cookieParser = require('cookie-parser')
const Body_parser = require('body-parser')
const home = require('./Router/Home.router')
const staff = require('./Router/Staff.router')
const auth = require('./Apps/midderware/au.midderware')
require('./Apps/kernal')(app, express, Body_parser, session)
app.use(cookieParser('123@123@!T'))
// require('./Router/web')(app)
app.use('/', home)
app.use('/staff',auth.reqAuth,auth.CheckStaff,staff)

module.exports = app