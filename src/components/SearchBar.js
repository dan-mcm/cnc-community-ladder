import React, { Component } from 'react';
import ScoreModal from '../components/ScoreModal';
import { ModalManager } from 'react-dynamic-modal';
import { CustomRow2, CustomBadge, CustomHeaderRow } from '../utils/styles';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      data: [],
      result: []
    };
    this.searchData = this.searchData.bind(this);
  }

  handleInputChange = event => {
    const query = event.target.value;
    let result = this.props.data.filter(player => player.player_name.includes(query));
    this.setState({
      query,
      result
    });
  };

  searchData(data, query) {
    return data.filter(player => player.name.includes(query));
  }

  getRank(rank) {
    if (rank <= 16) {
      return 'general';
    } else if (rank <= 200) {
      return 'major';
    } else if (rank <= 400) {
      return 'captain';
    } else if (rank <= 600) {
      return 'lieutenant';
    } else {
      return 'sergeant';
    }
  }

  openModal(data, index) {
    return ModalManager.open(
      <ScoreModal
        data={data}
        rank={data.position -1}
        playername={data.player_name}
        onRequestClose={() => true}
      />
    );
  }

  specialBadge(player, rank, total, gdi, nod, random) {
    // top 3 badges
    if (rank === 1) return '🥇 ' + player + ' 🥇';
    if (rank === 2) return '🥈 ' + player + ' 🥈';
    if (rank === 3) return '🥉 ' + player + ' 🥉';

    // most played badges
    if (player === total) return '🎖️ ' + player + ' 🎖️';
    if (player === gdi) return '🎖️ ' + player + ' 🎖️';
    if (player === nod) return '🎖️ ' + player + ' 🎖️';
    if (player === random) return '🎖️ ' + player + ' 🎖️';
    return player;
  }

  render() {
    return (
      <div>
        <p>SEARCH FOR A PLAYER</p>
        <input
          type="text"
          id="filter"
          placeholder="Enter a player name..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <br />
        <br />
        {this.state.result.length > 0 && this.state.query.length > 0 ? (
          <h3>PLAYERS FOUND</h3>
        ) : (
          ''
        )}
        {this.state.result.length > 0 && this.state.query.length > 0 ? (
          <table>
            <CustomHeaderRow>
              <th>RANK</th>
              <th>POSITION</th>
              <th>NAME</th>
              <th>POINTS</th>
              <th>WINS</th>
              <th>LOSSES</th>
              <th>PLAYED</th>
              <th>WINRATE</th>
            </CustomHeaderRow>
            {this.state.result.map(result => (
              <CustomRow2
                onClick={() =>
                  this.openModal(result, result.player_name)
                }
              >
                <td>
                  {' '}
                  <CustomBadge
                    src={require(`../images/ranks/${this.getRank(
                      this.props.data.findIndex(
                        player => player.name === result.name
                      ) + 1
                    )}.png`)}
                  />
                </td>
                <td>
                  {result.position}
                </td>
                <td>
                  {this.specialBadge(
                    result.player_name,
                    result.position,
                    this.props.highestTotal.player,
                    this.props.highestGDI.player,
                    this.props.highestNod.player,
                    this.props.highestRandom.player
                  )}
                </td>
                <td>{result.points}</td>
                <td>
                  {result.wins}
                </td>
                <td>
                  {result.loses}
                </td>
                <td>{result.played}</td>
                <td>
                  {result.winrate + '%'}
                </td>
              </CustomRow2>
            ))}
          </table>
        ) : (
          ''
        )}
        <br />
      </div>
    );
  }
}

export default SearchBar;
