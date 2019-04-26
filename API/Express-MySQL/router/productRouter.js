const router = require('express').Router()
const upload=require('../helpers/uploaderKat')
//const{todoController}=require('./../controller')
const{getAllProduct,getViewProduct,
    getDetailProduct,getproductbySubkategori,getproductbyKategori,
    searchProduct,getPromo,addProduct,editProduct,deleteProduct}=require('./../controller').productController // mengacu pada index.js


//router.post('/addTodo',todoController.addTodo)

//Select Query
router.get('/getproductfull',getAllProduct)
router.get('/getproduct',getViewProduct)
router.get('/getproductdetail/:id',getDetailProduct)
router.get('/getproductsubkat',getproductbySubkategori)
router.get('/getproductkat',getproductbyKategori)
router.get('/searchproduct',searchProduct)
router.get('/getpromo',getPromo)

//Product
router.post('/addproduct',addProduct)
router.put('/editproduct/:id',editProduct)
router.delete('/delproduct/:id',deleteProduct)


module.exports=router