const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

router.get('/leaderboard/:season/:offset', (request, result) => {
  let adjustedSeason;

  request.params.season < 10
    ? (adjustedSeason = '0' + request.params.season)
    : (adjustedSeason = request.params.season);

  // R1V1_MMR_BOARD is the RedAlert leaderboard,
  // 1V1_MMR_BOARD is the TiberianDawn one.
  return axios
    .put(
      `${process.env.PETRO_ENDPOINT}${process.env.LEADERBOARD_STANDINGS_URL}`,
      {
        leaderboardQueryV2: {
          boardName: `1V1_BOARD_S_${adjustedSeason}`,
          offset: request.params.offset,
          limit: 200,
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
      }
    )
    .then((res) => {
      // console.log(res.data)
      return result.send(res.data);
    })
    .catch((err) => console.log(err));
});

router.get('/recent', (request, result) => {
  return axios
    .get(`${process.env.PETRO_ENDPOINT}${process.env.RECENT_MATCHES}`)
    .then((res) => {
      return result.send(res.data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
