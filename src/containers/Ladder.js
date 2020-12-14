import React, { Component } from 'react';
import {
  Wrapper,
  TableCentered
} from '../utils/styles';
import { ladderData } from '../utils/ladderData';
import ScoreModal from '../components/ScoreModal';
import { ModalManager } from 'react-dynamic-modal';


class Home extends Component {
  openModal(data){
        console.log(data);
       //const text = this.refs.input.value;
       ModalManager.open(<ScoreModal data={data} onRequestClose={() => true}/>);
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
           {ladderData.map(data => (
             <>
               <tr onClick={() => this.openModal(data)}>
                <td>{data.rank}</td>
                <td>{data.name}</td>
                <td>{data.points}</td>
                <td>{data.wins}</td>
                <td>{data.losses}</td>
                <td>{data.wins + data.losses}</td>
                <td>{Math.floor((data.wins / (data.losses+data.wins) * 100))+'%'}</td>
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
