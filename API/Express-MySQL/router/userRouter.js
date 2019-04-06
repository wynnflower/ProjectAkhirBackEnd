const router = require('express').Router()
//const{todoController}=require('./../controller')
const{getAllUsers,getUserByUsername,getUserById,addUser}=require('./../controller').userController // mengacu pada index.js

//router.post('/addTodo',todoController.addTodo)
router.get('/alluser',getAllUsers)
router.get('/getuserbyname',getUserByUsername)
router.get('/getuserbyid/:id',getUserById)
router.post('/addUser',addUser)

module.exports=router