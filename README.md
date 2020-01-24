# BeFoot-Api

Pour notre application BeFoot nous utilisons une API externe nommée [API-Football](https://www.api-football.com/)

La documentation complète est disponible via ce lien : https://www.api-football.com/documentation

# Résumé des informations utiles :

## Ligues & compétitions

Chaque compétition possède un ID qui permet d'accèder aux informations la concernant. Voici une liste non exhaustive des ID des ligues correspondant à la saison actuelle (2019/2020) : 

* Premier League (Angleterre) : 524
* Liga (Espagne) : 775
* Ligue 1 (France) : 525
* Bundesliga (Allemagne) : 754
* Serie A (Italie) : 891
* Ligue des Champions (Europe) : 530

### Exemples de liens utiles

 * Récupérer le classement d'une compétition selon son ID : https://api-football-v1.p.rapidapi.com/v2/leagueTable/{league_id}"
      * Aperçu de l'architecture : 
    ```json  
     {
    "api": {
        "results": 1,
        "standings": [
            [
                {
                    "rank": 1,
                    "team_id": 40,
                    "teamName": "Liverpool",
                    "logo": "https://media.api-football.com/teams/40.png",
                    "group": "Premier League",
                    "forme": "WWWWW",
                    "status": "same",
                    "description": "Promotion - Champions League (Group Stage)",
                    "all": {
                        "matchsPlayed": 23,
                        "win": 22,
                        "draw": 1,
                        "lose": 0,
                        "goalsFor": 54,
                        "goalsAgainst": 15
                    },
                    "home": {
                        "matchsPlayed": 12,
                        "win": 12,
                        "draw": 0,
                        "lose": 0,
                        "goalsFor": 31,
                        "goalsAgainst": 9
                    },
                    "away": {
                        "matchsPlayed": 11,
                        "win": 10,
                        "draw": 1,
                        "lose": 0,
                        "goalsFor": 23,
                        "goalsAgainst": 6
                    },
                    "goalsDiff": 39,
                    "points": 67,
                    "lastUpdate": "2020-01-23"
                },
      ```
      
 * Récupérer le classement des 20 meilleurs buteurs d'une compétition selon son ID : https://api-football-v1.p.rapidapi.com/v2/topscorers/{league_id}
      * Aperçu de l'architecture :
      
      ```json
      {
    "api": {
        "results": 20,
        "topscorers": [
            {
                "player_id": 18788,
                "player_name": "J. Vardy",
                "firstname": "Jamie",
                "lastname": "Vardy",
                "position": "Attacker",
                "nationality": "England",
                "team_id": 46,
                "team_name": "Leicester",
                "games": {
                    "appearences": 21,
                    "minutes_played": 1890
                },
                "goals": {
                    "total": 17,
                    "assists": 4,
                    "conceded": null
                },
                "shots": {
                    "total": 51,
                    "on": 31
                },
                "penalty": {
                    "won": 1,
                    "commited": null,
                    "success": 3,
                    "missed": 1,
                    "saved": null
                },
                "cards": {
                    "yellow": 2,
                    "second_yellow": 0,
                    "red": 0
                }
            },
      ```
      * Récupérer les matchs d'un jour d'une compétition selon son ID et une date (format : [YYYY-MM-DD]) : https://api-football-v1.p.rapidapi.com/v2/fixtures/league/{league_id}/{date}
      * Aperçu de l'architecture :
      
      ```json
      {
    "api": {
        "results": 6,
        "fixtures": [
            {
                "fixture_id": 157615,
                "league_id": 525,
                "league": {
                    "name": "Ligue 1",
                    "country": "France",
                    "logo": "https://media.api-football.com/leagues/4.svg",
                    "flag": "https://media.api-football.com/flags/fr.svg"
                },
                "event_date": "2020-01-25T16:30:00+00:00",
                "event_timestamp": 1579969800,
                "firstHalfStart": null,
                "secondHalfStart": null,
                "round": "Regular Season - 21",
                "status": "Not Started",
                "statusShort": "NS",
                "elapsed": 0,
                "venue": "Orange Vélodrome (Marseille)",
                "referee": null,
                "homeTeam": {
                    "team_id": 81,
                    "team_name": "Marseille",
                    "logo": "https://media.api-football.com/teams/81.png"
                },
                "awayTeam": {
                    "team_id": 77,
                    "team_name": "Angers",
                    "logo": "https://media.api-football.com/teams/77.png"
                },
                "goalsHomeTeam": null,
                "goalsAwayTeam": null,
                "score": {
                    "halftime": null,
                    "fulltime": null,
                    "extratime": null,
                    "penalty": null
                }
            },
      ```
