const db=require('../database')
var fs = require('fs');

module.exports={
    getAllKategori:(req,res)=>{
        var sql=`select * from kategori`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getAllSubkategori:(req,res)=>{
        var sql=`select subkategori.id,kategori,namasubkat as subkategori, subkategori.image from kategori
        join subkategori on kategori.id = idkat;`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getSubkatByKategori:(req,res)=>{
        var idkat=req.params.id
        var sql=`select subkategori.id, kategori.kategori,namasubkat as subkategori,subkategori.image from subkategori
        join kategori on idkat = kategori.id where kategori.id=${idkat};`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getSubkatByIdSubkat:(req,res)=>{
        var idsubkat=req.params.id
        var sql=`select subkategori.id, kategori.kategori as kategori,namasubkat as subkategori from subkategori
        join kategori on idkat = kategori.id where subkategori.id=${idsubkat};`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getKatByIdKat:(req,res)=>{
        var idkat=req.params.id
        var sql=`select id,kategori from kategori where id=${idkat}`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    addKategori:(req,res)=>{
        console.log(req.validation)
        if(req.validation) throw req.validation
        console.log(req.file)
            if(req.file.size>6000000) throw {error:true,msg:'Image too large'}
             var newData=JSON.parse(req.body.data) // nama kategori
            newData.image=req.file.destination.split('/')[1]+'/'+req.file.destination.split('/')[2]+'/'+req.file.filename
            console.log(newData)
            var sql=`insert into kategori set ?`
            db.query(sql,newData,(err,result)=>{
                if(err) throw (err)
                var sql2 = `select * from kategori;`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    res.send(result2)
                })
        })
    },
    editKategori:(req,res)=>{
        var id=req.params.id
        //var data=req.body.data
        // console.log('Edit')
        // console.log('id = '+id)
        // console.log('data='+data)
        // console.log(req.file)
        // console.log(JSON.parse(req.body.data))
        var sql0= `select * from kategori where id=${id}`
        db.query(sql0,(err,result0)=>{
            try{
                if(err) throw err.message
                var path=result0[0].image
                console.log(path)
                
                var sql = `update kategori set ? where id=${id}`
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
                        var sql2 = `select * from kategori;`
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
    deleteKategori:(req,res)=>{
        var id=req.params.id
        var path=req.body.image
        console.log(id)
        console.log(path)
        var sql=`delete from kategori where id=${id};`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            fs.unlink(path,(err,data)=>console.log('Delete Image Sukses'))
            var sql2 = `select * from kategori;`
            db.query(sql2, (err, result2) => {
                if (err) throw (err)
                res.send(result2)
            })
        })
    },
    addSubkat:(req,res)=>{
        if(req.validation) throw req.validation
            if(req.file.size>6000000) throw {error:true,msg:'Image too large'}
             var newData=JSON.parse(req.body.data) // id kategori dan 
            newData.image=req.file.destination.split('/')[1]+'/'+req.file.destination.split('/')[2]+'/'+req.file.filename
            console.log(newData)
            var sql=`insert into subkategori set ?`
            db.query(sql,newData,(err,result)=>{
                if(err) throw (err)
                var sql2 = `select * from kategori;`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    res.send(result2)
                })
        })
    },
    editSubkat:(req,res)=>{
        console.log('Edit Subkategori')
        var id=req.params.id

        var sql0= `select * from subkategori where id=${id}`
        db.query(sql0,(err,result0)=>{
            try{
                if(err) throw err.message
                var path=result0[0].image
                console.log(path)
                
                var sql = `update subkategori set ? where id=${id}`
                var newData=JSON.parse(req.body.data)
                if (req.file){
                    newData.image=req.file.destination.split('/')[1]+'/'+req.file.destination.split('/')[2]+'/'+req.file.filename
                }
                
                console.log(newData)

                db.query(sql, newData, (err, result) => {
                    try {
                        if (err) throw err.message
                        if(path){
                            fs.unlink(path,(err,data2)=>console.log('Menghapus Image Lama Sukses')) 
                        }
                        var sql2 = `select * from subkategori;`
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
    deleteSubkat:(req,res)=>{
        var id=req.params.id
        var path=req.body.image

        var sql=`delete from subkategori where id=${id};`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            fs.unlink(path,(err,data)=>console.log('Delete Image Sukses'))
            var sql2 = `select * from subkategori;`
            db.query(sql2, (err, result2) => {
                if (err) throw (err)
                res.send(result2)
            })
        })
    }
}