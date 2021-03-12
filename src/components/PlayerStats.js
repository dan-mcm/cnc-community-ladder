import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'grid-styled';
import ModalGraph from './ModalGraph';
import { IconImg } from '../utils/styles';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import random from '../images/factions/random.png';

const axios = require('axios').default;

const plainStyle = {
  color: 'white',
  fontWeight: 'bold'
};

class PlayerStats extends Component {
  toDateString(epochValue) {
    let date = epochValue;
    const utcSeconds = date;
    const d = new Date(0); // Sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    date = d;
    return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
  }

  gamesWon(data, faction, playername) {
    if (faction === 'random') {
      return data.filter(
        game =>
          (game.player === playername &&
            game.result === false &&
            game.player_random === true) ||
          (game.opponent === playername &&
            game.result === true &&
            game.opponent_random === true)
      ).length;
    }

    return data.filter(
      game =>
        (game.player === playername &&
          game.result === false &&
          game.player_faction === faction &&
          (game.player_random === false || game.player_random === null)) ||
        (game.opponent === playername &&
          game.result === true &&
          game.opponent_faction === faction &&
          (game.opponent_random === false || game.opponent_random === null))
    ).length;
  }

  gamesLost(data, faction, playername) {
    if (faction === 'random') {
      return data.filter(
        game =>
          (game.player === playername &&
            game.result === true &&
            game.player_random === true) ||
          (game.opponent === playername &&
            game.result === false &&
            game.opponent_random === true)
      ).length;
    }
    return data.filter(
      game =>
        (game.player === playername &&
          game.result === true &&
          game.player_faction === faction &&
          (game.player_random === false || game.player_random === null)) ||
        (game.opponent === playername &&
          game.result === false &&
          game.opponent_faction === faction &&
          (game.opponent_random === false || game.opponent_random === null))
    ).length;
  }

  winRate(data, faction, playername) {
    const wins = this.gamesWon(data, faction, playername);
    const loses = this.gamesLost(data, faction, playername);
    const result = Math.floor((wins / (wins + loses)) * 100);
    return wins > 0 ? result : 0;
  }

  render() {
    const { playername } = this.props;
    return (
      <div style={plainStyle}>
        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <span role="img" aria-label="trophy">
              🏆
            </span>{' '}
            TOTAL WINS <br />
            {
              this.props.matches.filter(game => {
                return (
                  (game.result === false && game.player === playername) ||
                  (game.result === true && game.opponent === playername)
                );
              }).length
            }
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <span role="img" aria-label="x">
              ❌
            </span>{' '}
            TOTAL LOSSES <br />
            {
              this.props.matches.filter(game => {
                return (
                  (game.result === true && game.player === playername) ||
                  (game.result === false && game.opponent === playername)
                );
              }).length
            }
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <span role="img" aria-label="play">
              ▶️
            </span>{' '}
            TOTAL PLAYED <br />
            {this.props.matches.length}
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <span role="img" aria-label="graph">
              📈
            </span>{' '}
            OVERALL WINRATE <br />{' '}
            {Math.floor(
              (this.props.matches.filter(
                game =>
                  (game.result === false && game.player === playername) ||
                  (game.result === true && game.opponent === playername)
              ).length /
                this.props.matches.length) *
                100
            ) + '%'}
          </Box>
        </Flex>
        <br />
        <hr />
        <h3>FACTION STATS</h3>
        <br />
        <Flex>
          {this.props.matches.filter(
            game =>
              (game.player === playername &&
                game.player_faction === 'GDI' &&
                game.player_random === false) ||
              (game.opponent === playername &&
                game.player_faction === 'GDI' &&
                game.opponent_random === false)
          ).length > 0 ? (
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <IconImg src={gdi} alt="gdi" />
              <br />
              GAMES WON - {this.gamesWon(this.props.matches, 'GDI', playername)}
              <br />
              GAMES LOST -{' '}
              {this.gamesLost(this.props.matches, 'GDI', playername)}
              <br />
              WINRATE - {this.winRate(this.props.matches, 'GDI', playername)}%
            </Box>
          ) : (
            ''
          )}
          {this.props.matches.filter(
            game =>
              (game.player === playername &&
                game.player_faction === 'Nod' &&
                game.player_random === false) ||
              (game.opponent === playername &&
                game.player_faction === 'Nod' &&
                game.opponent_random === false)
          ).length > 0 ? (
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <IconImg src={nod} alt="nod" />
              <br />
              GAMES WON -
              {' ' + this.gamesWon(this.props.matches, 'Nod', playername)}
              <br />
              GAMES LOST -
              {' ' + this.gamesLost(this.props.matches, 'Nod', playername)}
              <br />
              WINRATE -
              {' ' + this.winRate(this.props.matches, 'Nod', playername)}%
            </Box>
          ) : (
            ''
          )}
          {this.props.matches.filter(
            game =>
              (game.player === playername && game.player_random === true) ||
              (game.opponent === playername && game.opponent_random === true)
          ).length > 0 ? (
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <IconImg src={random} alt="random" />
              <br />
              GAMES WON -
              {' ' + this.gamesWon(this.props.matches, 'random', playername)}
              <br />
              GAMES LOST -
              {' ' + this.gamesLost(this.props.matches, 'random', playername)}
              <br />
              WINRATE -
              {' ' + this.winRate(this.props.matches, 'random', playername)}%
            </Box>
          ) : (
            ''
          )}
        </Flex>
        <br />
        <hr />
        <ModalGraph
          matches={this.props.matches}
          playername={playername}
          key={this.props.matches}
        />
        <br />
        <hr />
      </div>
    );
  }
}

PlayerStats.propTypes = {
  data: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
  playername: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default PlayerStats;
