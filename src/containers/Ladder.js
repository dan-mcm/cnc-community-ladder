import React, { Component } from 'react';
import {
  Wrapper,
  TableCentered
} from '../utils/styles';
import { ladderData } from '../utils/ladderData';
import ScoreModal from '../components/ScoreModal';
import { ModalManager } from 'react-dynamic-modal';


class Home extends Component {
  openModal(data, index){
       //const text = this.refs.input.value;
       ModalManager.open(<ScoreModal data={data} rank={index} onRequestClose={() => true}/>);
    }

  render() {
    return (
      <Wrapper>
        <div>
          <h3>🏆 Season 4 Ladder 🏆</h3>
          <p>Start: 01/01/21 12:00 GMT</p>
          <p>End: 31/01/21 12:00 GMT</p>
          <TableCentered>
           <tr>
             <th>Rank</th>
             <th>Name</th>
             <th>Points</th>
             <th>Wins</th>
             <th>Losses</th>
             <th>Played</th>
             <th>Win Rate</th>
           </tr>
           {ladderData.map((data, index) => (
             <>
               <tr onClick={() => this.openModal(data, index)}>
                <td>{index+1}</td>
                <td>{data.name}</td>
                <td>{data.points}</td>
                <td>{(data.games.filter(game => game.result === "W")).length}</td>
                <td>{(data.games.filter(game => game.result === "L")).length}</td>
                <td>{data.games.length}</td>
                <td>{Math.floor((((data.games.filter(game => game.result === "W")).length) / (data.games.length) * 100))+'%'}</td>
               </tr>

             </>
           ))}
          </TableCentered>
          <br/>
        </div>
        <div>
     </div>

      </Wrapper>
    );
  }
}
export default Home;
