const router = require('express').Router()
//const{todoController}=require('./../controller')
const{addTodo,editTodoById,deleteTodo,getAllTodo}=require('./../controller').todoController // mengacu pada index.js

//router.post('/addTodo',todoController.addTodo)
router.post('/addtodo',addTodo)
router.delete('/deltodo/:id',deleteTodo)
router.put('/edittodo',editTodoById)
router.get('/alltodo',getAllTodo)

module.exports=router