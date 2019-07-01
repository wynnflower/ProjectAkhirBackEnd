const router = require('express').Router()
//const{todoController}=require('./../controller')
const{getAllUsers,getUserByUsername,getUserById,register,verify,login,keepLogin,loginCart,keepLoginCart,
register2,checkUsername,getUserDetail,editUserDetail}=require('./../controller').userController // mengacu pada index.js

//router.post('/addTodo',todoController.addTodo)
router.get('/alluser',getAllUsers)
router.get('/getuserbyname',getUserByUsername)
router.get('/getuserbyid/:id',getUserById)
router.post('/register',register)
router.get('/login',login)
router.get('/logincart',loginCart)
router.get('/keeplogin',keepLogin)
router.get('/keeplogincart',keepLoginCart)
router.put('/verify',verify)
router.get('/checkusername',checkUsername)
router.post('/register2',register2)
router.get('/getuserdetail',getUserDetail)
router.post('/edituserdetail',editUserDetail)

module.exports=router