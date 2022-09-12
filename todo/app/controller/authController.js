const model = require('../model/postModel')
const storage = require('../helper/upload')


module.exports= {
    
    //login controller
    login:function(req,res){
        res.render('login')
    },

    //register controller
    register:function(req,res){
        res.render('register')
    },

    //post controller
    posts:function(req,res){
         res.render('posts')
    },
    //fetchpost controller
    fetchPost:async function(req,res){
       
        let search = null
        var startindex = 0
        var indexn = 1
        var setLimit = 3
        if(req.query.page){
            startindex = (req.query.page - 1) * 3 
            indexn = parseInt(req.query.page)
        }
       
        let input = {
            start:startindex ,
            end:setLimit
        }
        if(req.query.search!=null){
           
            input = { ...input,search:req.query.search}
            search = req.query.search
        }
       
      
        let data = new Promise(function(resolve){
            model.show(input,function(data){
                resolve(data)
            })
        });

        let limit = new Promise(function(resolve) {
                model.limit(search,function(data){
                    resolve(data)
                })
        });
      
        res.json({
            data:await data,
            limit:await limit,
            index:indexn
        })
    },
    //post create controller
    postCreate:function(req,res){
        res.render('postCreate')
    },
    //post store controller
    postStore:function(req,res){
        
        storage.upload(req,res,function(err) {
            if(err) throw err   
           
            const inputData = {
                title:req.body.title,
                des:req.body.des,
                image:req.file.originalname
            }
            model.store(inputData,function(data){
                res.json({
                    data:'success'
                })
            })
        })

       
       
        
           
           
        
        
    },

    //post edit controller
    postEdit:function(req,res){
        const inputData = {
            id:req.params.id
        }
        if(inputData.name == ''){
            console.log('Pleace enter field!')
        }else{
            model.edit(inputData,function(data){
                res.render('postEdit',{data:data})
            })
        } 
    },

    //post delete controller
    postDelete:function(req,res){
        const inputData = {
            id:req.body.id
        }
       
        if(inputData.name == ''){
           res.json({
             msg:"please select propoer id"
           })
        }else{
            model.delete(inputData,function(data){
                res.json({
                    msg:"Post Delete Successfully"
                })
            })
        }
        
    },

       //update data controller
        postUpdate:function(req,res){
            storage.upload(req,res,function(err) {
                if(err) throw err 
                let inputData = {}  
                inputData = { ...inputData,name:'bad' }
               if(req.file!=null){
                inputData = {
                    ...inputData,
                    post:{
                        title:req.body.title,
                        des:req.body.des,
                        image:req.file.originalname
                    },
                    id:req.params.id
                  }
                
               }else{
                inputData = {
                    ...inputData,
                    post:{
                        title:req.body.title,
                        des:req.body.des,
                    },
                    id:req.params.id
                  }
               } 

               model.update(inputData,function(data){
                res.redirect('/posts')
              })
            })
            
        },

        //single post
        find: async function(req,res){
             const input = {
                 id:req.params.id
             }
            // let post = new Promise(function(resolve) {
            //         model.find(input,function(data){
            //             resolve(data)
            //         })
            // });

            // let chat = new Promise(function(resolve) {
            //         model.comment(input,function(data){
            //             resolve(data)
            //         })
            // });
           // res.render('post',{data:await post,chat:await chat})
                    model.find(input,function(data){
                        res.render('post',{data:data})
                    })
            
        },
        // get comment
        findComment: function(req,res){
             const input = {
                 id:req.params.id
             }
        
            model.findComment(input,function(data){
                
                res.json({
                    chat:data,
                    postId:input.id,
                })
            })
            
            
        },

        //post comment
        postComment:function(req,res){
            const input = {
                content:req.body.content,
                name:req.body.name,
                postId: req.body.postId,
                responseTo:req.body.responseTo ,
            }
            model.postComment(input,function(data){
                res.json({
                    data:'success'
                })
            })
        }


   
}