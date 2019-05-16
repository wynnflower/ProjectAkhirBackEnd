var db = require('./../database')
const transporter = require('./../helpers/nodemailer')

module.exports={
    getAllTransaction:(req,res)=>{
        var sql=`select * from transaction`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getTransactionByUser:(req,res)=>{
        var username=req.query.username
        var sql=`select * from transaction where username='${username}'`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getWaitPayment:(req,res)=>{
        var sql=`select * from transaction where status=0`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getOnProcess:(req,res)=>{
        var sql=`select * from transaction where status=1`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getPaymentAccept:(req,res)=>{
        var sql=`select * from transaction where status=2`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getPaymentReject:(req,res)=>{
        var sql=`select * from transaction where status=3`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getonDelivery:(req,res)=>{
        var sql=`select * from transaction where status=4`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getDelivered:(req,res)=>{
        var sql=`select * from transaction where status=5`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    checkout:(req,res)=>{
        var user=req.query.username
        var sql=`select cart.username,cart.id,product.id as idproduk,nama,harga,kategori,diskon,product.image,(harga-(harga*diskon/100)) as hargadiskon,  qty ,(harga-(harga*diskon/100))*qty as subtotal from product
        join subkategori on idsubkat = subkategori.id
        join kategori on idkat=kategori.id
        join cart on product.id = cart.idproduk where cart.username='${user}';`
        db.query(sql,(err,result)=>{
            if(err) throw (err)
            res.send(result)
            var today=new Date()
            var dd=(today.getDate())
            var mm=(today.getMonth() + 1)
            var yyyy = today.getFullYear();
            var newTrans={
                ordernumber:result[0].username.toUpperCase()+Date.now(),
                username:result[0].username,
                tglcheckout:dd+'-'+mm+'-'+yyyy,
                status:0,
                note:'Waiting for Payment'
            }
            console.log(newTrans)
            var newDetail=[]
            for(i=0;i<result.length;i++){
                newDetail.push(`(${newTrans.ordernumber},${result[i].idproduk},${result[i].qty})`)
            }
            console.log(newDetail.join(','))
        })
        // var data = req.body
        // var sql=`insert into transaction set ?`
        // db.query(sql,data,(err,result)=>{
        //     if(err) throw err
        //     var sql=`select * from transaction where username='${data.username}'`
        //     db.query(sql,data,(err,result)=>{
        //         if(err) throw err
        //         res.send(result)
        //     })
        // })
    },
    checkoutDetail:(req,res)=>{
        var data=req.body
        var sql='insert into transactiondetail set ?'
        db.query(sql,data,(err,result)=>{
            if(err) throw err
            var sql=`select * from transaction where username='${data.username}'`
            db.query(sql,data,(err,result)=>{
                if(err) throw err
                res.send(result)
            })
        })

    },
    acceptTrans:(req,res)=>{

    },
    rejectTrans:(req,res)=>{

    },
    getDetailTransaction:(req,res)=>{

    }
}