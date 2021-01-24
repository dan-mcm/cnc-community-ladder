const axios = require('axios').default;
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config();
const DB = require('./utils/dbQueries.js');
const { Pool } = require('pg');
const { eloCalculationsRawRevised } = require('./utils/helpers.js');
const { dbdataTranslation } = require('./utils/helpers.js');


if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

function createPool(){
  let pool;
  if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
  }
  return pool
}

// For handling SQL injection
function cleanInput(input) {
  return /^\d+$/.test(input) ? input : 3;
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/leaderboard/:season', (req, result) => {
  let pool;

  if (process.env.NODE_ENV === 'production') {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
  }

  // For prod
  const cleanedInput = cleanInput(req.params.season);
  pool
    .connect()
    .then(client => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT DISTINCT player_name, season, rank, position, points, wins, loses, played, winrate FROM leaderboard  WHERE season=${cleanedInput} order by position ASC`
        )
        .then(res => {
          client.release();
          result.send(res.rows);
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

})

app.get('/elohistory/:season/:player', (req, result) => {
  let pool = createPool()
  const cleanedSeasonInput = cleanInput(req.params.season);

  pool
    .connect()
    .then(client => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT * FROM elo_history WHERE season=${cleanedSeasonInput} and player='${req.params.player}' or opponent='${req.params.player}' order by starttime DESC`
        )
        .then(res => {
          client.release();
          result.send(res.rows);
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

})

app.get(`/awards/total/:season`, (req, result) => {
  let pool = createPool()
  const cleanedSeasonInput = cleanInput(req.params.season);

  pool
    .connect()
    .then(client => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `select player, count(*) as totals from elo_history where season=${cleanedSeasonInput} group by player order by count(*) desc limit 1`
        )
        .then(res => {
          client.release();
          result.send(res.rows);
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
})


app.get('/awards/faction/random/:season', (req, result) => {
  let pool = createPool()
  const cleanedSeasonInput = cleanInput(req.params.season);

  pool
    .connect()
    .then(client => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `select player, count(*) as totals from elo_history where player_random=true and season=${cleanedSeasonInput} group by player order by count(*) desc limit 1`
        )
        .then(res => {
          client.release();
          result.send(res.rows);
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
})

app.get('/awards/faction/:faction/:season', (req, result) => {
  let pool = createPool()
  const cleanedSeasonInput = cleanInput(req.params.season);

  pool
    .connect()
    .then(client => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `select player, count(*) as totals from elo_history where player_faction='${req.params.faction}' and player_random=false and season=${cleanedSeasonInput} group by player order by count(*) desc limit 1`
        )
        .then(res => {
          client.release();
          result.send(res.rows);
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
})



app.get('/health', (req, res) => {
  return res.sendStatus(200);
});

app.get(`/nightbot/:season/:playername`, (req, result) => {
  let pool = createPool()

  pool
    .connect()
    .then(client => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player1_random, player2_name, player2_faction, player2_random, result, map, replay, season FROM matches  WHERE season=${cleanedInput} order by starttime ASC`
        )
        .then(res => {
          const eloAddition = eloCalculationsRawRevised(res.rows);
          const translatedData = dbdataTranslation(eloAddition);
          translatedData.sort((a, b) =>
            a.current_elo > b.current_elo ? -1 : 1
          );
          const possibleIndex =
            translatedData.findIndex(
              player => player.name === req.params.playername
            ) + 1;
          const selected = translatedData.filter(
            player => player.name === req.params.playername
          );
          const output = {
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
  let pool = createPool()

  pool
    .connect()
    .then(client => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player1_random, player2_name, player2_faction, player2_random, result, map, replay, season FROM matches  WHERE season=${cleanedInput} order by starttime ASC`
        )
        .then(res => {
          const eloAddition = eloCalculationsRawRevised(res.rows);
          const translatedData = dbdataTranslation(eloAddition);
          translatedData.sort((a, b) =>
            a.current_elo > b.current_elo ? -1 : 1
          );
          const possibleIndex =
            translatedData.findIndex(
              player => player.name === req.params.playername
            ) + 1;
          const selected = translatedData.filter(
            player => player.name === req.params.playername
          );
          const output = {
            name: selected[0].name,
            rank: possibleIndex,
            wins: selected[0].games.filter(game => game.result === 'W').length,
            lost: selected[0].games.filter(game => game.result === 'L').length,
            points: selected[0].current_elo,
            played: selected[0].games.length,
            season: req.params.season === '3' ? '3+' : req.params.season
          };
          // 15 minutes refresh time
          const customHTML = `
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

app.get('/recent', (req, result) => {
  let pool = createPool()

  const cleanedInput = cleanInput(req.params.season);

  pool
    .connect()
    .then(client => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player1_random, player2_name, player2_faction, player2_random, result, map, replay, season FROM matches order by starttime desc limit 24`
        )
        .then(res => {
          result.send(res.rows);
          client.release();
        })
        .catch(e => {
          console.log(e.stack);
          client.release();
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
