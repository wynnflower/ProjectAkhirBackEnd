const router = require('express').Router()

//const{todoController}=require('./../controller')
const{getAllKategori,getAllSubkategori,getSubkatByKategori,
addKategori,deleteKategori,editKategori,
addSubkat,editSubkat,deleteSubkat,
getSubkatByIdSubkat,getKatByIdKat}=require('./../controller').kategoriController // mengacu pada index.js
const upload=require('../helpers/uploaderKat')
const uploadskat=require('../helpers/uploaderSubkat')

//Get Kategori
router.get('/getkategori',getAllKategori)
router.get('/getsubkategori',getAllSubkategori)
router.get('/getsubbykat/:id',getSubkatByKategori)

//Modify Kategori
router.post('/addkategori',upload.single('imagekat') ,addKategori)
router.delete('/delkategori/:id',deleteKategori)
router.put('/editkategori/:id',upload.single('imagekat'),editKategori)

//Modify Subkategori
router.post('/addsubkat',uploadskat.single('imageskat') ,addSubkat)
router.delete('/delsubkat/:id',deleteSubkat)
router.put('/editsubkat/:id',uploadskat.single('imageskat'),editSubkat)

//Special Get
router.get('/getsubkatheader/:id',getSubkatByIdSubkat)
router.get('/getkategoriheader/:id',getKatByIdKat)

module.exports=router