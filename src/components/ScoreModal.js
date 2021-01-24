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
                {this.state.matches.filter(game => game.result === true).length}
              </Box>
              <Box px={2} py={3} width={[1, 1 / 4]}>
                <span role="img" aria-label="x">
                  ❌
                </span>{' '}
                TOTAL LOSSES <br />
                {this.state.matches.filter(game => game.result === false).length}
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
                  (this.state.matches.filter(game => game.result === true).length /
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
                  game.player_faction === 'GDI' && game.player_random === false
              ).length > 0 ? (
                <Box px={2} py={3} width={[1, 1 / 3]}>
                  <IconImg src={gdi} alt="gdi" />
                  <br />
                  GAMES WON -{' '}
                  {
                    this.state.matches.filter(
                      game =>
                        game.result === true &&
                        game.player_faction === 'GDI' &&
                        (game.player_random === false ||
                          game.player_random === null)
                    ).length
                  }
                  <br />
                  GAMES LOST -{' '}
                  {
                    this.state.matches.filter(
                      game =>
                        game.result === false &&
                        game.player_faction === 'GDI' &&
                        (game.player_random === false ||
                          game.player_random === null)
                    ).length
                  }
                  <br />
                  WINRATE -{' '}
                  {this.state.matches.filter(
                    game =>
                      game.result === true &&
                      game.player_faction === 'GDI' &&
                      (game.player_random === false ||
                        game.player_random === null)
                  ).length > 0
                    ? Math.floor(
                        (this.state.matches.filter(
                          game =>
                            game.result === true &&
                            game.player_faction === 'GDI' &&
                            (game.player_random === false ||
                              game.player_random === null)
                        ).length /
                          (this.state.matches.filter(
                            game =>
                              game.result === true &&
                              game.player_faction === 'GDI' &&
                              (game.player_random === false ||
                                game.player_random === null)
                          ).length +
                            this.state.matches.filter(
                              game =>
                                game.result === false &&
                                game.player_faction === 'GDI' &&
                                (game.player_random === false ||
                                  game.player_random === null)
                            ).length)) *
                          100
                      )
                    : 0}
                  %
                </Box>
              ) : (
                ''
              )}
              {this.state.matches.filter(
                game =>
                  game.player_faction === 'Nod' && game.player_random === false
              ).length > 0 ? (
                <Box px={2} py={3} width={[1, 1 / 3]}>
                  <IconImg src={nod} alt="nod" />
                  <br />
                  GAMES WON -{' '}
                  {
                    this.state.matches.filter(
                      game =>
                        game.result === true &&
                        game.player_faction === 'Nod' &&
                        (game.player_random === false ||
                          game.player_random === null)
                    ).length
                  }
                  <br />
                  GAMES LOST -{' '}
                  {
                    this.state.matches.filter(
                      game =>
                        game.result === false &&
                        game.player_faction === 'Nod' &&
                        (game.player_random === false ||
                          game.player_random === null)
                    ).length
                  }
                  <br />
                  WINRATE -{' '}
                  {this.state.matches.filter(
                    game =>
                      game.result === true &&
                      game.player_faction === 'Nod' &&
                      (game.player_random === false ||
                        game.player_random === null)
                  ).length > 0
                    ? Math.floor(
                        (this.state.matches.filter(
                          game =>
                            game.result === true &&
                            game.player_faction === 'Nod' &&
                            (game.player_random === false ||
                              game.player_random === null)
                        ).length /
                          (this.state.matches.filter(
                            game =>
                              game.result === true &&
                              game.player_faction === 'Nod' &&
                              (game.player_random === false ||
                                game.player_random === null)
                          ).length +
                            this.state.matches.filter(
                              game =>
                                game.result === false &&
                                game.player_faction === 'Nod' &&
                                (game.player_random === false ||
                                  game.player_random === null)
                            ).length)) *
                          100
                      )
                    : 0}
                  %
                </Box>
              ) : (
                ''
              )}
              {this.state.matches.filter(game => game.player_random === true).length >
              0 ? (
                <Box px={2} py={3} width={[1, 1 / 3]}>
                  <IconImg src={random} alt="random" />
                  <br />
                  GAMES WON -{' '}
                  {
                    this.state.matches.filter(
                      game => game.result === true && game.player_random === true
                    ).length
                  }
                  <br />
                  GAMES LOST -{' '}
                  {
                    this.state.matches.filter(
                      game => game.result === false && game.player_random === true
                    ).length
                  }
                  <br />
                  WINRATE -{' '}
                  {this.state.matches.filter(
                    game => game.result === true && game.player_random === true
                  ).length > 0
                    ? Math.floor(
                        (this.state.matches.filter(
                          game =>
                            game.result === true && game.player_random === true
                        ).length /
                          (this.state.matches.filter(
                            game =>
                              game.result === true && game.player_random === true
                          ).length +
                            this.state.matches.filter(
                              game =>
                                game.result === false &&
                                game.player_random === true
                            ).length)) *
                          100
                      )
                    : 0}
                  %
                </Box>
              ) : (
                ''
              )}
            </Flex>
            <br />
            <hr />
          </div>
          <ModalSearchBar data={this.state.matches} />
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
                    {game.result === true ? (
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
