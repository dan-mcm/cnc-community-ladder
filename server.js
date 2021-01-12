const axios = require('axios').default;
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const DB = require('./utils/dbQueries.js');
const { Pool } = require('pg');

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
      return output.push(frontend)
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
      return output.push(frontend)
    } else if (listedPlayers.includes(decodedPlayer2)){
      // second case if we have encountered player2 yet...
      let index = output.findIndex(player => player.name === decodedPlayer1)

      return output[index].games.push(
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port);
console.log('App is listening on port ' + port)
