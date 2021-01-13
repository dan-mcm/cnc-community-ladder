import React, { Component } from 'react';
import {
  Wrapper,
  TableFormat
} from '../utils/styles';
import styled from 'styled-components';
import ScoreModal from '../components/ScoreModal';
import SearchBar from '../components/SearchBar';
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
  max-width: 40px;
  max-height: 40px;
  padding: 0px;
  margin: 0px;
`

const CustomRow = styled.tr`
  &:nth-child(2){
    background-color: rgb(212,175,55,0.6);
  }
  &:nth-child(2):hover{
    background-color: rgb(212,175,55,0.9);
  }
  &:nth-child(3){
    background-color: rgb(192,192,192,0.6);
  }
  &:nth-child(3):hover{
    background-color: rgb(192,192,192,0.9);
  }
  &:nth-child(4){
    background-color: rgb(205, 127, 50, 0.6);
  }
  &:nth-child(4):hover{
    background-color: rgb(205, 127, 50, 0.9);
  }
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
     return ModalManager.open(
       <ScoreModal data={data} rank={index + this.state.startPlayer} onRequestClose={() => true}/>
     );
  }

  componentDidMount() {
    // defaulting to season 3
    this.ladderState(3);
  }

  ladderState(season){
    return axios.get(`/db-get/${season}`)
    .then(
      matches => {
        let data = matches.data
        // highly experimental
        let eloData = this.eloCalculations(data)
        data.sort((a,b) => (a.current_elo > b.current_elo) ? -1 : 1 )
        this.setState({ matchData: data });
      }
    )
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
      // console.log(player)
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

  specialBadge(player, rank){
    if (rank === 1) return '🥇 ' + player + ' 🥇'
    if (rank === 2) return '🥈 ' + player + ' 🥈'
    if (rank === 3) return '🥉 ' + player + ' 🥉'
    return player;
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
                {(this.state.activePage === 1) ?

                 <CustomRow onClick={() => this.openModal(data, index)}>
                 <td> <CustomBadge src={require(`../images/ranks/${this.getRank(index+1+this.state.startPlayer)}.png`)} /></td>
                  <td>#{index + 1 + this.state.startPlayer}</td>
                  <td>{this.specialBadge(data.name, index+1+this.state.startPlayer)}</td>
                  <td>{data.current_elo}</td>
                  <td>{(data.games.filter(game => game.result === "W")).length}</td>
                  <td>{(data.games.filter(game => game.result === "L")).length}</td>
                  <td>{data.games.length}</td>
                  <td>{Math.floor((((data.games.filter(game => game.result === "W")).length) / (data.games.length) * 100))+'%'}</td>
                 </CustomRow> :
                 <tr onClick={() => this.openModal(data, index)}>
                 <td> <CustomBadge src={require(`../images/ranks/${this.getRank(index+1+this.state.startPlayer)}.png`)} /></td>
                  <td>#{index + 1 + this.state.startPlayer}</td>
                  <td>{this.specialBadge(data.name, index+1+this.state.startPlayer)}</td>
                  <td>{data.current_elo}</td>
                  <td>{(data.games.filter(game => game.result === "W")).length}</td>
                  <td>{(data.games.filter(game => game.result === "L")).length}</td>
                  <td>{data.games.length}</td>
                  <td>{Math.floor((((data.games.filter(game => game.result === "W")).length) / (data.games.length) * 100))+'%'}</td>
                 </tr>
               }

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
