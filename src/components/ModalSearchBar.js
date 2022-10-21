import React, { useState } from 'react';
import { CustomP, CustomImg, IconImg, StyledLink } from '../utils/styles';
import { Flex, Box } from 'grid-styled';

// icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';

const greenStyle = {
  color: 'green',
  fontWeight: 'bold',
};

const redStyle = {
  color: 'red',
  fontWeight: 'bold',
};

function handleInputChange(props, setResult, event) {
  const query = event.target.value;
  // console.log(Object.keys(this.props.data));
  let result = props.data.filter(
    (game) => game.opponent.includes(query) || game.player.includes(query)
  );
  if (result.length === props.data.length) result = [];
  setResult(result);
}

// legacy - not in use?
// function searchData(data, query) {
//   return data.filter(
//     (player) => player.player.includes(query) || player.opponent.includes(query)
//   );
// }

function toDateString(epochValue) {
  let date = epochValue;
  var utcSeconds = date;
  var d = new Date(0); // sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  date = d;
  return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
}

// TODO needs testing to verify functionality as certain values seem to have been left unused?
function ModalSearchBar(props) {
  // const [query, setQuery] = useState(''); // query state value was actually unused before? - needs testing
  // const [data] = useState([]);
  const [result, setResult] = useState([]);

  const { playername } = props;

  return (
    <div>
      <p>SEARCH FOR AN OPPONENT</p>
      <input
        type="text"
        id="filter"
        placeholder="Enter a player name..."
        ref={(input) => (this.search = input)} // unclear intended function here - needs testing
        // ref={(input) => searchData(data, input)}
        onChange={handleInputChange(props, setResult)}
      />
      <br />
      {result.length > 0 ? <h3>GAMES FOUND</h3> : ''}
      <Flex flexWrap="wrap">
        {result.map((game) => (
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <CustomP>
              {game.player_faction === 'GDI' ? (
                <IconImg src={gdi} alt="gdi" />
              ) : (
                <IconImg src={nod} alt="nod" />
              )}
              <b> {game.player}</b> [
              {game.player_new_elo - game.player_existing_elo > 0 ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  +{game.player_new_elo - game.player_existing_elo}
                </span>
              ) : (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  {game.player_new_elo - game.player_existing_elo}
                </span>
              )}
              ] -v- [
              {game.opponent_new_elo - game.opponent_existing_elo > 0 ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  +{game.opponent_new_elo - game.opponent_existing_elo}
                </span>
              ) : (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  {game.opponent_new_elo - game.opponent_existing_elo}
                </span>
              )}
              ] <b>{game.opponent} </b>
              {game.opponent_faction === 'GDI' ? (
                <IconImg src={gdi} alt="gdi" />
              ) : (
                <IconImg src={nod} alt="nod" />
              )}{' '}
              <br />
              {toDateString(game.starttime)} <br />
              {`${Math.floor(game.duration / 60)}mins ${Math.trunc(
                game.duration - Math.floor(game.duration / 60) * 60
              )}secs`}
              <br />
              {(game.player === playername && game.result === false) ||
              (game.opponent === playername && game.result === true) ? (
                <span style={greenStyle}>Win</span>
              ) : (
                <span style={redStyle}>Loss</span>
              )}{' '}
              <br />
              <StyledLink href={game.replay}>Replay File</StyledLink> <br />
              <CustomImg src={require(`../images/maps/${game.map}.png`)} />
              <br />
            </CustomP>
          </Box>
        ))}
      </Flex>
      <br />
      {result.length > 0 ? <hr /> : ''}
    </div>
  );
}

export default ModalSearchBar;
