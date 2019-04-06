var db = require('./../database')

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
    addUser:(req, res) => {
        var data = req.body
        var sql = `insert into users set?`
        db.query(sql, data, (err, result) => {
            try {
                if (err) throw err
                var sql2 = `select to_do.id, username, to_do from to_do
                join users on id_user = users.id;`
                db.query(sql2, (err, result2) => {
                if (err) throw (err)
                res.send('Add User Sukses')
            })
            }catch(err){
                res.send('Username sudah terpakai')
            }
        })
    }
}