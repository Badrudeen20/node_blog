const db = require('../../database/mysql')
module.exports = {
    //store
    store:function(inputData,callback){
        var sql = "INSERT INTO post SET ?";
        db.query(sql,inputData,function(err,data,fields){
           if(!!err){
               console.log(err)
           }else{
               return callback(data);
           } 
        })
    },

     //show
     show:function(input,callback){
        
        var sql = ``;
        if(input.search){
            sql = `SELECT * FROM post WHERE title LIKE "%${input.search}%" LIMIT ${input.start},${input.end}`;
        }else{
            sql = `SELECT * FROM post  LIMIT ${input.start},${input.end}`;
        }
       
        db.query(sql,function(err,data,fields){
           if(err) throw err
           return callback(data);
        })
     },

     //limit
     limit:function(input,callback){
        let sql = ``;
        if(input!=null){
             sql = `SELECT count(id) as total FROM post WHERE title LIKE "%${input}%"`;
        }else{
            sql = `SELECT count(id) as total FROM post`;
        }
       
        db.query(sql,function(err,data,fields){
           if(err) throw err
           return callback(data);
        })
     },

     //delete
    delete:function(inputData,callback){
        var sql = "DELETE FROM post WHERE id= ?";
        db.query(sql,[inputData.id],function(err,data,fields){
           if(!!err){
               console.log(err)
           }else{
               return callback(data);
           }
          
        })
   },

    edit:function(inputData,callback){
        var sql = "SELECT * FROM post WHERE id= ?";
        db.query(sql,[inputData.id],function(err,data,fields){
            if(!!err){
                console.log(err)
            }else{
                return callback(data[0])
            }
        })
    },  

    update:function(inputData,callback){
        var sql = "UPDATE post SET ? WHERE id= ?"
        db.query(sql,[inputData.post,inputData.id],function(err,data,fields){
            if(!!err){
                console.log(err)
            }else{
                return callback(data)
            }
        })
    },
    find:function(input,callback){
         var sql = "SELECT * FROM post WHERE id= ?"
         db.query(sql,[input.id],function(err,data,fields){
            if(!!err) throw err
             return callback(data)
         })
    },
    findComment:function(input,callback){
         var sql = "SELECT * FROM comment WHERE postId= ?"
         db.query(sql,[input.id],function(err,data,fields){
            if(!!err) throw err
             return callback(data)
         })
    },
    postComment:function(input,callback){
        var sql = "INSERT INTO comment SET ?";
         db.query(sql,input,function(err,data,fields){
            if(!!err) throw err
             return callback(data)
         })
    },
   
}