const db=require('../database')
var fs = require('fs');

module.exports={
    getAllProduct:(req,res)=>{
        var sql = `select product.id,nama,harga,kategori,idsubkat,namasubkat,diskon,product.image,deskripsi,kategori.id as idkat from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id;`
        db.query(sql, (err, result) => {
            if(err) throw (err)
            res.send(result)
        })
    },
    getViewProduct:(req,res)=>{
        var sql=`select product.id,nama,harga,diskon,product.image from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id;`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getAllCart:(req,res)=>{
        var sql=`SELECT cart.id,username,harga,diskon, (harga-(harga*diskon/100)) as harga,  qty ,
        (harga-(harga*diskon/100))*qty as subtotal,tglbeli FROM cart
        join product on idproduk=product.id;`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getDetailProduct:(req,res)=>{
        var id=req.params.id
        //console.log(id)
        var sql=`select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id where product.id=${id};`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getproductbySubkategori:(req,res)=>{
        var subkat=req.params.id
        console.log(subkat)
        var sql=`select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id where subkategori.id='${subkat}';`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getproductbyKategori:(req,res)=>{
        var kat=req.params.id
        //console.log(subkat)
        var sql=`select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id where kategori.id='${kat}';`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    searchProduct:(req,res)=>{
        var search=req.query.nama
        console.log(search)
        var sql=`select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id where nama like '%${search}%' or kategori like '%${search}%' or namasubkat like '%${search}%';`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getPromo:(req,res)=>{
        var sql=`select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id where diskon>0`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    addProduct:(req,res)=>{
        console.log(req.validation)
        if(req.validation) throw req.validation
            console.log(req.file)
            if(req.file.size>6000000) throw {error:true,msg:'Image too large'}
             var newData=JSON.parse(req.body.data)
            newData.image=req.file.destination.split('/')[1]+'/'+req.file.destination.split('/')[2]+'/'+req.file.filename
            console.log(newData)
            var sql=`insert into product set ?`
            db.query(sql,newData,(err,result)=>{
                if(err) throw (err)
                var sql2 = `select * from product;`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    res.send(result2)
                })
        })
    },
    editProduct:(req,res)=>{
        var id=req.params.id

        var sql0= `select * from product where id=${id}`
        db.query(sql0,(err,result0)=>{
            try{
                if(err) throw err.message
                var path=result0[0].image
                console.log(path)
                
                var sql = `update product set ? where id=${id}`
                var newData=JSON.parse(req.body.data)
                if (req.file){
                    newData.image=req.file.destination.split('/')[1]+'/'+req.file.destination.split('/')[2]+'/'+req.file.filename
                }
                
                console.log(newData)

                db.query(sql, newData, (err, result) => {
                    try {
                        if (err) throw err.message
                        if(req.file){
                            fs.unlink(path,(err,data2)=>console.log('Menghapus Image Lama Sukses')) 
                        }
                        var sql2 = `select * from product;`
                        db.query(sql2, (err, result2) => {
                            if (err) throw (err)
                            res.send("Update Data Sukses")
                        })
                    } catch (err) {
                        res.send(err)
                    }
                })
                

            } catch (err) {
                res.send(err.message)
            }
        })
    },
    deleteProduct:(req,res)=>{
        // var id=req.params.id
        // var path=req.body.image

        // var sql=`delete from product where id=${id};`
        // db.query(sql,(err,result)=>{
        //     if(err) throw (err)
        //     fs.unlink(path,(err,data)=>console.log('Delete Image Sukses'))
        //     var sql2 = `select * from product;`
        //     db.query(sql2, (err, result2) => {
        //         if (err) throw (err)
        //         res.send(result2)
        //     })
        // })
        var id=req.params.id
        var sql0= `select * from product where id=${id}`
        db.query(sql0,(err,result0)=>{
            try{
                if(err) throw err.message
                var path=result0[0].image
                console.log(path)
                
                var sql = `delete from product where id=${id}`
                db.query(sql, (err, result) => {
                    try {
                        if (err) throw err.message
                        if(req.file){
                            fs.unlink(path,(err,data2)=>console.log('Menghapus Image Lama Sukses')) 
                        }
                        var sql2 = `select * from product;`
                        db.query(sql2, (err, result2) => {
                            if (err) throw (err)
                            res.send("Update Data Sukses")
                        })
                    } catch (err) {
                        res.send(err)
                    }
                })
                

            } catch (err) {
                res.send(err.message)
            }
        })
    }


}