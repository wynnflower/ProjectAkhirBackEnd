const router = require('express').Router()
//const{todoController}=require('./../controller')
const{getAllProduct,getViewProduct,getAllKategori,getAllSubkategori,
    getDetailProduct,getproductbySubkategori,getproductbyKategori,
    searchProduct}=require('./../controller').productController // mengacu pada index.js


//router.post('/addTodo',todoController.addTodo)
router.get('/getproductfull',getAllProduct)
router.get('/getproduct',getViewProduct)
router.get('/getkategori',getAllKategori)
router.get('/getsubkategori',getAllSubkategori)
router.get('/getproductdetail/:id',getDetailProduct)
router.get('/getproductsubkat',getproductbySubkategori)
router.get('/getproductkat',getproductbyKategori)
router.get('/searchproduct',searchProduct)

module.exports=router