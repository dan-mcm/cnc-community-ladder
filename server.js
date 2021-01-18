const axios = require('axios').default;
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const DB = require('./utils/dbQueries.js');
const { Pool } = require('pg');
const eloCalculationsRawRevised = require('./utils/helpers.js')
  .eloCalculationsRawRevised;
const DBdataTranslation = require('./utils/helpers.js').DBdataTranslation;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
  pool
    .connect()
    .then(client => {
      // deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player1_random, player2_name, player2_faction, player2_random, result, map, replay, season FROM matches  WHERE season=${req.params.season} order by starttime ASC`
        )
        .then(res => {
          client.release();
          result.send(DBdataTranslation(eloCalculationsRawRevised(res.rows)));
        })
        .catch(e => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => pool.end());
});

app.get('/health', (req, res) => {
  return res.sendStatus(200);
});

app.get(`/nightbot/:season/:playername`, (req, result) => {
  // for local...
  // const pool = new Pool({
  //   user: process.env.DB_USER,
  //   host: process.env.DB_HOST,
  //   database: process.env.DB_NAME,
  //   password: process.env.DB_PASSWORD,
  //   port: process.env.DB_PORT
  //  });
  // for prod
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  pool
    .connect()
    .then(client => {
      // deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player1_random, player2_name, player2_faction, player2_random, result, map, replay, season FROM matches  WHERE season=${req.params.season} order by starttime ASC`
        )
        .then(res => {
          let eloAddition = eloCalculationsRawRevised(res.rows);
          let translatedData = DBdataTranslation(eloAddition);
          translatedData.sort((a, b) =>
            a.current_elo > b.current_elo ? -1 : 1
          );
          possibleIndex =
            translatedData.findIndex(
              player => player.name === req.params.playername
            ) + 1;
          let selected = translatedData.filter(
            player => player.name === req.params.playername
          );
          let output = {
            name: selected[0].name,
            rank: possibleIndex,
            wins: selected[0].games.filter(game => game.result === 'W').length,
            lost: selected[0].games.filter(game => game.result === 'L').length,
            points: selected[0].current_elo,
            played: selected[0].games.length,
            season: req.params.season === '3' ? '3+' : req.params.season
          };
          client.release();
          return result.send(output);
        })
        .catch(e => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => pool.end());
});

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
  pool
    .connect()
    .then(client => {
      // deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player1_random, player2_name, player2_faction, player2_random, result, map, replay, season FROM matches  WHERE season=${req.params.season} order by starttime ASC`
        )
        .then(res => {
          let eloAddition = eloCalculationsRawRevised(res.rows);
          let translatedData = DBdataTranslation(eloAddition);
          translatedData.sort((a, b) =>
            a.current_elo > b.current_elo ? -1 : 1
          );
          possibleIndex =
            translatedData.findIndex(
              player => player.name === req.params.playername
            ) + 1;
          let selected = translatedData.filter(
            player => player.name === req.params.playername
          );
          let output = {
            name: selected[0].name,
            rank: possibleIndex,
            wins: selected[0].games.filter(game => game.result === 'W').length,
            lost: selected[0].games.filter(game => game.result === 'L').length,
            points: selected[0].current_elo,
            played: selected[0].games.length,
            season: req.params.season === '3' ? '3+' : req.params.season
          };
          // 15 minutes refresh time
          let customHTML = `
            <html>
            <head>
              <meta http-equiv="refresh" content="300">
            </head>
            <div style="background-color:black; display: table">
              <p style="border:2px solid white; color:white; padding:5px; margin: 0 auto">
                <b style="font-size=32px;"><span style="display:table-cell; text-align:center; padding-left:15px; padding-right: 15px;">${output.name}</span> <span style="display:table-cell; text-align:center; padding-left:15px; padding-right: 15px">Rank: #${output.rank}</span><span style="display:table-cell; text-align:center; padding-left:15px; padding-right: 15px">Wins: ${output.wins}</span> <span style="display:table-cell; text-align:center; padding-left:15px; padding-right: 15px">Lost:${output.lost}</span> <span style="display:table-cell; text-align:center; padding-left:15px; padding-right: 15px">Points: ${output.points}</span> <span style="display:table-cell; text-align:center;  padding-left:15px; padding-right: 15px">Played: ${output.played}<span></b>
              </p>
            </div>
            </html>
          `;
          client.release();
          return result.send(customHTML);
        })
        .catch(e => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => pool.end());
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
console.log('App is listening on port ' + port);
