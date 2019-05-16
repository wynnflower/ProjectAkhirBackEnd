var express = require('express')
var bodyParser = require('body-parser')
var app = express()
//var mysql = require('mysql')
var cors = require('cors')


app.use(cors())
app.use(bodyParser.json());

const port = 4000
const {todoRouter,userRouter,productRouter,cartRouter,kategoriRouter,transactionRouter}=require('./router')

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '1234',
//     database: 'to_do'
// })
// const db = mysql.createConnection({
//     host: 'www.db4free.net',
//     user: 'wynnflower',
//     password: '12345678',
//     database: 'todolatihanmk2'
// })

app.listen(port, () => {
    console.log('aktif di port ' + port)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

//app.use('/todo',todoRouter)
//app.use('/user',userRouter)

//Untuk membuat folder bisa diakses secara public
app.use('/uploads',express.static('uploads'))

app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/kategori',kategoriRouter)
app.use('/user',userRouter)
app.use('/transaction',transactionRouter)

// app.get('/nama/:id', (req, res) => {
//     var nama = req.params.id
//     res.send('nama saya ' + nama)
// })

// app.get('/product', (req, res) => {
//     var nama = req.query.nama
//     res.send('produk ' + nama)
// })

// app.get('/alluser', (req, res) => {
//     var sql = 'select * from users;'
//     db.query(sql, (err, result) => {
//         res.send(result)
//     })
// })

// app.get('/user/:id', (req, res) => {
//     var id = req.params.id
//     var sql = `select * from users where id=${id};`
//     db.query(sql, (err, result) => {
//         res.send(result)
//     })
// })

// app.post('/addtodo', (req, res) => {
//     //req.body buat ambil data dari front end
//     //post -> body (none -> raw) -> (text -> JSON (application/json))
//     console.log(req.body)
//     var user = req.body.id_user;
//     var todo = req.body.to_do;

//     var sql = `insert into to_do (id_user,to_do) values (${user},'${todo}');`

//     db.query(sql, (err, result) => {
//         try {
//             if (err) {
//                 throw err
//             }
//             res.send('Add To Do Success')
//         } catch (err) {
//             res.send(err)
//         }

//     })
// })

// app.post('/adduser', (req, res) => {
//     var data = req.body
//     var sql = `insert into users set?`
//     db.query(sql, data, (err, result) => {
//         try {
//             if (err) throw err
//             var sql2 = `select to_do.id, username, to_do from to_do
//             join users on id_user = users.id;`
//             db.query(sql2, (err, result2) => {
//             if (err) throw (err)
//             res.send('Add User Sukses')
//         })
//         }catch(err){
//             res.send('Username sudah terpakai')
//         }
        
//         //res.send('Add User Sukses')
//     })
// })

// app.put('/edituser/:id', (req, res) => {
//     var id = req.params.id
//     var data = req.body
//     var sql = `update users set ? where id=${id}`
//     db.query(sql, data, (err, result) => {
//         if (err) throw err
//         var sql2 = `select to_do.id, username, to_do from to_do
//         join users on id_user = users.id;`
//         db.query(sql2, (err, result2) => {
//             if (err) throw (err)
//             res.send(result2)
//         })
//     })
// })

// app.delete('/deluser/:id', (req, res) => {
//     var id = req.params.id
//     var sql = `delete from users where id=${id}`
//     db.query(sql, (err, result) => {
//         try {
//             if (err) throw err
//             var sql2 = `select to_do.id, username, to_do from to_do
//         join users on id_user = users.id;`
//             db.query(sql2, (err, result2) => {
//                 if (err) throw (err)
//                 res.send(result2)
//             })
//             // res.send('Delete User Sukses')
//         } catch (err) {
//             res.send(err)
//         }

//     })
// })

// app.put('/edittodo/:id', (req, res) => {
//     var id = req.params.id
//     var data = req.body
//     var sql = `update to_do set ? where id=${id}`
//     db.query(sql, data, (err, result) => {
//         try {
//             if (err) throw err.message
//             var sql2 = `select to_do.id, username, to_do from to_do
//         join users on id_user = users.id;`
//             db.query(sql2, (err, result2) => {
//                 if (err) throw (err)
//                 res.send(result2)
//             })
//         } catch (err) {
//             res.send(err)
//         }
//     })
// })

// app.delete('/deltodo/:id', (req, res) => {
//     var id = req.params.id
//     var sql = `delete from to_do where id=${id}`
//     db.query(sql, (err, result) => {
//         try {
//             if (err) throw err
//             var sql2 = `select to_do.id, username, to_do from to_do
//         join users on id_user = users.id;`
//             db.query(sql2, (err, result2) => {
//                 if (err) throw (err)
//                 res.send(result2)
//             })
//         } catch {
//             res.send(err)
//         }

//     })
// })

// app.get('/alltodo', (req, res) => {
//     var sql = `select to_do.id, username, to_do from to_do
//     join users on id_user = users.id;`
//     db.query(sql, (err, result) => {
//         if (err) throw err
//         res.send(result)
//     })
// })