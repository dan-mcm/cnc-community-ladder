import React, { Component } from 'react';
import {
  Wrapper
} from '../utils/styles';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import { Flex, Box } from 'grid-styled';
import Pagination from "react-js-pagination";
import ScrollToTop from '../components/Scroll.js';
import Veterans from '../components/Veterans.js';
import Leaderboard from '../components/Leaderboard.js';

const axios = require('axios').default;

const CustomP = styled.p`
  font-size: 14px;
`;

const CustomImage = styled.img`
  max-width: 200px;
  max-height: 200px;
`

class Ladder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      startPlayer: 0,
      endPlayer: 200,
      matchData: [],
      highestTotal: {},
      highestGDI: {},
      highestNod: {}
    }
  }

  componentDidMount() {
    // defaulting to season 3
    this.ladderState(3);
  }

  handlePageChange(activePage) {
    let startPlayer = (activePage === 1) ? 0 : 200 * (activePage - 1)
    this.setState(
      {
        activePage,
        startPlayer,
        endPlayer: (startPlayer + 200)
      }
    );
  }

  ladderState(season){
    return axios.get(`/db-get/${season}`)
    .then(
      matches => {
        let data = matches.data
        // highly experimental
        this.eloCalculations(data)
        data.sort((a,b) => (a.current_elo > b.current_elo) ? -1 : 1 )
        this.topPlayers(data);
        this.setState({ matchData: data });
      }
    )
  }

  eloCalculator(p1,p2,p1_result){
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

  eloCalculations(data){
    return data.map(player => {
      // console.log(player)
      return player.games.map(game => {
        let playerelo = player.current_elo
        let result = (game.result==="W") ? true : false
        let opponentsName = game.opponent
        let opponentsCheck = data.find( ({name}) => name === opponentsName)

        let elo = 0
        if (opponentsCheck !== undefined){
          elo = this.eloCalculator(playerelo, opponentsCheck.current_elo, result)
        } else {
          // if for some reason the player isnt in the list we will default them to having 1,000 ELO
          let opponentElo = 1000
          elo = this.eloCalculator(playerelo, opponentElo, result)

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

  topPlayers(data){
    let playerTotals = []
    let highestTotal = {}

    let gdiTotals = []
    let gdiHighestTotal = {}

    let nodTotals = []
    let nodHighestTotal = {}
    // overallTotal
    data.map(player => {

      playerTotals.push({
        player: player.name,
        playerTotal: player.games.length
      })

      playerTotals.sort((a,b) => a.playerTotal - b.playerTotal);
      highestTotal = playerTotals.sort((a,b) => a.value - b.value);

      // overallGDI
      let gdiOnly = (player.games.filter(game => game.player_faction === "GDI")).length
      gdiTotals.push({
        player: player.name,
        gdiTotal: gdiOnly
      })
      gdiTotals.sort((a,b) => a.gdiTotal - b.gdiTotal);
      gdiHighestTotal = gdiTotals.sort((a,b) => a.value - b.value);

      // overallNod
      let nodOnly = (player.games.filter(game => game.player_faction === "Nod")).length
      nodTotals.push({
        player: player.name,
        nodTotal: nodOnly
      })
      nodTotals.sort((a,b) => a.nodTotal - b.nodTotal);
      nodHighestTotal = nodTotals.sort((a,b) => a.value - b.value);
    })

    console.log(`HIGHEST: ${JSON.stringify(highestTotal)}`)
    return this.setState({
    highestTotal: highestTotal[highestTotal.length-1],
    highestGDI: gdiHighestTotal[gdiHighestTotal.length-1],
    highestNod: nodHighestTotal[nodHighestTotal.length-1]
  })

  }

  render() {
    return (
      <Wrapper>
        <div>
        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 2 / 3]}>
          <p>
          <h3>TIBERIAN DAWN REMASTERED</h3>
          COMMUNITY LEADERBOARD RANKINGS
          </p>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
          <p>
          <CustomImage src={require('../images/cnc_remastered.png')} />
          </p>
          <Box px={2} py={3} width={[1, 3 / 3]}>
          </Box>
          </Box>
        </Flex>

        <hr/>

            <h3><span role="img" aria-label="trophy">🏆</span> SEASON 3+ LADDER <span role="img" aria-label="trophy">🏆</span></h3>
          <CustomP>A natural extension of the official Season 3 ladder using the same maps, considers a starting ELO level of 1,000 for each player</CustomP>
          <CustomP>Start: 09/01/21 ~20:40 GMT <br/>
          End: TBC</CustomP>

          <CustomP>Total Players: {this.state.matchData.length}<br/><br/>* click rows for extra player data *</CustomP>
          <br/>
          <hr/>
          <SearchBar data={this.state.matchData}/>
          <br/>
          <hr/>
          <h3>LEADERBOARD</h3>
          <Veterans highestTotal={this.state.highestTotal} highestGDI={this.state.highestGDI} highestNod={this.state.highestNod}/>
          <Pagination
             activePage={this.state.activePage}
             itemsCountPerPage={200}
             totalItemsCount={this.state.matchData.length}
             pageRangeDisplayed={Math.ceil(this.state.matchData.length / 200)}
             onChange={this.handlePageChange.bind(this)}
             prevPageText='<'
             nextPageText='>'
             itemClass="page-item"
             linkClass="page-link"
             activeLinkClass="page-selected"
           />
          <Leaderboard
            data={this.state.matchData}
            startPlayer={this.state.startPlayer}
            endPlayer={this.state.endPlayer}
            activePage={this.state.activePage}
          />

          <br/>
          <Pagination
             activePage={this.state.activePage}
             itemsCountPerPage={200}
             totalItemsCount={this.state.matchData.length}
             pageRangeDisplayed={Math.ceil(this.state.matchData.length / 200)}
             onChange={this.handlePageChange.bind(this)}
             prevPageText='<'
             nextPageText='>'
             itemClass="page-item"
             linkClass="page-link"
             activeLinkClass="page-selected"
           />
           <ScrollToTop/>
           <br/>
        </div>
        <div>
     </div>

      </Wrapper>
    );
  }
}
export default Ladder;
