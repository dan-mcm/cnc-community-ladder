import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import {
  CustomImg,
  CustomP,
  IconImg,
  ModalWrap,
  StyledLink
} from '../utils/styles';
import { Flex, Box } from 'grid-styled';
import ModalSearchBar from './ModalSearchBar';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import random from '../images/factions/random.png';
import randomgdi from '../images/factions/gdirandom.png';
import randomnod from '../images/factions/nodrandom.png';

const axios = require('axios').default;


const greenStyle = {
  color: 'green',
  fontWeight: 'bold'
};

const redStyle = {
  color: 'red',
  fontWeight: 'bold'
};

const plainStyle = {
  color: 'white',
  fontWeight: 'bold'
};

const modalStyle = {
  color: 'yellow',
  backgroundColor: 'black'
};

class ScoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    // defaulting to season 3
    this.scoreState(this.props.season, this.props.data.player_name);
  }

  scoreState(season, player){
    return axios.get(`/elohistory/${season}/${player}`).then(matches => {
      let data = matches.data;
      this.setState({ matches: data });
    });
  }

  toDateString(epochValue) {
    let date = epochValue;
    const utcSeconds = date;
    const d = new Date(0); // Sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    date = d;
    return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
  }

  gamesWon(data, faction, playername){
    if(faction === 'random'){
      return data.filter(
        game =>
        ((
          game.player === playername &&
          game.result === false &&
          game.player_random === true
          ) ||
          (
            game.opponent === playername &&
            game.result === true &&
            game.opponent_random === true
          ))
        ).length
    } else {
      return data.filter(
        game =>
        ((
          game.player === playername &&
          game.result === false &&
          game.player_faction === faction &&
          (game.player_random === false ||
            game.player_random === null)
          ) ||
          (
            game.opponent === playername &&
            game.result === true &&
            game.opponent_faction === faction &&
            (game.opponent_random === false ||
              game.opponent_random === null)
            ))
      ).length
    }
  }

  gamesLost(data, faction, playername){
    if(faction === 'random'){
      return data.filter(
        game =>
        ((
          game.player === playername &&
          game.result === true &&
          game.player_random === true
          ) ||
          (
            game.opponent === playername &&
            game.result === false &&
            game.opponent_random === true
          ))
      ).length
    } else {
      return data.filter(
        game =>
        ((
          game.player === playername &&
          game.result === true &&
          game.player_faction === faction &&
          (game.player_random === false ||
            game.player_random === null)
          ) ||
          (
            game.opponent === playername &&
            game.result === false &&
            game.opponent_faction === faction &&
            (game.opponent_random === false ||
              game.opponent_random === null)
            ))
      ).length
    }
  }

  winRate(data, faction, playername){
    let wins = this.gamesWon(data, faction, playername)
    let loses = this.gamesLost(data, faction, playername)
    let result = Math.floor((wins / (wins + loses)) * 100)
    console.log(`WINS ${wins} LOSES ${loses} RESULTS: ${result}`)
    return wins > 0 ? result : 0
  }

  render() {
    const { playername, season, rank, onRequestClose } = this.props;

    return (
      <Modal
        styles={modalStyle}
        effect={Effect.ScaleUp}
        onRequestClose={onRequestClose}
      >
        <ModalWrap>
          <h3>
            #{rank + 1} {playername}
          </h3>
          <br />
          <hr />
          <br />
          <div style={plainStyle}>
            <Flex flexWrap="wrap">
              <Box px={2} py={3} width={[1, 1 / 4]}>
                <span role="img" aria-label="trophy">
                  🏆
                </span>{' '}
                TOTAL WINS <br />
                {this.state.matches.filter(game => { return ((game.result === false && game.player === playername) || (game.result === true && game.opponent === playername)) }).length}
              </Box>
              <Box px={2} py={3} width={[1, 1 / 4]}>
                <span role="img" aria-label="x">
                  ❌
                </span>{' '}
                TOTAL LOSSES <br />
                {this.state.matches.filter(game => { return ((game.result === true && game.player === playername) || (game.result === false && game.opponent === playername)) }).length}
              </Box>
              <Box px={2} py={3} width={[1, 1 / 4]}>
                <span role="img" aria-label="play">
                  ▶️
                </span>{' '}
                TOTAL PLAYED <br />
                {this.state.matches.length}
              </Box>
              <Box px={2} py={3} width={[1, 1 / 4]}>
                <span role="img" aria-label="graph">
                  📈
                </span>{' '}
                OVERALL WINRATE <br />{' '}
                {Math.floor(
                  (this.state.matches.filter(game => ((game.result === false && game.player === playername) || (game.result === true && game.opponent === playername))).length /
                    this.state.matches.length) *
                    100
                ) + '%'}
              </Box>
            </Flex>
            <br />
            <hr />
            <h3>FACTION STATS</h3>
            <br />
            <Flex>
              {this.state.matches.filter(
                game =>
                  ((game.player === playername && game.player_faction === 'GDI' && game.player_random === false) ||
                  (game.opponent === playername && game.player_faction === 'GDI' && game.opponent_random === false))
              ).length > 0 ? (
                <Box px={2} py={3} width={[1, 1 / 3]}>
                  <IconImg src={gdi} alt="gdi" />
                  <br />
                  GAMES WON -{' '}
                  {
                    this.gamesWon(this.state.matches, 'GDI', playername)
                  }
                  <br />
                  GAMES LOST -{' '}
                  {
                    this.gamesLost(this.state.matches, 'GDI', playername)
                  }
                  <br />
                  WINRATE -{' '}
                  {
                    this.winRate(this.state.matches, 'GDI', playername)
                  }
                  %
                </Box>
              ) : (
                ''
              )}
              {this.state.matches.filter(
                game =>
                ((game.player === playername && game.player_faction === 'Nod' && game.player_random === false) ||
                (game.opponent === playername && game.player_faction === 'Nod' && game.opponent_random === false))
              ).length > 0 ? (
                <Box px={2} py={3} width={[1, 1 / 3]}>
                  <IconImg src={nod} alt="nod" />
                  <br />
                  GAMES WON -{
                    ' ' + this.gamesWon(this.state.matches, 'Nod', playername)
                  }
                  <br />
                  GAMES LOST -{
                    ' ' + this.gamesLost(this.state.matches, 'Nod', playername)
                  }
                  <br />
                  WINRATE -{
                    ' ' + this.winRate(this.state.matches, 'Nod', playername)
                  }
                  %
                </Box>
              ) : (
                ''
              )}
              {this.state.matches.filter(
                game =>
                ((game.player=== playername && game.player_random === true) ||
                (game.opponent === playername && game.opponent_random === true))
              ).length >
              0 ? (
                <Box px={2} py={3} width={[1, 1 / 3]}>
                  <IconImg src={random} alt="random" />
                  <br />
                  GAMES WON -{
                    ' ' + this.gamesWon(this.state.matches, 'random', playername)
                  }
                  <br />
                  GAMES LOST -{
                    ' ' + this.gamesLost(this.state.matches, 'random', playername)
                  }
                  <br />
                  WINRATE -{
                    ' ' + this.winRate(this.state.matches, 'random', playername)}
                  %
                </Box>
              ) : (
                ''
              )}
            </Flex>
            <br />
            <hr />
          </div>
          <ModalSearchBar data={this.state.matches} playername={playername} />
          <h3>RECENT GAMES</h3>
          <Flex flexWrap="wrap">
            {this.state.matches.map((game, index) => (
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
                    {
                      ((game.player === playername && game.result === false) ||
                      (game.opponent === playername && game.result === true)) ? (
                      <span style={greenStyle}>Win</span>
                    ) : (
                      <span style={redStyle}>Loss</span>
                    )}{' '}
                    <br />
                    <StyledLink href={game.replay}>Replay File</StyledLink>{' '}
                    <br />
                    <CustomImg
                      src={require(`../images/maps/${game.map}.png`)}
                    />
                    <br />
                  </CustomP>
                </Box>
              ))}
          </Flex>
          <br />
          <br />
          <button onClick={ModalManager.close}>Close</button>
          <br />
          <br />
        </ModalWrap>
      </Modal>
    );
  }
}

ScoreModal.propTypes = {
  data: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default ScoreModal;
