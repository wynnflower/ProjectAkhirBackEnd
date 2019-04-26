const db=require('../database')

module.exports={
    getAllCart:(req,res)=>{
        var sql=`select cart.id,product.id,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as harga,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id
        join cart on product.id = cart.idproduk;`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getCartByUser:(req,res)=>{
        var user=req.query.username
        var sql=`select cart.id,product.id,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as harga,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id
        join cart on product.id = cart.idproduk where username='${user}';`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    },
    getCartDetail:(req,res)=>{
        var id=req.params.id
        var sql=`select cart.id,product.id,nama,harga,kategori,namasubkat,diskon,deskripsi,product.image,(harga-(harga*diskon/100)) as harga,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id
        join cart on product.id = cart.idproduk where cart.id=${id};`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
        })
    }
}
