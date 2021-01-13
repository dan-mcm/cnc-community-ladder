const axios = require('axios').default;
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const DB = require('./utils/dbQueries.js');
const { Pool } = require('pg');

function eloCalculator(p1,p2,p1_result){
  //p1_result of true means player 1 was winner.
  var EloRating = require('elo-rating');
  let player1 = p1
  let player2 = p2
  let score = EloRating.calculate(player1, player2, p1_result, 32)
  return score
}

function eloCalculations(data){
  return data.map(player => {
    // console.log(player)
    return player.games.map(game => {
      let playerelo = player.current_elo
      let result = (game.result==="W") ? true : false
      let opponentsName = game.opponent
      let opponentsCheck = data.find( ({name}) => name === opponentsName)

      // if for some reason the player isnt in the list we will default them to having 1,000 ELO
      let opponentElo = 1000
      let elo = 0
      if (opponentsCheck !== undefined){
        elo = eloCalculator(playerelo, opponentsCheck.current_elo, result)
      } else {
        elo = eloCalculator(playerelo, opponentElo, result)
      }

      let playersNewElo = elo.playerRating
      let opponentsNewElo = elo.opponentRating

      player.current_elo = playersNewElo
      return player
      }
    )
  }
  )
}

function DBdataTranslation(dataArray){
  const utf8 = require('utf8')

  let listedPlayers = []
  let output = []
  dataArray.map(match => {
    // default case if we haven't encountered player1 yet...
    let decodedPlayer1 = utf8.decode(eval('\'' + match.player1_name + '\''))
    let decodedPlayer2 = utf8.decode(eval('\'' + match.player2_name + '\''))

    if (!listedPlayers.includes(decodedPlayer1)){
      let frontend = {
        name: "",
        current_elo: 1000,
        games: []
      }

      listedPlayers.push(decodedPlayer1)
      frontend.name = decodedPlayer1

      frontend.games.push(
        {
          date: match.starttime,
          duration: match.match_duration,
          opponent: decodedPlayer2,
          opponent_faction: match.player2_faction,
          player_faction: match.player1_faction,
          map: match.map,
          replay: `https://replays.cnctdra.ea.com/${match.replay}`,
          result: (match.result === decodedPlayer1) ? "W" : "L"
        }
      )
      output.push(frontend)
    } else if (listedPlayers.includes(decodedPlayer1)){
      // second case if we have encountered player1 yet...
      let index = output.findIndex(player => player.name === decodedPlayer1)

      output[index].games.push(
        {
          date: match.starttime,
          duration: match.match_duration,
          opponent: decodedPlayer2,
          opponent_faction: match.player2_faction,
          player_faction: match.player1_faction,
          map: match.map,
          replay: `https://replays.cnctdra.ea.com/${match.replay}`,
          result: (match.result === decodedPlayer1) ? "W" : "L"
        }
      )
    }

    // updating player 2 default case
    // default case if we haven't encountered player1 yet...
    if (!listedPlayers.includes(decodedPlayer2)){
      let frontend = {
        name: "",
        current_elo: 1000,
        games: []
      }
      listedPlayers.push(decodedPlayer2)
      frontend.name = decodedPlayer2
      frontend.games.push(
        {
          date: match.starttime,
          duration: match.match_duration,
          opponent: decodedPlayer1,
          opponent_faction: match.player1_faction,
          player_faction: match.player2_faction,
          map: match.map,
          replay: `https://replays.cnctdra.ea.com/${match.replay}`,
          result: (match.result === decodedPlayer2) ? "W" : "L"
        }
      )
      output.push(frontend)
    } else if (listedPlayers.includes(decodedPlayer2)){
      // second case if we have encountered player2 yet...
      let index = output.findIndex(player => player.name === decodedPlayer2)

      output[index].games.push(
        {
          date: match.starttime,
          duration: match.match_duration,
          opponent: decodedPlayer1,
          opponent_faction: match.player1_faction,
          player_faction: match.player2_faction,
          map: match.map,
          replay: `https://replays.cnctdra.ea.com/${match.replay}`,
          result: (match.result === decodedPlayer2) ? "W" : "L"
        }
      )
    }
  })
  return output
}


app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {

  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('/db-get/:season', (req, result) => {
  // for local...
  // const pool = new Pool({
  //   user: process.env.DB_USER,
  //   host: process.env.DB_HOST,
  //   database: process.env.DB_NAME,
  //   password: process.env.DB_PASSWORD,
  //   port: process.env.DB_PORT
  // });
  // for prod
    const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  pool.connect()
  .then(client => {
    // deduplicates reuslts based on timestamp being unique and also orders results by time
    return client.query(`SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player2_name, player2_faction, result, map, replay, season FROM matches  WHERE season=${req.params.season} order by starttime DESC`)
      .then(res => {
          client.release();
          result.send(DBdataTranslation(res.rows))
      })
      .catch(e => {
          client.release();
          console.log(e.stack);
      })
  })
  .catch(err => {
    console.log(err)
    }
  )
  .finally(() => pool.end());
})

app.get('/health', (req, res) => {
  return res.sendStatus(200)
})

app.get('/obs/:season/:playername', (req, result) => {
  // for local...
  // const pool = new Pool({
  //   user: process.env.DB_USER,
  //   host: process.env.DB_HOST,
  //   database: process.env.DB_NAME,
  //   password: process.env.DB_PASSWORD,
  //   port: process.env.DB_PORT
  // });
  // for prod
    const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  pool.connect()
  .then(client => {
    // deduplicates reuslts based on timestamp being unique and also orders results by time
    return client.query(`SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player2_name, player2_faction, result, map, replay, season FROM matches  WHERE season=${req.params.season} order by starttime DESC`)
      .then(res => {
          client.release();
          let parsed = DBdataTranslation(res.rows)
          let eloData = eloCalculations(parsed)
          parsed.sort((a,b) => (a.current_elo > b.current_elo) ? -1 : 1 )
          possibleIndex = parsed.findIndex(player => player.name === req.params.playername ) +1
          let selected = parsed.filter(player => player.name === req.params.playername);
          console.log(`POSSIBLE INDEX ${possibleIndex}`)
          let output = {
            name: selected[0].name,
            rank: possibleIndex,
            wins: selected[0].games.filter(game => game.result === "W").length,
            lost: selected[0].games.filter(game => game.result === "L").length,
            points: selected[0].current_elo,
            played: selected[0].games.length,
            season: (req.params.season === 3) ? "3+" : req.params.season
          }
          return result.send(output)
      })
      .catch(e => {
          client.release();
          console.log(e.stack);
      })
  })
  .catch(err => {
    console.log(err)
    }
  )
  .finally(() => pool.end());
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
console.log('App is listening on port ' + port)
