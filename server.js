const express = require('express')
const request = require('request')
const key = require('./key.js')


const API_KEY = key.getKey()
const PORT = 3000;

var app = express()

app.get('/', (req,res) => {
    res.send("Hello World")
})

app.get('/league/:leagueId', (req, res) => {
    var leagueId = req.params.leagueId;
    console.log(leagueId);

    res.send(leagueId)
})

app.get('/match/:leagueId/:date', (req, res) => {
    var leagueId = req.params.leagueId
    var date = req.params.date
    
    let options = { url: "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/"+ leagueId + "/" + date, headers: {'X-RapidAPI-Key':  API_KEY} };

    
    request(options,(err,response,body) => {

        let matches = JSON.parse(body);
        //let imgHint = matches['indice'];
        //singularImage = singularImage['nomImg'];

        res.send(body)      
        
    });
})

app.listen(PORT, () => {
    console.log("Server stared at port => " + PORT)
})