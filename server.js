const axios = require('axios').default;
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const DB = require('./utils/dbQueries.js');
const { Pool } = require('pg');

function ladderMapParser(mapname){
  let ladderMaps = {
    "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_1_MAP": "green_acres",
    "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_60_MAP": "monkey_in_the_middle",
    "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_3_MAP": "elevation",
    "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_4_MAP": "heavy_metal",
    "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_5_MAP": "quarry",
    "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_6_MAP": "tournament_middle_camp",
    "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_7_MAP": "tournament_desert"
  }

  return ladderMaps[mapname]
}

// official season 3 map names
let ladderMapNames = [
  "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_1_MAP", // green_acres
  "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_60_MAP", // monkey_in_the_middle
  "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_3_MAP", // elevation
  "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_4_MAP", // heavy_metal
  "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_5_MAP", // quarry
  "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_6_MAP", // tournament_middle_camp
  "MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_7_MAP" // tournament_desert
]

// community season 4 map names
// "UGC_011000010FDE20F0_000000007E6E5DAE_MAPDATA", // eventide
let customMapNames = [
  "UGC_01100001000DEC1B_0000000081EBB6A8_MAPDATA", // duality
  "UGC_011000010FDE20F0_000000007E6E4CDA_MAPDATA", // quicksilver
  "UGC_01100001013FFA5D_0000000081DE9C5F_MAPDATA", // neo_twin_peaks
  "UGC_01100001056621FC_0000000082B0CC9F_MAPDATA", // sand_crystal_shard
  "UGC_0110000105329996_000000008064079B_MAPDATA", // higher_order
  "UGC_0110000105329996_000000008289B6E4_MAPDATA", // vales_of_the_templars
  "UGC_0110000105329996_00000000828943E1_MAPDATA", // canyon_paths
  "UGC_01100001013FFA5D_0000000081AC4211_MAPDATA" // frosted_hostilities_vertically_mirrored
]

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get('/db-get', (req, result) => {
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
  pool.connect().then(client => {
    return client.query('SELECT * FROM matches')
      .then(res => {
          client.release();
          result.send(res.rows)
      })
      .catch(e => {
          client.release();
          console.log(e.stack);
      })
  }).finally(() => pool.end());
})



app.get('/test', (req, res) => {res.send('Welcome to the backend!')})

app.get('/ladder-s3-api', (req, res) => {
  let games = []
  // note this limit variable needs dynamic adjusting based on starttime to prevent matches being cutoff
  axios.get(`${process.env.ENDPOINT}?limit=200`)
  .then(
    res => {
      let data = res.data
      let matches = data.matches

      let newResults = matches.filter(
        // getting TD results only
        match => match.extramatchsettings.product_type === 'TD'
        // epoch time Friday, January 1, 2021, 0:00:00
        && match.starttime > 1609459200
        // validating if custom or builtin map
        && match.extramatchsettings.custom_map === false
        // validates the mapname matches expected whitelisted names
        && ladderMapNames.some(map => match.mapname.includes(map))
      )

      // unique playernames
      let playerNames = []
      newResults.map(match => {
        match.names.map(name => {
          if (!playerNames.includes(name)){
            playerNames.push(name)
          }
        })
      })

      playerNames.map(player => {
        let playerData = { name: player, games: [] }
        // games.push(playerData)
        // console.log(games)
        newResults.map(gamePlayed => {
          if(gamePlayed.names.includes(player)){
            let opponent = (gamePlayed.names[0] === player) ? gamePlayed.names[1] : gamePlayed.names[0]
            let map = ladderMapParser(gamePlayed.mapname)
            let replay = `https://replays.cnctdra.ea.com/${gamePlayed.cdnurl}`
            let result = (gamePlayed.names.indexOf(player) === gamePlayed.winningteamid) ? "W" : "L"

            // epoch translation
            let date = gamePlayed.starttime
            var utcSeconds = date
            var d = new Date(0) // sets the date to the epoch
            d.setUTCSeconds(utcSeconds)
            date = d

            playerData.games.push(
              {
                date,
                opponent,
                result,
                map,
                replay
              }
            )
          }
        })
        games.push(playerData)
      })

      // console.log(JSON.stringify(newResults))
      // console.log(`Number of matches played: ${newResults.length}`)
      // console.log(`Player names: ${playerNames}`)
      // console.log(`Games: ${JSON.stringify(games)}`)
      console.log(`Number of players: ${games.length}`)
      return games
    }
  ).then(
    data => res.send(data)
  )
})

app.get('/ladder-s4', (req, res) => {
  let games = []
  // note this limit variable needs dynamic adjusting based on starttime to prevent matches being cutoff
  axios.get(`${process.env.ENDPOINT}?limit=200`)
  .then(
    res => {
      let data = res.data
      let matches = data.matches

      let newResults = matches.filter(
        // getting TD results only
        match => match.extramatchsettings.product_type === 'TD'
        // epoch time Friday, January 1, 2021, 0:00:00
        && match.starttime > 1577836800
        // validating if custom or builtin map
        && match.extramatchsettings.custom_map === true
        // validates the mapname matches expected whitelisted names
        && customMapNames.some(map => match.extramatchsettings.custom_map_name.includes(map))
      )

      // unique playernames
      let playerNames = []
      newResults.map(match => {
        match.names.map(name => {
          if (!playerNames.includes(name)){
            playerNames.push(name)
          }
        })
      })

      playerNames.map(player => {
        let playerData = { name: player, games: [] }
        // games.push(playerData)
        // console.log(games)
        newResults.map(gamePlayed => {
          if(gamePlayed.names.includes(player)){
            let opponent = (gamePlayed.names[0] === player) ? gamePlayed.names[1] : gamePlayed.names[0]
            let map = ladderMapParser(gamePlayed.mapname)
            let replay = `https://replays.cnctdra.ea.com/${gamePlayed.cdnurl}`
            let date = Date(gamePlayed.starttime*1000) // consider epoch translation
            let result = (gamePlayed.names.indexOf(player) === gamePlayed.winningteamid) ? "W" : "L"

            playerData.games.push(
              {
                date,
                opponent,
                result,
                map,
                replay
              }
            )
          }
        })
        games.push(playerData)
      })

      // console.log(JSON.stringify(newResults))
      // console.log(`Number of matches played: ${newResults.length}`)
      // console.log(`Player names: ${playerNames}`)
      // console.log(`Games: ${JSON.stringify(games)}`)
      return games
    }
  ).then(
    data => res.send(data)
  )
})

function DBdataTranslation(dataArray){
  let listedPlayers = []
  let output = []


  dataArray.map(match => {
    if (!listedPlayers.contains(dataArray.player1_name)){
      let frontend = {
        name: "",
        games: []
      }
      listedPlayers.push(dataArray.player1_name)
      frontend.name = dataArray.player1_name
      let date = dataArray.starttime
      let map = dataArray.map
      let replay = dataArray.replay

      frontend.games.push(
        {
          date: dataArray.starttime,
          opponent: dataArray.player2_name,
          opponent_faction: dataArray.player2_faction,
          player_faction: dataArray.player1_faction,
          map: dataArray.map,
          replay: dataArray.replay
        }
      )
      output.push(frontend)
    }
  })

  console.log(`DEBUG OUTPUT: ${output}`)
  return output

}

app.listen(port);

console.log('App is listening on port ' + port)
