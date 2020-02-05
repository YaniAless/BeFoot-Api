const express = require('express')
const request = require('request')
const key = require('./key.js')


const API_KEY = key.getKey()
const PORT = 3000;

var app = express()

app.get('/', (req,res) => {
    res.send("Allez l'OM")
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

        var api = JSON.parse(body);
        var apiArray = api.api
        var fixturesArray = apiArray.fixtures
        var nbResults = apiArray.results
        var matches = {}
        matches.fixtures = []
        
        //var standings = []
        for(var i = 0; i <= nbResults; i++)
        {
            var matchDate = fixturesArray[i].event_date
            
            //Home Team
            var homeTeamObject = fixturesArray[i].homeTeam
            var homeTeamName = homeTeamObject.team_name
            var homeTeamLogo = homeTeamObject.logo
            var homeTeamScore = fixturesArray[i].goalsHomeTeam
            
            //Away Team
            var awayTeamObject = fixturesArray[i].awayTeam
            var awayTeamName = awayTeamObject.team_name
            var awayTeamLogo = awayTeamObject.logo
            var awayTeamScore = fixturesArray[i].goalsAwayTeam
            
            var match = JSON.parse(JSON.stringify({matchDate, homeTeamName, homeTeamLogo, homeTeamScore, awayTeamName, awayTeamLogo, awayTeamScore}))

            matches.fixtures.push(match)
        }

        res.send(matches)      
        
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
        var standings = {}
        standings.teams = []
        
        //var standings = []
        for(var i = 0; i < 20; i++)
        {
            var teamRank = standingArray[i].rank
            var teamName = standingArray[i].teamName
            var teamLogo = standingArray[i].logo
            var teamPoints = standingArray[i].points
            var teamGoalDiff = standingArray[i].goalsDiff
            
            var team = JSON.parse(JSON.stringify({teamRank, teamName, teamLogo, teamPoints, teamGoalDiff}))

            standings.teams.push(team)
        }
        res.send(standings)
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
        var standings = {}
        standings.players = []

        for(let i = 0; i < 20; i++)
        {
            var playerName = topscorersArray[i].player_name
            var goalsObject = topscorersArray[i].goals
            var goals = goalsObject.total
            var assists = goalsObject.assists
            var gamesObject = topscorersArray[i].games
            var nbGames = gamesObject.appearences

            var player = JSON.parse(JSON.stringify({playerName, goals, assists, nbGames}))

            standings.players.push(player)
        }
        res.send(standings)
        
    });
})

app.listen(PORT, () => {
    console.log("Server stared at port => " + PORT)
})