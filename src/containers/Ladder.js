import React, { Component } from 'react';
import {
  Wrapper,
  TableCentered
} from '../utils/styles';
import { ladderData } from '../utils/ladderData';

class Home extends Component {
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
             <tr>
              <td>{data.rank}</td>
              <td>{data.name}</td>
              <td>{data.points}</td>
              <td>{data.wins}</td>
              <td>{data.losses}</td>
              <td>{data.wins + data.losses}</td>
              <td>{Math.floor((data.wins / (data.losses+data.wins) * 100))+'%'}</td>
             </tr>
           ))}
          </TableCentered>
          <br/>
        </div>


      </Wrapper>
    );
  }
}
export default Home;
