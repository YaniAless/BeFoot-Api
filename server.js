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

        var api = JSON.parse(body);
        var apiArray = api.api
        var standing = apiArray.standings
        var standingArray = standing[0]

        for(var i = 0; i < 20; i++)
        {
            var teamRank = standingArray[i].rank
            var teamName = standingArray[i].teamName
            var teamLogo = standingArray[i].logo
            var teamPoints = standingArray[i].points
            var teamGoalDiff = standingArray[i].goalsDiff
            
            var team = JSON.stringify({teamRank, teamName, teamLogo, teamPoints, teamGoalDiff})
            console.log(team)
        }

    });
})

//API call to get the goal scorers standing of a league (param : leagueID)
app.get('/topscorers/:leagueId', (req, res) => {
    var leagueId = req.params.leagueId
    
    let options = { url: "https://api-football-v1.p.rapidapi.com/v2/topscorers/"+ leagueId, headers: {'X-RapidAPI-Key':  API_KEY} };

    request(options,(err,response,body) => {

        var api = JSON.parse(body);
        var apiArray = api.api
        var topscorersArray = apiArray.topscorers

        for(let i = 0; i < 20; i++)
        {
            var playerName = topscorersArray[i].player_name
            var goalsObject = topscorersArray[i].goals
            var goals = goalsObject.total
            var assists = goalsObject.assists
            var gamesObject = topscorersArray[i].games
            var nbGames = gamesObject.appearences

            var player = JSON.stringify({playerName, goals, assists, nbGames})
            var players = []
            console.log(player)
        }
        
    });
})

app.listen(PORT, () => {
    console.log("Server stared at port => " + PORT)
})