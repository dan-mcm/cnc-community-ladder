const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const axios = require('axios');

router.get('/:id', (request, result) => {
  // api should take 100 comma delimited...
  // https://partner.steamgames.com/doc/webapi/ISteamUser
  return axios
    .get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&format=json&steamids=${request.params.id}
`
    )
    .then((res) => {
      return result.send(res.data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
