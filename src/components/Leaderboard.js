import React from 'react';
import PropTypes from 'prop-types';
import ScoreModal from './ScoreModal';
import { ModalManager } from 'react-dynamic-modal';
import { CustomBadge, CustomRow, Overflow, TableFormat } from '../utils/styles';

function getRank(rank) {
  if (rank <= 16) {
    return 'general';
  }

  if (rank <= 200) {
    return 'major';
  }

  if (rank <= 400) {
    return 'captain';
  }

  if (rank <= 600) {
    return 'lieutenant';
  }
  return 'sergeant';
}

function specialBadge(player, rank, total, gdi, nod, random) {
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

function openModal(props, data, index) {
  return ModalManager.open(
    <ScoreModal
      data={data}
      playername={data.player_name}
      rank={index + props.startPlayer}
      season={props.season}
      onRequestClose={() => true}
    />
  );
}

function Leaderboard(props) {
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
        {props.data
          .slice(props.startPlayer, props.endPlayer)
          .map((data, index) => (
            <>
              {props.activePage === 1 ? (
                <CustomRow onClick={() => openModal(props, data, index)}>
                  <td>
                    {' '}
                    <CustomBadge
                      src={require(`../images/ranks/${getRank(
                        index + 1 + props.startPlayer
                      )}.png`)}
                    />
                  </td>
                  <td>#{index + 1 + props.startPlayer}</td>
                  <td>
                    {specialBadge(
                      data.player_name,
                      index + 1 + props.startPlayer,
                      props.highestTotal.player,
                      props.highestGDI.player,
                      props.highestNod.player,
                      props.highestRandom.player
                    )}
                  </td>
                  <td>{data.points}</td>
                  <td>{data.wins}</td>
                  <td>{data.loses}</td>
                  <td>{data.played}</td>
                  <td>{data.winrate + '%'}</td>
                </CustomRow>
              ) : (
                <tr onClick={() => openModal(props, data, index)}>
                  <td>
                    {' '}
                    <CustomBadge
                      src={require(`../images/ranks/${getRank(
                        index + 1 + props.startPlayer
                      )}.png`)}
                    />
                  </td>
                  <td>#{index + 1 + props.startPlayer}</td>
                  <td>
                    {specialBadge(
                      data.player_name,
                      index + 1 + props.startPlayer,
                      props.highestTotal.player,
                      props.highestGDI.player,
                      props.highestNod.player,
                      props.highestRandom.player
                    )}
                  </td>
                  <td>{data.points}</td>
                  <td>{data.wins}</td>
                  <td>{data.loses}</td>
                  <td>{data.length}</td>
                  <td>{data.winrate + '%'}</td>
                </tr>
              )}
            </>
          ))}
      </TableFormat>
    </Overflow>
  );
}

Leaderboard.propTypes = {
  highestGDI: PropTypes.object.isRequired,
  highestNod: PropTypes.object.isRequired,
  highestRandom: PropTypes.object.isRequired,
  highestTotal: PropTypes.object.isRequired,
  startPlayer: PropTypes.number.isRequired,
  endPlayer: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default Leaderboard;
