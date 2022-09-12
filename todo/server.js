const express = require('express')
const port = 3000
const app = express()
const bodyParser = require('body-parser')
const web = require('./routes/web')
const path = require('path')
app.listen(port,()=>{
    console.log('server is start')
})
app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'resource')))
app.use(express.static(path.join(__dirname, 'storage')))


app.set('views',path.join(__dirname,'./resource/view'))
app.set('view engine','ejs')
app.use(web.posts)
