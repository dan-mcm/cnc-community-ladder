import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScoreModal from './ScoreModal';
import { ModalManager } from 'react-dynamic-modal';
import { CustomBadge, CustomRow, Overflow, TableFormat } from '../utils/styles';

class Leaderboard extends Component {
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

  specialBadge(player, rank, total, gdi, nod, random) {
    // Top 3 badges
    if (rank === 1) return '🥇 ' + player + ' 🥇';
    if (rank === 2) return '🥈 ' + player + ' 🥈';
    if (rank === 3) return '🥉 ' + player + ' 🥉';

    // Most played badges
    if (player === total) return '🎖️ ' + player + ' 🎖️';
    if (player === gdi) return '🎖️ ' + player + ' 🎖️';
    if (player === nod) return '🎖️ ' + player + ' 🎖️';
    if (player === random) return '🎖️ ' + player + ' 🎖️';
    return player;
  }

  openModal(data, index) {
    return ModalManager.open(
      <ScoreModal
        data={data}
        rank={index + this.props.startPlayer}
        onRequestClose={() => true}
      />
    );
  }

  render() {
    return (
      <Overflow>
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
          {this.props.data
            .slice(this.props.startPlayer, this.props.endPlayer)
            .map((data, index) => (
              <>
                {this.props.activePage === 1 ? (
                  <CustomRow
                    key={data.name}
                    onClick={() => this.openModal(data, index)}
                  >
                    <td>
                      {' '}
                      <CustomBadge
                        src={require(`../images/ranks/${this.getRank(
                          index + 1 + this.props.startPlayer
                        )}.png`)}
                      />
                    </td>
                    <td>#{index + 1 + this.props.startPlayer}</td>
                    <td>
                      {this.specialBadge(
                        data.name,
                        index + 1 + this.props.startPlayer,
                        this.props.highestTotal.player,
                        this.props.highestGDI.player,
                        this.props.highestNod.player,
                        this.props.highestRandom.player
                      )}
                    </td>
                    <td>{data.current_elo}</td>
                    <td>
                      {data.games.filter(game => game.result === 'W').length}
                    </td>
                    <td>
                      {data.games.filter(game => game.result === 'L').length}
                    </td>
                    <td>{data.games.length}</td>
                    <td>
                      {Math.floor(
                        (data.games.filter(game => game.result === 'W').length /
                          data.games.length) *
                          100
                      ) + '%'}
                    </td>
                  </CustomRow>
                ) : (
                  <tr onClick={() => this.openModal(data, index)}>
                    <td>
                      {' '}
                      <CustomBadge
                        src={require(`../images/ranks/${this.getRank(
                          index + 1 + this.props.startPlayer
                        )}.png`)}
                      />
                    </td>
                    <td>#{index + 1 + this.props.startPlayer}</td>
                    <td>
                      {this.specialBadge(
                        data.name,
                        index + 1 + this.props.startPlayer
                      )}
                    </td>
                    <td>{data.current_elo}</td>
                    <td>
                      {data.games.filter(game => game.result === 'W').length}
                    </td>
                    <td>
                      {data.games.filter(game => game.result === 'L').length}
                    </td>
                    <td>{data.games.length}</td>
                    <td>
                      {Math.floor(
                        (data.games.filter(game => game.result === 'W').length /
                          data.games.length) *
                          100
                      ) + '%'}
                    </td>
                  </tr>
                )}
              </>
            ))}
        </TableFormat>
      </Overflow>
    );
  }
}

Leaderboard.propTypes = {
  highestGDI: PropTypes.object.isRequired,
  highestNod: PropTypes.object.isRequired,
  highestRandom: PropTypes.object.isRequired,
  highestTotal: PropTypes.object.isRequired,
  startPlayer: PropTypes.number.isRequired,
  endPlayer: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired
};

export default Leaderboard;
