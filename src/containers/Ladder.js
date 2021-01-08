import React, { Component } from 'react';
import {
  Wrapper,
  TableFormat
} from '../utils/styles';
import styled from 'styled-components';
import ScoreModal from '../components/ScoreModal';
import { ModalManager } from 'react-dynamic-modal';
import { Flex, Box } from 'grid-styled';

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
      matchData: []
    }
  }

  openModal(data, index){
       //const text = this.refs.input.value;
       ModalManager.open(
         <ScoreModal data={data} rank={index} onRequestClose={() => true}/>
       );
    }

  // sample call to get recent games... need some parsing logic to integrate it...
  componentDidMount() {
    axios.get('/db-get')
    .then(
      matches => {
        let data = this.DBdataTranslation(matches.data)
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
      } else {
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
      } else {
        // second case if we have encountered player2 yet...
        let index = output.findIndex(player => player.name === match.player1_name)

        return output[index].games.push(
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
    })
    return output
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
          <CustomP>A natural extension of the official Season 3 ladder using the same maps, considers a starting ELO level of 1,000 for each player starting from the 01/01/2021</CustomP>
          <CustomP>Start: 01/01/21 00:00 GMT <br/>
          End: TBC</CustomP>

          <CustomP>Total Players: {this.state.matchData.length}</CustomP>
          <TableFormat>
           <tr>
             <th>RANK</th>
             <th>NAME</th>
             <th>POINTS</th>
             <th>WINS</th>
             <th>LOSSES</th>
             <th>PLAYED</th>
             <th>WIN RATE</th>
           </tr>
           {this.state.matchData.map((data, index) => (
             <>
               <tr onClick={() => this.openModal(data, index)}>
                <td>{data.score}</td>
                <td>{data.name}</td>
                <td>{data.points}</td>
                <td>{(data.games.filter(game => game.result === "W")).length}</td>
                <td>{(data.games.filter(game => game.result === "L")).length}</td>
                <td>{data.games.length}</td>
                <td>{Math.floor((((data.games.filter(game => game.result === "W")).length) / (data.games.length) * 100))+'%'}</td>
               </tr>

             </>
           ))}
          </TableFormat>
          <br/>
        </div>
        <div>
     </div>

      </Wrapper>
    );
  }
}
export default Ladder;
