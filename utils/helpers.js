function eloCalculator(p1,p2,p1_result){
  //p1_result of true means player 1 was winner.
  var EloRating = require('elo-rating');
  let player1 = p1
  let player2 = p2

  let p1Score = EloRating.calculate(player1, player2, p1_result, 32)
  let p2Score = EloRating.calculate(player2, player1, !p1_result, 32)
  // console.log(`P1 SCORE; ${JSON.stringify(p1Score)}`)
  // console.log(`P2 SCORE; ${JSON.stringify(p2Score)}`)
  return [p1Score, p2Score]
}

function eloCalculations(data){
  return data.map(player => {
    // console.log(player)
    return player.games.map(game => {
      let playerelo = player.current_elo
      let result = (game.result==="W") ? true : false
      let opponentsName = game.opponent
      let opponentsCheck = data.find( ({name}) => name === opponentsName)

      let elo = 0
      if (opponentsCheck !== undefined){
        elo = eloCalculator(playerelo, opponentsCheck.current_elo, result)
      } else {
        // if for some reason the player isnt in the list we will default them to having 1,000 ELO
        let opponentElo = 1000
        elo = eloCalculator(playerelo, opponentElo, result)

        let opponentsNewElo = elo[1].opponentRating
        // add our opponent to the players list since they don't exist already and due to reduce elo adding game as well.
        data.push({
          name: opponentsName,
          current_elo: opponentsNewElo,
          games: [
            game
          ]
        })
      }

      let playersNewElo = elo[0].playerRating
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
    // logging
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
          player_random: match.player1_random,
          opponent_random: match.player2_random,
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
          player_random: match.player1_random,
          opponent_random: match.player2_random,
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
          player_random: match.player1_random,
          opponent_random: match.player2_random,
          map: match.map,
          replay: `https://replays.cnctdra.ea.com/${match.replay}`,
          result: (match.result === decodedPlayer2) ? "W" : "L"
        }
      )
    }
  })
  return output
}
module.exports = {
  DBdataTranslation,
  eloCalculator,
  eloCalculations
};
