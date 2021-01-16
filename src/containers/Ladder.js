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
import { eloCalculations } from '../utils/functions';
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
      highestNod: {},
      highestRandom: {},
      selectedSeason: 3
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
        eloCalculations(data)
        data.sort((a,b) => (a.current_elo > b.current_elo) ? -1 : 1 )
        this.topPlayers(data);
        this.setState({ matchData: data });
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

    let randomTotals = []
    let randomhighestTotal = {}

    // overallTotal
    data.map(player => {
      console.log(`PLAYER: ${JSON.stringify(player)}`)
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

      // overallRandom
      let randomOnly = (player.games.filter(game => game.player_random === true)).length
      randomTotals.push({
        player: player.name,
        randomTotal: randomOnly
      })
      randomTotals.sort((a,b) => a.nodTotal - b.nodTotal);
      randomhighestTotal = randomTotals.sort((a,b) => a.value - b.value)
    })


    return this.setState({
    highestTotal: highestTotal[highestTotal.length-1],
    highestGDI: gdiHighestTotal[gdiHighestTotal.length-1],
    highestNod: nodHighestTotal[nodHighestTotal.length-1],
    highestRandom: randomhighestTotal[randomhighestTotal.length-1]
  })

  }

  handleSeasonChange = (event) => {
    this.setState({ selectedSeason: parseInt(event.target.value) });
    this.ladderState(event.target.value)
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

            <h3><span role="img" aria-label="trophy">🏆</span> SEASON LADDER <span role="img" aria-label="trophy">🏆</span></h3>
          <CustomP>A natural extension of the official Season 3 ladder using the same maps, considers a starting ELO level of 1,000 for each player</CustomP>
          <CustomP>Start: 09/01/21 ~20:40 GMT <br/>
          End: TBC</CustomP>

          <CustomP>* click rows for extra player data *</CustomP>
          <>
          <p>SELECT A SEASON</p>
          <select name="season" onChange={this.handleSeasonChange}>
            <option value="" disabled selected>-Select a season-</option>
            <option value="3">3+</option>
            <option value="4">4</option>
          </select>
          {this.state.matchata}
          </>
          <SearchBar data={this.state.matchData}/>
          <hr/>

          <h3>SEASON {(this.state.selectedSeason === 3) ? "3+" : this.state.selectedSeason}</h3>
          TOTAL PLAYERS: {this.state.matchData.length}<br/><br/>
          <Veterans highestTotal={this.state.highestTotal} highestGDI={this.state.highestGDI} highestNod={this.state.highestNod} highestRandom={this.state.highestRandom}/>
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
