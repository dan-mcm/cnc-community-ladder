const { cleanInput, createPool } = require('../utils/helpers');
const express = require('express');
const { Pool } = require('pg');

const router = express.Router();

router.get('/leaderboard/:season', (req, result) => {
  const pool = createPool();
  // For prod
  const cleanedInput = cleanInput(req.params.season);
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT DISTINCT player_name, season, rank, position, points, wins, loses, played, winrate FROM leaderboard  WHERE season=${cleanedInput} order by position ASC`
        )
        .then((res) => {
          client.release();
          result.send(res.rows);
        })
        .catch((e) => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/elohistory/:season/:player', (req, result) => {
  const pool = createPool();
  const cleanedSeasonInput = cleanInput(req.params.season);
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT * FROM elo_history WHERE season=${cleanedSeasonInput} and (player='${req.params.player}' or opponent='${req.params.player}') order by starttime DESC`
        )
        .then((res) => {
          client.release();
          result.send(res.rows);
        })
        .catch((e) => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get(`/awards/total/:season`, (req, result) => {
  const pool = createPool();
  const cleanedSeasonInput = cleanInput(req.params.season);
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `select player, count(*) as totals from elo_history where season=${cleanedSeasonInput} group by player order by count(*) desc limit 1`
        )
        .then((res) => {
          client.release();
          result.send(res.rows);
        })
        .catch((e) => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/awards/faction/random/:season', (req, result) => {
  const pool = createPool();
  const cleanedSeasonInput = cleanInput(req.params.season);
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `select player, count(*) as totals from elo_history where player_random=true and season=${cleanedSeasonInput} group by player order by count(*) desc limit 1`
        )
        .then((res) => {
          client.release();
          result.send(res.rows);
        })
        .catch((e) => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/awards/faction/:faction/:season', (req, result) => {
  const pool = createPool();
  const cleanedSeasonInput = cleanInput(req.params.season);
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `select player, count(*) as totals from elo_history where player_faction='${req.params.faction}' and player_random=false and season=${cleanedSeasonInput} group by player order by count(*) desc limit 1`
        )
        .then((res) => {
          client.release();
          result.send(res.rows);
        })
        .catch((e) => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get(`/nightbot/:season/:playername`, (req, result) => {
  const pool = createPool();
  const cleanedSeasonInput = cleanInput(req.params.season);
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT DISTINCT player_name, season, rank, position, points, wins, loses, played, winrate FROM leaderboard WHERE season=${cleanedSeasonInput} AND player_name='${req.params.playername}' order by position ASC`
        )
        .then((res) => {
          const output = {
            name: res.rows[0].player_name,
            rank: res.rows[0].position,
            wins: res.rows[0].wins,
            lost: res.rows[0].loses,
            points: res.rows[0].points,
            played: res.rows[0].played,
            season: req.params.season === '3' ? '3+' : req.params.season,
          };
          client.release();
          return result.send(output);
        })
        .catch((e) => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/obs/:season/:playername', (req, result) => {
  const pool = createPool();
  const cleanedSeasonInput = cleanInput(req.params.season);
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT DISTINCT player_name, season, rank, position, points, wins, loses, played, winrate FROM leaderboard WHERE season=${cleanedSeasonInput} AND player_name='${req.params.playername}' order by position ASC`
        )
        .then((res) => {
          const output = {
            name: res.rows[0].player_name,
            rank: res.rows[0].position,
            wins: res.rows[0].wins,
            lost: res.rows[0].loses,
            points: res.rows[0].points,
            played: res.rows[0].played,
            season: req.params.season === '3' ? '3+' : req.params.season,
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
        .catch((e) => {
          client.release();
          console.log(e.stack);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/recent', (req, result) => {
  const pool = createPool();
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player1_random, player2_name, player2_faction, player2_random, result, map, replay, season FROM matches order by starttime desc limit 24`
        )
        .then((res) => {
          result.send(res.rows);
          client.release();
        })
        .catch((e) => {
          console.log(e.stack);
          client.release();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/recent/hour', (req, result) => {
  const pool = createPool();
  const currentTime = Date.now();
  const hour = 3600000;
  const hourOffset = (currentTime - hour) / 1000;
  pool
    .connect()
    .then((client) => {
      // Deduplicates reuslts based on timestamp being unique and also orders results by time
      return client
        .query(
          `SELECT distinct(starttime) starttime, match_duration, player1_name, player1_faction, player1_random, player2_name, player2_faction, player2_random, result, map, replay, season FROM matches WHERE starttime > ${hourOffset}`
        )
        .then((res) => {
          result.send(res.rows);
          client.release();
        })
        .catch((e) => {
          console.log(e.stack);
          client.release();
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
