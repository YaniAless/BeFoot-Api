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

// API call for the list of matches of one day and one league (params : leagueID, date YYYY-DD-MM)
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

//API call to get the standing of a league (param : leagueID)
app.get('/standing/:leagueId', (req, res) => {
    var leagueId = req.params.leagueId
    
    let options = { url: "https://api-football-v1.p.rapidapi.com/v2/leagueTable/"+ leagueId, headers: {'X-RapidAPI-Key':  API_KEY} };

    request(options,(err,response,body) => {

        let api = JSON.parse(body);
        let apiArray = api.api
        let standing = apiArray.standings
        let standingArray = standing[0]

        for(let i = 0; i < 19; i++)
        {
            let teamName = standingArray[i].teamName
            let logo = standingArray[i].logo
            let points = standingArray[i].points

            console.log(teamName) 
            res.send(teamName) 
        }

    });
})

//API call to get the goal scorers standing of a league (param : leagueID)
app.get('/topscorers/:leagueId', (req, res) => {
    var leagueId = req.params.leagueId
    
    let options = { url: "https://api-football-v1.p.rapidapi.com/v2/topscorers/"+ leagueId, headers: {'X-RapidAPI-Key':  API_KEY} };

    request(options,(err,response,body) => {

        let api = JSON.parse(body);
        let apiArray = api.api
        let topscorersArray = apiArray.topscorers

        for(let i = 0; i < 19; i++)
        {
            let player_name = topscorersArray[i].player_name
            let goalsObject = topscorersArray[i].goals
            let goals = goalsObject.total

            console.log(player_name + goals) 
            res.send(player_name + goals) 
        }
        
    });
})

app.listen(PORT, () => {
    console.log("Server stared at port => " + PORT)
})