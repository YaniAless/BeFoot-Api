const express = require('express')
const request = require('request')

var app = express()

app.get('/', (req,res) => {
    res.send("Hello World")
})

app.listen(3000)