const db=require('../database')

module.exports={
    getAllCart:(req,res)=>{
        var sql=`select cart.id,product.id as idproduk,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as harga,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
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
        var sql=`select cart.username,cart.id,product.id as idproduk,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as hargadiskon,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id
        join cart on product.id = cart.idproduk where cart.username='${user}';`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
            for(i=0;i<result.length;i++){
                console.log(result[i].nama)
            }
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
    },
    addtoCart:(req,res)=>{
        var data=req.body
        var sql=`select * from cart where idproduk=${data.idproduk} AND username='${data.username}'`
        db.query(sql,(err,result)=>{
            if(err) throw err
            if(result.length>0){
                data={...data, qty:result[0].qty+data.qty}
                var sql=`update cart set ? where idproduk=${data.idproduk}`
                db.query(sql,data,(err,result)=>{
                    if(err) throw (err)
                    //res.redirect('getusercart?username='+data.username)
                    var user=req.body.username
                    var sql=`select cart.username,cart.id,product.id as idproduk,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as hargadiskon,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
                    join subkategori on idsubkat = subkategori.id
                    join kategori on idkat=kategori.id
                    join cart on product.id = cart.idproduk where cart.username='${user}';`
                    db.query(sql,(err,result)=>{
                        if(err) throw (err)
                        res.send(result)
                    })
                }) 
            } else {
                var sql=`insert into cart set ?`
                db.query(sql,data,(err,result)=>{
                    if(err) throw (err)
                    //res.redirect('getusercart?username='+data.username)
                    var user=req.body.username
                    var sql=`select cart.username,cart.id,product.id as idproduk,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as hargadiskon,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
                    join subkategori on idsubkat = subkategori.id
                    join kategori on idkat=kategori.id
                    join cart on product.id = cart.idproduk where cart.username='${user}';`
                    db.query(sql,(err,result)=>{
                        if(err) throw (err)
                        res.send(result)
                    })
                }) 
            }
        })

        
    },
    editCart:(req,res)=>{
        var data=req.body
        var id=req.params.id
        var sql=`update cart set ? where cart.id=${id}`
        db.query(sql,data,(err,result)=>{
            if(err) throw (err)
            //res.redirect('../getusercart?username='+data.username)
            var user=req.body.username
            var sql=`select cart.username,cart.id,product.id as idproduk,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as hargadiskon,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
            join subkategori on idsubkat = subkategori.id
            join kategori on idkat=kategori.id
            join cart on product.id = cart.idproduk where cart.username='${user}';`
            db.query(sql,(err,result)=>{
                if(err) throw (err)
                res.send(result)
            })
        })
    },
    delCart:(req,res)=>{
        var id=req.query.id
        var user=req.query.username
        var sql=`delete from cart where cart.id=${id}`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            //res.redirect('getusercart?username='+username)
            var sql=`select cart.username,cart.id,product.id as idproduk,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as hargadiskon,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
            join subkategori on idsubkat = subkategori.id
            join kategori on idkat=kategori.id
            join cart on product.id = cart.idproduk where cart.username='${user}';`
            db.query(sql,(err,result)=>{
                if(err) throw (err)
                res.send(result)
            })
        })
    },
    getCartCount:(req,res)=>{
        var username=req.query.username
        var sql=`select users.id,users.username,password,role,verified,count(idproduk) as cartitems from users
        left join cart on cart.username=users.username where users.username='${username}';`
        db.query(sql,(err,result)=>{
            if (err) throw(err)
            res.send(result)
        })
    }
}
