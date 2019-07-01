var db = require('./../database')
const transporter = require('./../helpers/nodemailer')
var fs = require('fs');
var hbrs = require('handlebars')
const pdf=require('html-pdf')

module.exports={
    getAllTransaction:(req,res)=>{
        var sql=`select * from transaction order by id desc`
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
        var sql=`select * from transaction where status=0 order by id desc`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getOnProcess:(req,res)=>{
        var sql=`select * from transaction where status=1 order by id desc`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getPaymentAccept:(req,res)=>{
        var sql=`select * from transaction where status=2 order by id desc`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getPaymentReject:(req,res)=>{
        var sql=`select * from transaction where status=3 order by id desc`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getonDelivery:(req,res)=>{
        var sql=`select * from transaction where status=4 order by id desc`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    },
    getDelivered:(req,res)=>{
        var sql=`select * from transaction where status=5 order by id desc`
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
            //res.send(result)
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
                newDetail.push(`('${newTrans.ordernumber}',${result[i].idproduk},${result[i].qty})`)
            }
            console.log(newDetail.join(','))
            var sql2=`insert into transaction set ?`
            console.log(sql2)
            db.query(sql2,newTrans,(err2,result2)=>{
                if (err2) throw err2
                //res.send(result2)
                var sql3=`insert into transactiondetail (ordernumber,idproduk,qty) values ${newDetail}`
                console.log(sql3)
                db.query(sql3,(err,result)=>{
                    if(err) throw err
                    //res.send(result)
                    var sql5=`delete from cart where username='${user}'`
                    db.query(sql5,(err,result)=>{
                        if(err) throw err
                        var sql4=`SELECT * FROM transactiondetail 
                        join transaction on transactiondetail.ordernumber = transaction.ordernumber 
                        where transaction.ordernumber='${newTrans.ordernumber}';`
                        db.query(sql4,(err,result)=>{
                            if(err)throw err
                            res.send(result)
                        })
                    })
                    
                })
            })
            
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
    
    getDetailTransaction:(req,res)=>{
        var ordernumber=req.query.ordernumber
        var sql=`SELECT ordernumber,nama,harga,namasubkat,product.image,qty,harga*qty as subtotal FROM minamotoys.transactiondetail 
        join product on transactiondetail.idproduk = product.id
        join subkategori on idsubkat=subkategori.id where ordernumber='${ordernumber}';`  
        db.query(sql,(err,result)=>{
            if(err) throw err
            res.send(result)
        })  
    },
    uploadTransaction:(req,res)=>{
        var ordernumber=req.query.ordernumber
        console.log('order number: '+ordernumber)
        var sql0= `select * from transaction where ordernumber='${ordernumber}'`
        db.query(sql0,(err,result0)=>{
            // try{
                if(err) throw err.message
                //var path=result0[0].image
                //console.log(path)
                
                var sql = `update transaction set ? where ordernumber='${ordernumber}'`
                //var newData=JSON.parse(req.body.data)
                var newData={
                    status:1,
                    note:'On Process'
                }
                if (req.file){
                    newData.image=req.file.destination.split('/')[1]+'/'+req.file.destination.split('/')[2]+'/'+req.file.filename
                }
                
                console.log(newData)

                db.query(sql, newData, (err, result) => {
                    try {
                        if (err) throw err.message
                        // if(req.file){
                        //     fs.unlink(path,(err,data2)=>console.log('Menghapus Image Lama Sukses')) 
                        // }
                        var sql2 = `select * from transaction where ordernumber='${ordernumber}' order by id desc;`
                        db.query(sql2, (err, result2) => {
                            if (err) throw (err)
                            res.send(result2)
                        })
                    } catch (err) {
                        res.send(err)
                    }
                })
                

            // } catch (err) {
            //     res.send(err.message)
            // }
        })
    },
    acceptPayment:(req,res)=>{
        var ordernumber=req.query.ordernumber
        var sql = `update transaction set ? where ordernumber='${ordernumber}'`
        var newData={
            status:2,
            note:'Payment Accepted'
        }
        db.query(sql, newData, (err, result) => {
            try {
                if (err) throw err.message
                var sql2 = `select * from transaction where ordernumber='${ordernumber}' order by id desc;`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    res.send(result2)
                })
            } catch (err) {
                res.send(err)
            }
        })
    },
    rejectPayment:(req,res)=>{
        var ordernumber=req.query.ordernumber
        var note=req.body.note
        var sql0= `select * from transaction where ordernumber='${ordernumber}'`
        db.query(sql0,(err,result0)=>{
            if(err) throw err.message
            var path=null
            if(result0[0].image !=null){
                var path=result0[0].image
            }
            
            var sql = `update transaction set ? where ordernumber='${ordernumber}'`
            if(note=='Rejected: Bukti Pembayaran tidak jelas' && path!=null){
                fs.unlink(path,(err,data2)=>console.log('Menghapus Image Lama Sukses'))
                var newData={
                    status:3,
                    note:note,
                    image:null
                }
            } else{
                var newData={
                    status:3,
                    note:note,
                }
            }
            
            db.query(sql, newData, (err, result) => {
                // try {
                    if (err) throw err.message
                    var sql2 = `select * from transaction where ordernumber='${ordernumber}';`
                    db.query(sql2, (err, result2) => {
                        if (err) throw (err)
                        console.log(result2)
                        res.send(result2)
                    })
                // } catch (err) {
                //     res.send(err)
                // }
            })
        })

        
    },
    onDelivery:(req,res)=>{
        var ordernumber=req.query.ordernumber
        var resi=req.body.resi
        var sql = `update transaction set ? where ordernumber='${ordernumber}'`
        var newData={
            status:4,
            note:'On Delivery',
            resi:resi
        }
        db.query(sql, newData, (err, result) => {
                if (err) throw err.message
                var sql2 = `select * from transaction where ordernumber='${ordernumber}';`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    console.log(result2)
                    res.send(result2)
                })
        })
    },
    delivered:(req,res)=>{
        var ordernumber=req.query.ordernumber
        var sql = `update transaction set ? where ordernumber='${ordernumber}'`
        var newData={
            status:5,
            note:'Delivered',
        }
        db.query(sql, newData, (err, result) => {
                if (err) throw err.message
                var sql2 = `select * from transaction where ordernumber='${ordernumber}';`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    console.log(result2)
                    res.send(result2)
                })
        })
    },
    checkAlamat:(req,res)=>{
        var sql=`SELECT nama FROM users_detail
        join users on users_detail.username = users.username
        where users.username='${req.query.username}';`
        db.query(sql,(err,result)=>{
            if(err) throw err
            console.log(result)
            //res.send(typeof(result[0])=='undefined')
            if(typeof(result[0])=='undefined'){
                res.send('Silahkan lengkapi data diri terlebih dahulu')
            } else {
                res.send('Verifikasi data diri sukses')
            }
        })
    },
    sendInvoice:(req,res)=>{
        fs.readFile('./template/invoice.html',{encoding:'utf-8'},(err,hasilRead)=>{
            if(err) throw err
            //console.log(hasilRead)
            var template=hbrs.compile(hasilRead)
            var dataInvoice={}
            var today=new Date()
            var dd=(today.getDate())
            var mm=(today.getMonth() + 1)
            var yyyy = today.getFullYear();
            var email=''
            var sql=`SELECT * FROM users_detail
            join users on users_detail.username = users.username
            where users.username='${req.body.username}';`
            db.query(sql,(err,result)=>{
                if(err) throw err
                dataInvoice={...dataInvoice,
                    tglnow:dd+'-'+mm+'-'+yyyy,
                    nama:result[0].nama,
                    alamat:result[0].alamat,
                    kota:result[0].kota,
                    provinsi:result[0].provinsi,
                    phone:result[0].phone
                }
                email=result[0].email
                
                var sql2 =`SELECT * from transaction where ordernumber='${req.body.ordernumber}';`
                db.query(sql2,(err,result2)=>{
                    if (err) throw err
                    dataInvoice={...dataInvoice,
                        ordernumber:result2[0].ordernumber,
                        tglcheckout:result2[0].tglcheckout,
                        resi:result2[0].resi
                    }
                    var sql3=`SELECT ordernumber,nama,harga,namasubkat,product.image,qty,harga*qty as subtotal  FROM minamotoys.transactiondetail 
                    join product on transactiondetail.idproduk = product.id
                    join subkategori on idsubkat=subkategori.id where ordernumber = '${req.body.ordernumber}';`
                    db.query(sql3,(err,result3)=>{
                        var total=0
                        var detailtrans=result3
                        for(i=0;i<result3.length;i++){
                            total+=result3[i].harga*result3[i].qty
                        }
                        console.log(total)
                        dataInvoice={...dataInvoice,
                            detailtrans:detailtrans,
                            producttotal:total,
                            total:total+21000
                        }
                        var hasilHbrs=template(dataInvoice)
                        //res.send(hasilHbrs)
                        var options={
                            format:'A4',
                            orientation:'portrait',
                            top:"0.5in",
                            bottom:"0.5in",
                            left:"0.5in",
                            right:"0.5in"
                        }
                        console.log(dataInvoice)
                        res.send(dataInvoice)
                        pdf.create(hasilHbrs,options).toStream((err,hasilStream)=>{
                            if(err) throw err
                            var optionsNodemailer={
                                from:'Minamo Toys and Hobbies',
                                to:email,
                                subject:'Invoice untuk '+dataInvoice.nama,
                                html:`<h1>Hi, ${dataInvoice.nama}</h1>
                                    <h1>Thank you for Shopping with Minamo Toys</h1>
                                    <div style="border:1px solid black>
                                        <div>
                                            <p style="text-transform:uppercase;><b>Order ${req.body.ordernumber} - Payment Processed</b></p>
                                            <hr/>
                                            <p>Your payment order ${req.body.ordernumber} was succesfully processed</p>
                                        </div>
                                    </div>`,
                                attachments:[
                                    {
                                        filename:'invoice.pdf',
                                        content:hasilStream
                                    }
                                ]
                            }
                            transporter.sendMail(optionsNodemailer,(err,resultsMail)=>{
                                if(err) throw err
                                console.log(resultsMail)
                                res.send('Email Sent')
                            })
                        })
                    })
                    
                })
            })
            
            
            
        })
    }

}