import React, { Component } from 'react';
import {
  Wrapper,
  TableFormat
} from '../utils/styles';
import styled from 'styled-components';
import ScoreModal from '../components/ScoreModal';
import { ModalManager } from 'react-dynamic-modal';
import { Flex, Box } from 'grid-styled';
import Pagination from "react-js-pagination";
import ScrollToTop from '../components/Scroll.js';

const axios = require('axios').default;

const CustomP = styled.p`
  font-size: 14px;
`;

const CustomImage = styled.img`
  max-width: 200px;
  max-height: 200px;
`

const CustomBadge = styled.img`
  max-width: 50px;
  max-height: 50px;
  padding: 0px;
`

class Ladder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      startPlayer: 0,
      endPlayer: 200,
      matchData: []
    }
  }

  handlePageChange(activePage) {
    console.log(`active page is ${activePage}`);
    let startPlayer = (activePage === 1) ? 0 : 200 * (activePage - 1)
    this.setState(
      {
        activePage,
        startPlayer,
        endPlayer: (startPlayer + 200)
      }
    );
  }

  openModal(data, index){
       //const text = this.refs.input.value;
       return ModalManager.open(
         <ScoreModal data={data} rank={index + this.state.startPlayer} onRequestClose={() => true}/>
       );
    }

  // sample call to get recent games... need some parsing logic to integrate it...
  componentDidMount() {
    // defaulting to season 3
    this.ladderState(3);
  }

  ladderState(season){
    return axios.get(`/db-get/${season}`)
    .then(
      matches => {
        let data = this.DBdataTranslation(matches.data)
        // highly experimental
        let eloData = this.eloCalculations(data)
        data.sort((a,b) => (a.current_elo > b.current_elo) ? -1 : 1 )
        this.setState({ matchData: data });
      }
    )
  }

  // should really be refactored, repeated code...
  DBdataTranslation(dataArray){
    let listedPlayers = []
    let output = []
    dataArray.map(match => {
      // default case if we haven't encountered player1 yet...
      if (!listedPlayers.includes(match.player1_name)){
        let frontend = {
          name: "",
          current_elo: 1000,
          games: []
        }
        listedPlayers.push(match.player1_name)
        frontend.name = match.player1_name
        frontend.games.push(
          {
            date: match.starttime,
            duration: match.match_duration,
            opponent: match.player2_name,
            opponent_faction: match.player2_faction,
            player_faction: match.player1_faction,
            map: match.map,
            replay: `https://replays.cnctdra.ea.com/${match.replay}`,
            result: (match.result === match.player1_name) ? "W" : "L"
          }
        )
        return output.push(frontend)
      } else if (listedPlayers.includes(match.player1_name)){
        // second case if we have encountered player1 yet...
        let index = output.findIndex(player => player.name === match.player1_name)

        output[index].games.push(
          {
            date: match.starttime,
            duration: match.match_duration,
            opponent: match.player2_name,
            opponent_faction: match.player2_faction,
            player_faction: match.player1_faction,
            map: match.map,
            replay: `https://replays.cnctdra.ea.com/${match.replay}`,
            result: (match.result === match.player1_name) ? "W" : "L"
          }
        )
      }

      // updating player 2 default case
      // default case if we haven't encountered player1 yet...
      if (!listedPlayers.includes(match.player2_name)){
        let frontend = {
          name: "",
          current_elo: 1000,
          games: []
        }
        listedPlayers.push(match.player2_name)
        frontend.name = match.player2_name
        frontend.games.push(
          {
            date: match.starttime,
            duration: match.match_duration,
            opponent: match.player1_name,
            opponent_faction: match.player1_faction,
            player_faction: match.player2_faction,
            map: match.map,
            replay: `https://replays.cnctdra.ea.com/${match.replay}`,
            result: (match.result === match.player2_name) ? "W" : "L"
          }
        )
        return output.push(frontend)
      } else if (listedPlayers.includes(match.player2_name)){
        // second case if we have encountered player2 yet...
        let index = output.findIndex(player => player.name === match.player2_name)

        return output[index].games.push(
          {
            date: match.starttime,
            duration: match.match_duration,
            opponent: match.player1_name,
            opponent_faction: match.player1_faction,
            player_faction: match.player2_faction,
            map: match.map,
            replay: `https://replays.cnctdra.ea.com/${match.replay}`,
            result: (match.result === match.player2_name) ? "W" : "L"
          }
        )
      }
    })
    return output
  }

  eloCalculator(p1,p2,p1_result){
    //p1_result of true means player 1 was winner.
    var EloRating = require('elo-rating');
    let player1 = p1
    let player2 = p2

    let score = EloRating.calculate(player1, player2, p1_result, 32)
    return score
  }

  eloCalculations(data){
    return data.map(player => {
      return player.games.map(game => {
        let playerelo = player.current_elo
        let result = (game.result==="W") ? true : false
        let opponentsName = game.opponent
        let opponentsCheck = data.find( ({name}) => name === opponentsName)

        // if for some reason the player isnt in the list we will default them to having 1,000 ELO
        let opponentElo = 1000
        let elo = 0
        if (opponentsCheck !== undefined){
          elo = this.eloCalculator(playerelo, opponentsCheck.current_elo, result)
        } else {
          elo = this.eloCalculator(playerelo, opponentElo, result)
        }

        let playersNewElo = elo.playerRating
        let opponentsNewElo = elo.opponentRating

        player.current_elo = playersNewElo
        return player
        }
      )
    }
    )
  }

  getRank(rank){

    if(rank<=16){
      return "general"
    } else if (rank<=200){
      return "major"
    } else if (rank<=400){
      return "captain"
    } else if (rank<=600){
      return "lieutenant"
    } else {
      return "sergeant";
    }
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
           />

          <TableFormat>
           <tr>
             <th>RANK</th>
             <th>POSITION</th>
             <th>NAME</th>
             <th>POINTS</th>
             <th>WINS</th>
             <th>LOSSES</th>
             <th>PLAYED</th>
             <th>WINRATE</th>
           </tr>
           {this.state.matchData.slice(this.state.startPlayer, this.state.endPlayer).map((data, index) => (
             <>
               <tr onClick={() => this.openModal(data, index)}>
               <td> <CustomBadge src={require(`../images/ranks/${this.getRank(index+1+this.state.startPlayer)}.png`)} /></td>
                <td>#{index + 1 + this.state.startPlayer}</td>
                <td>{data.name}</td>
                <td>{data.current_elo}</td>
                <td>{(data.games.filter(game => game.result === "W")).length}</td>
                <td>{(data.games.filter(game => game.result === "L")).length}</td>
                <td>{data.games.length}</td>
                <td>{Math.floor((((data.games.filter(game => game.result === "W")).length) / (data.games.length) * 100))+'%'}</td>
               </tr>

             </>
           ))}
          </TableFormat>
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
