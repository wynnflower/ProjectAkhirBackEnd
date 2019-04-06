const db=require('../database')

module.exports={
    getAllProduct:(req,res)=>{
        var sql = `select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id;`
        db.query(sql, (err, result) => {
            res.send(result)
        })
    },
    getViewProduct:(req,res)=>{
        var sql=`select product.id,nama,harga,diskon,product.image from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id;`
        db.query(sql,(err,result)=>{
            res.send(result)
        })
    },
    getAllKategori:(req,res)=>{
        var sql=`select * from kategori`
        db.query(sql,(err,result)=>{
            res.send(result)
        })
    },
    getAllSubkategori:(req,res)=>{
        var sql=`select kategori.id,kategori,namasubkat as Subkategori from kategori
        join subkategori on kategori.id = idkat;`
        db.query(sql,(err,result)=>{
            res.send(result)
        })
    },
    getAllCart:(req,res)=>{
        var sql=`SELECT cart.id,username,harga,diskon, (harga-(harga*diskon/100)) as harga,  qty ,
        (harga-(harga*diskon/100))*qty as subtotal,tglbeli FROM cart
        join product on idproduk=product.id;`
        db.query(sql,(err,result)=>{
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
            res.send(result)
        })
    },
    getproductbySubkategori:(req,res)=>{
        var subkat=req.query.namasubkat
        console.log(subkat)
        var sql=`select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id where namasubkat='${subkat}';`
        db.query(sql,(err,result)=>{
            res.send(result)
        })
    },
    getproductbyKategori:(req,res)=>{
        var kat=req.query.kategori
        //console.log(subkat)
        var sql=`select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id where kategori='${kat}';`
        db.query(sql,(err,result)=>{
            res.send(result)
        })
    },
    searchProduct:(req,res)=>{
        var search=req.query.nama
        console.log(search)
        var sql=`select product.id,nama,harga,kategori,namasubkat,diskon,product.image,deskripsi from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id where nama like '%${search}%';`
        db.query(sql,(err,result)=>{
            res.send(result)
        })
    }

}