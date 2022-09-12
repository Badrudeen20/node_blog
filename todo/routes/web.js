const express = require('express')
const authController = require('../app/controller/authController')
const router = express.Router()


module.exports = {
    login:router.get('/login',authController.login),
    register:router.get('/register',authController.register),
    posts:router.get('/posts',authController.posts),
    fetchPost:router.post('/posts',authController.fetchPost),
    find:router.get('/post/:id', authController.find),
    findComment:router.get('/comment/:id', authController.findComment),
    postCreate:router.get('/create',authController.postCreate),
    postStote:router.post('/store',authController.postStore),
    postEdit:router.get('/edit/(:id)',authController.postEdit),
    postDelete:router.post('/delete',authController.postDelete),
    postUpdate:router.post('/update/(:id)',authController.postUpdate),
    postComment:router.post('/comment',authController.postComment)
   // crud:router.get('/index',authController.crud),,
    // add:router.post('/crud/add',authController.add),
    // delete:router.get('/crud/delete/(:id)',authController.delete),
    // edit:router.get('/crud/edit/(:id)',authController.edit),
    // update:router.post('/crud/update/(:id)',authController.update),
    
}