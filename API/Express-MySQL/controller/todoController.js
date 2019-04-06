const db=require('./../database')

module.exports={
    addTodo:(req, res) => {
        console.log(req.body)
        var user = req.body.id_user;
        var todo = req.body.to_do;
        var sql = `insert into to_do (id_user,to_do) values (${user},'${todo}');`
        db.query(sql, (err, result) => {
            try {
                if (err) {
                    throw err
                }
                var sql2 = `select to_do.id, username, to_do from to_do
            join users on id_user = users.id;`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    res.send(result2)
                })
            } catch (err) {
                res.send(err)
            }
    
        })
    },
    editTodoById:(req, res) => {
        var id = req.params.id
        var data = req.body
        var sql = `update to_do set ? where id=${id}`
        db.query(sql, data, (err, result) => {
            try {
                if (err) throw err.message
                var sql2 = `select to_do.id, username, to_do from to_do
            join users on id_user = users.id;`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    res.send(result2)
                })
            } catch (err) {
                res.send(err)
            }
        })
    },
    deleteTodo: (req, res) => {
        var id = req.params.id
        var sql = `delete from to_do where id=${id}`
        db.query(sql, (err, result) => {
            try {
                if (err) throw err
                var sql2 = `select to_do.id, username, to_do from to_do
            join users on id_user = users.id;`
                db.query(sql2, (err, result2) => {
                    if (err) throw (err)
                    res.send(result2)
                })
            } catch {
                res.send(err)
            }
    
        })
    },
    getAllTodo:(req, res) => {
        var sql = `select to_do.id, username, to_do from to_do
        join users on id_user = users.id;`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.send(result)
        })
    }
}