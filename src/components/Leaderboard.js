import React, { Component } from 'react';
import ScoreModal from '../components/ScoreModal';
import { ModalManager } from 'react-dynamic-modal';
import styled from 'styled-components';
import {
  Wrapper,
  TableFormat
} from '../utils/styles';

const CustomBadge = styled.img`
  max-width: 40px;
  max-height: 40px;
  padding: 0px;
  margin: 0px;
`

const CustomHeaderRow = styled.tr`
  border-bottom: 2px solid white;
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

class Leaderboard extends Component {
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

  openModal(data, index){
     return ModalManager.open(
       <ScoreModal data={data} rank={index + this.props.startPlayer} onRequestClose={() => true}/>
     );
  }

  render() {
    return (
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
       {this.props.data.slice(this.props.startPlayer, this.props.endPlayer).map((data, index) => (
         <>
            {(this.props.activePage === 1) ?

             <CustomRow onClick={() => this.openModal(data, index)}>
             <td> <CustomBadge src={require(`../images/ranks/${this.getRank(index+1+this.props.startPlayer)}.png`)} /></td>
              <td>#{index + 1 + this.props.startPlayer}</td>
              <td>{this.specialBadge(data.name, index+1+this.props.startPlayer)}</td>
              <td>{data.current_elo}</td>
              <td>{(data.games.filter(game => game.result === "W")).length}</td>
              <td>{(data.games.filter(game => game.result === "L")).length}</td>
              <td>{data.games.length}</td>
              <td>{Math.floor((((data.games.filter(game => game.result === "W")).length) / (data.games.length) * 100))+'%'}</td>
             </CustomRow> :
             <tr onClick={() => this.openModal(data, index)}>
             <td> <CustomBadge src={require(`../images/ranks/${this.getRank(index+1+this.props.startPlayer)}.png`)} /></td>
              <td>#{index + 1 + this.props.startPlayer}</td>
              <td>{this.specialBadge(data.name, index+1+this.props.startPlayer)}</td>
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
    );
  }
}

export default Leaderboard;
