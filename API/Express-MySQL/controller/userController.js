var db = require('./../database')
const crypto = require('crypto')
const verify = require('./../helpers/emailer/verify')
const transporter = require('./../helpers/nodemailer')

module.exports={
    getAllUsers: (req, res) => {
        var sql = 'select * from users;'
        db.query(sql, (err, result) => {
            res.send(result)
        })
    },
    getUserByUsername: (req,res)=>{
        var username=req.query.username
        var sql ='select * from users where username=?'
        db.query(sql,username,(err,result)=>{
            res.send(result)
        })
    },
    getUserById: (req, res) => {
        var id = req.params.id
        var sql = `select * from users where id=${id};`
        db.query(sql, (err, result) => {
            res.send(result)
        })
    },
    register:(req, res) => {
        var data = req.body
        var username = req.body.username
        var sql = `select * from users where username='${username}'`
        db.query(sql,data,(err,result0)=>{
            if(err)throw err
            if(result0.length>0){
                res.send('Username sudah terpakai')
            } else{
                var hashPassword=crypto.createHmac('sha256','rahasia1')
                                .update(data.password).digest('hex')
                //data.password=hashPassword // sama kayak bawah
                var kode=''
                for(var i=0;i<6;i++){
                    kode +=Math.floor(Math.random()*10)
                }
                data={...data,password:hashPassword,kode:kode,verified:'false',role:'user'}
                var sql = `insert into users set?`
                db.query(sql, data, (err, result) => {
                    try {
                        if (err) throw err
                        var mailOptions=verify(data.username,data.password,data.email,data.kode)
                        transporter.sendMail(mailOptions,(err,res2)=>{
                            if(err) throw err
                            res.send('Register Sukses, please check your email to verify')
                            console.log('Email Masuk')
                            //res2.send ('Email Berhasil dikirim')
                        })
                        var sql2 = `select * from users;`
                        db.query(sql2, (err, result2) => {
                        if (err) throw (err)
                        res.send('Add User Sukses')
                    })
                    }catch(err){
                        res.send(err)
                    }
                })
            }
        })
        
    },
    verify:(req,res)=>{
        var data=req.body
        var sql=`select * from users where username='${data.username}' AND password ='${data.password}' AND kode='${data.kode}';`
        db.query(sql,(err,result)=>{
            try{
                if(err) throw {error:true,msg:'Kode salah'}
                data={...data,verified:'true'}
                var sql2=`update users set ? where username='${data.username}'`
                db.query(sql2,data,(err,result)=>{
                    if(err) throw {error:true,msg:'Error in Database'}
                    res.send('Verifikasi Sukses')
                })
            } catch(err){
                res.send(err)
            }
        })
    },
    login:(req,res)=>{
        //Password di Hash
        //Check Username dan Password
        //Kalo Username dan Password sesuai, get column verified
        //Kalo Verified = true, get all data dan kasih ke front end
        var username=req.query.username
        var password=req.query.password
        hashPassword=crypto.createHmac('sha256','rahasia1')
                    .update(password).digest('hex')
        console.log(hashPassword)
        var sql=`select verified from users where username='${username}' AND password='${hashPassword}';`
        console.log(sql)
        db.query(sql,(err,result)=>{
            if(err) throw(err)
            if(result==false){
                res.send('Username / Password invalid')
            } else{
                if(result[0].verified=='false'){
                    res.send('Please Verify your Email')
                } else{
                    var sql=`select * from users where username ='${username}'`
                    db.query(sql,(err,result)=>{
                        if (err) throw(err)
                        res.send(result)
                    })
                }
            }
        })
    },
    loginCart:(req,res)=>{
        //Password di Hash
        //Check Username dan Password
        //Kalo Username dan Password sesuai, get column verified
        //Kalo Verified = true, get all data dan kasih ke front end
        var username=req.query.username
        var password=req.query.password
        hashPassword=crypto.createHmac('sha256','rahasia1')
                    .update(password).digest('hex')
        var sql=`select verified from users where username='${username}' AND password='${hashPassword}';`
        //console.log(sql)
        db.query(sql,(err,result)=>{
            if(err) throw(err)
            if(result==false){
                res.send('Username / Password invalid')
            } else{
                if(result[0].verified=='false'){
                    res.send('Please Verify your Email')
                } else{
                    var sql=`select users.id,users.username,password,role,verified,count(idproduk) as cartitems from users
                    left join cart on cart.username=users.username where users.username='${username}';`
                    db.query(sql,(err,result)=>{
                        if (err) throw(err)
                        res.send(result)
                    })
                }
            }
        })
    },
    keepLogin:(req,res)=>{
        //Password di Hash
        //Check Username dan Password
        //Kalo Username dan Password sesuai, get column verified
        //Kalo Verified = true, get all data dan kasih ke front end
        var username=req.query.username
        var sql=`select verified from users where username='${username}';`
        //console.log(sql)
        db.query(sql,(err,result)=>{
            if(err) throw(err)
            if(result==false){
                res.send('Username / Password invalid')
            } else{
                if(result[0].verified=='false'){
                    res.send('Please Verify your Email')
                } else{
                    var sql=`select * from users where username ='${username}'`
                    db.query(sql,(err,result)=>{
                        if (err) throw(err)
                        res.send(result)
                    })
                }
            }
        })
    },
    keepLoginCart:(req,res)=>{
        //Password di Hash
        //Check Username dan Password
        //Kalo Username dan Password sesuai, get column verified
        //Kalo Verified = true, get all data dan kasih ke front end
        var username=req.query.username
        var sql=`select verified from users where username='${username}';`
        //console.log(sql)
        db.query(sql,(err,result)=>{
            if(err) throw(err)
            if(result==false){
                res.send('Username / Password invalid')
            } else{
                if(result[0].verified=='false'){
                    res.send('Please Verify your Email')
                } else{
                    var sql=`select users.id,users.username,password,role,verified,count(idproduk) as cartitems from users
                    left join cart on cart.username=users.username where users.username='${username}';`
                    db.query(sql,(err,result)=>{
                        if (err) throw(err)
                        res.send(result)
                    })
                }
            }
        })
    },
    checkUsername:(req,res)=>{
        //var data = req.body
        var username = req.query.username
        var sql = `select * from users where username='${username}'`
        db.query(sql,(err,result0)=>{
            if(err) throw err
            res.send(result0)
        })
    },
    register2:(req,res)=>{
        var data = req.body
        var username=req.body.username
        var hashPassword=crypto.createHmac('sha256','rahasia1')
        .update(data.password).digest('hex')
        //data.password=hashPassword // sama kayak bawah
        var kode=''
        for(var i=0;i<6;i++){
            kode +=Math.floor(Math.random()*10)
        }
        data={...data,password:hashPassword,kode:kode,verified:'false',role:'user'}
        var sql = `insert into users set?`
        db.query(sql, data, (err, result) => {
            try {
                if (err) throw err
                var mailOptions=verify(data.username,data.password,data.email,data.kode)
                transporter.sendMail(mailOptions,(err,res2)=>{
                    if(err) throw err
                    res.send('Register Sukses, please check your email to verify')
                    console.log('Email Masuk')
                //res2.send ('Email Berhasil dikirim')
                })
                var sql2 = `select users.id,users.username,password,role,verified,count(idproduk) as cartitems from users
                left join cart on cart.username=users.username where users.username='${username}';`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    res.send(result2)
                })
            }catch(err){
                res.send(err)
            }
        })
    },
    getUserDetail:(req,res)=>{
        var sql=`select * from users_detail where username='${req.query.username}'`
        db.query(sql,(err,result)=>{
            if(err)throw err
            // res.send(result)
            if(result.length>0){
                res.send(result)
            } else{
                
                var username=req.query.username
                var newData={username:username}
                var sql2=`insert into users_detail set?`
                db.query(sql2,newData,(err,result2)=>{
                    if (err) throw err
                    var sql3=`select * from users_detail where username='${req.query.username}'`
                    db.query(sql3,(err,result3)=>{
                        if(err) throw err
                        res.send(result3)
                    })
                })
            }
        })
    },
    editUserDetail:(req,res)=>{
        var data=req.body
        var sql=`select * from users_detail where username='${req.query.username}'`
        db.query(sql,(err,result)=>{
            if(err)throw err
            var sql2=`update users_detail set ? where username='${req.query.username}'`
            db.query(sql2,data,(err,result2)=>{
                if(err) throw err
                var sql3=`select * from users_detail where username='${req.query.username}'`
                db.query(sql3,(err,result3)=>{
                    if(err) throw err
                    res.send(result3)
                })
            })
        })
    }
}