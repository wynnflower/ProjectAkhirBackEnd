var multer=require('multer')

const storageConfig=multer.diskStorage({
    //File mau disimpan di mana
    destination:(req,file,cb)=>{ // request, file, callback
        cb(null,'./uploads/transaction')
    },
    // Nama File
    filename:(req,file,cb)=>{
        cb(null,'TRS-'+Date.now()+'.'+file.mimetype.split('/')[1])
    } 
})

const filterConfig=(req,file,cb)=>{
    if(file.mimetype.split('/')[1]=="jpeg" || file.mimetype.split('/')[1]=="png"){
        cb(null,true) // Type sesuai keinginan kita (di if)
    } else {
        req.validation={error:true,msg:'File must be Image'}
        cb(null,false)
        //cb(new Error('Image must be Jpeg / Png'),false) // untuk else nya
    }
}
//MENGATUR LOKASI FILE & UKURAN
//var upload = multer({storage:storageConfig,fileFilter:filterConfig,limits:{fileSize:5*1024*1024}})
var upload = multer({storage:storageConfig,fileFilter:filterConfig})

module.exports=upload