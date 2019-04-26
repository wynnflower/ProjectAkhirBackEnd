const router = require('express').Router()
//const{todoController}=require('./../controller')
const{getAllCart,getCartByUser,getCartDetail}=require('./../controller').cartController // mengacu pada index.js


//router.post('/addTodo',todoController.addTodo)
router.get('/getcart',getAllCart)
router.get('/getusercart',getCartByUser)
router.get('/getcartdetail/:id',getCartDetail)

module.exports=router