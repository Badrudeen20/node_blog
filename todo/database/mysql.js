const express = require('express')
const mysql = require('mysql')
const connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs',
    multipleStatements:true
})

connect.connect(function(err){
     if(err) throw err
     console.log('Mysql in Connected')
})

module.exports = connect