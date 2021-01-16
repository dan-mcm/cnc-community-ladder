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

export { eloCalculator, eloCalculations }
