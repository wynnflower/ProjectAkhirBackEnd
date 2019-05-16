const router = require('express').Router()
//const{todoController}=require('./../controller')
const{getAllCart,getCartByUser,getCartDetail,
addtoCart,editCart,delCart}=require('./../controller').cartController // mengacu pada index.js


//router.post('/addTodo',todoController.addTodo)
router.get('/getcart',getAllCart)
router.get('/getusercart',getCartByUser)
router.get('/getcartdetail/:id',getCartDetail)

router.post('/addcart',addtoCart)
router.put('/editcart/:id',editCart)
router.delete('/delcart',delCart)

module.exports=router