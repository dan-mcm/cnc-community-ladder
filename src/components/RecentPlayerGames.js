import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomImg, CustomP, IconImg, StyledLink } from '../utils/styles';
import { Flex, Box } from 'grid-styled';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import randomgdi from '../images/factions/gdirandom.png';
import randomnod from '../images/factions/nodrandom.png';

const greenStyle = {
  color: 'green',
  fontWeight: 'bold'
};

const redStyle = {
  color: 'red',
  fontWeight: 'bold'
};

class RecentPlayerGames extends Component {
  toDateString(epochValue) {
    let date = epochValue;
    var utcSeconds = date;
    var d = new Date(0); // sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    date = d;
    return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
  }

  render() {
    return (
      <div>
        <h3>RECENT GAMES</h3>
        <Flex flexWrap="wrap">
          {this.props.matches.map((game, index) => (
            <Box key={index} px={2} py={3} width={[1, 1 / 3]}>
              <CustomP>
                {game.player_random === true ? (
                  game.player_faction === 'GDI' ? (
                    <IconImg src={randomgdi} alt="randomgdi" />
                  ) : (
                    <IconImg src={randomnod} alt="randomnod" />
                  )
                ) : game.player_faction === 'GDI' ? (
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
                {game.opponent_random === true ? (
                  game.opponent_faction === 'GDI' ? (
                    <IconImg src={randomgdi} alt="randomgdi" />
                  ) : (
                    <IconImg src={randomnod} alt="randomnod" />
                  )
                ) : game.opponent_faction === 'GDI' ? (
                  <IconImg src={gdi} alt="gdi" />
                ) : (
                  <IconImg src={nod} alt="nod" />
                )}{' '}
                <br />
                {this.toDateString(game.starttime)} <br />
                {`${Math.floor(game.duration / 60)}mins ${Math.trunc(
                  game.duration - Math.floor(game.duration / 60) * 60
                )}secs`}
                <br />
                {(game.player === this.props.playername &&
                  game.result === false) ||
                (game.opponent === this.props.playername &&
                  game.result === true) ? (
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
      </div>
    );
  }
}

RecentPlayerGames.propTypes = {
  data: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
  playername: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default RecentPlayerGames;
