import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import ScoreModal from '../components/ScoreModal';
import { ModalManager } from 'react-dynamic-modal';
import styled from 'styled-components';

const CustomBadge = styled.img`
  max-width: 50px;
  max-height: 50px;
  padding: 0px;
`

const CustomRow = styled.tr`
background-color: rgb(16,16,16);
`


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      data: [],
      result: []
    }
    this.searchData = this.searchData.bind(this);
  }

  handleInputChange = event => {
    const query = event.target.value;
    let result = this.props.data.filter(player => player.name.includes(query))
    this.setState({
      query,
      result
    })
  };

  searchData(data, query){
    return data.filter(player => player.name.includes(query))
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

  openModal(data, index){
     return ModalManager.open(
       <ScoreModal data={data} rank={this.props.data.findIndex(player => player.name === data.name)} onRequestClose={() => true}/>
     );
  }

  specialBadge(player, rank){
    if (rank === 1) return '🥇 ' + player + ' 🥇'
    if (rank === 2) return '🥈 ' + player + ' 🥈'
    if (rank === 3) return '🥉 ' + player + ' 🥉'
    return player;
  }


  render() {
    return (
      <div>
        <h3>PLAYER SEARCH</h3>
        <input
          type="text"
          id="filter"
          placeholder="Enter a player name..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <br/><br/>
        {(this.state.result.length > 0 && this.state.query.length > 0) ?
          <table>
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
          {
            this.state.result.map(
              result =>
            <CustomRow onClick={() => this.openModal(this.props.data[this.props.data.findIndex(player => player.name === result.name)], this.props.data.findIndex(player => player.name === result.name))}>
              <td> <CustomBadge src={require(`../images/ranks/${this.getRank(this.props.data.findIndex(player => player.name === result.name)+1)}.png`)} /></td>
              <td>{this.props.data.findIndex(player => player.name === result.name) + 1}</td>
              <td>{this.specialBadge(result.name, this.props.data.findIndex(player => player.name === result.name)+1)}</td>
              <td>{result.current_elo}</td>
              <td>{(result.games.filter(game => game.result === "W")).length}</td>
              <td>{(result.games.filter(game => game.result === "L")).length}</td>
              <td>{result.games.length}</td>
              <td>{Math.floor((((result.games.filter(game => game.result === "W")).length) / (result.games.length) * 100))+'%'}</td>
            </CustomRow>
            )
          }
          </table>
          : ""}
      </div>
    );
  }
}

export default SearchBar;
