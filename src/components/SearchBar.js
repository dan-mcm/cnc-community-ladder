import React, { useState } from 'react';
import ScoreModal from '../components/ScoreModal';
import { ModalManager } from 'react-dynamic-modal';
import { CustomRow2, CustomBadge, CustomHeaderRow } from '../utils/styles';

function handleInputChange(props, setQuery, setResult, event) {
  const query = event.target.value;
  let result = props.data.filter((player) =>
    player.player_name.includes(query)
  );
  setQuery(query);
  setResult(result);
}

// legacy - not in use?
// function searchData(data, query) {
//   return data.filter((player) => player.name.includes(query));
// }

function getRank(rank) {
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

function openModal(props, data, index) {
  return ModalManager.open(
    <ScoreModal
      data={data}
      rank={data.position - 1}
      season={props.season}
      playername={data.player_name}
      onRequestClose={() => true}
    />
  );
}

function specialBadge(player, rank, total, gdi, nod, random) {
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

function SearchBar(props) {
  const [query, setQuery] = useState('');
  // const [data] = useState([]) // data state value was actually unused?
  const [result, setResult] = useState([]);

  let searchInput = React.createRef();

  return (
    <div>
      <p>SEARCH FOR A PLAYER</p>
      <input
        type="text"
        id="filter"
        placeholder="Enter a player name..."
        ref={searchInput}
        // ref={(input) => (this.search = input)} // unclear intended function here - needs testing
        // ref={(input) => searchData(input)}
        onChange={(e) => handleInputChange(props, setQuery, setResult, e)}
      />
      <br />
      <br />
      {result.length > 0 && query.length > 0 ? <h3>PLAYERS FOUND</h3> : ''}
      {result.length > 0 && query.length > 0 ? (
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
          {result.map((result, index) => (
            <CustomRow2 onClick={() => openModal(props, result, index)}>
              <td>
                {' '}
                <CustomBadge
                  src={require(`../images/ranks/${getRank(
                    result.position
                  )}.png`)}
                />
              </td>
              <td>{result.position}</td>
              <td>
                {specialBadge(
                  result.player_name,
                  result.position,
                  props.highestTotal.player,
                  props.highestGDI.player,
                  props.highestNod.player,
                  props.highestRandom.player
                )}
              </td>
              <td>{result.points}</td>
              <td>{result.wins}</td>
              <td>{result.loses}</td>
              <td>{result.played}</td>
              <td>{result.winrate + '%'}</td>
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

export default SearchBar;
