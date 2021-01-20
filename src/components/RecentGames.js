import React, { Component } from 'react';
import { Wrapper } from '../utils/styles';
import { Flex, Box } from 'grid-styled';
import { CustomImg, StyledLink, IconImg } from '../utils/styles';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import randomgdi from '../images/factions/gdirandom.png';
import randomnod from '../images/factions/nodrandom.png';

const axios = require('axios').default;

class RecentGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchData: []
    };
  }

  componentDidMount() {
    // defaulting to season 3
    this.getRecentMatches();
  }

  getRecentMatches() {
    return axios.get(`/recent`).then(matches => {
      let data = matches.data;
      console.log(data);
      this.setState({ matchData: data });
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
    return (
      <Wrapper>
        <Flex style={{ flexWrap: 'wrap' }}>
          {this.state.matchData.map((game, index) => (
            <Box px={2} py={3} width={[1, 1 / 3]}>
              {game.player1_faction === 'GDI' &&
              game.player1_random === false ? (
                <IconImg src={gdi} />
              ) : (
                <IconImg src={nod} />
              )}
              <b> {game.player1_name} </b>- v -<b> {game.player2_name} </b>
              {game.player2_random}{' '}
              {game.player2_random === true ? (
                game.player2_faction === 'GDI' ? (
                  <IconImg src={randomgdi} alt="randomgdi" />
                ) : (
                  <IconImg src={randomnod} alt="randomnod" />
                )
              ) : game.player2_faction === 'GDI' ? (
                <IconImg src={gdi} alt="gdi" />
              ) : (
                <IconImg src={nod} alt="nod" />
              )}
              <br />
              Season {game.season === 3 ? `${game.season}+` : game.season}{' '}
              <br />
              {this.toDateString(game.starttime)} <br />
              {`${Math.floor(game.match_duration / 60)}mins ${Math.trunc(
                game.match_duration - Math.floor(game.match_duration / 60) * 60
              )}secs`}{' '}
              <br />
              <span style={{ color: 'green', fontWeight: 'bold' }}>
                <span role="img" aria-label="medal">
                  🏅
                </span>{' '}
                {game.result}{' '}
                <span role="img" aria-label="medal">
                  🏅
                </span>
              </span>
              <br />
              <StyledLink
                href={`https://replays.cnctdra.ea.com/${game.replay}`}
              >
                Replay
              </StyledLink>
              <br />
              {
                <CustomImg src={require(`../images/maps/${game.map}.png`)} />
              }{' '}
            </Box>
          ))}
        </Flex>
      </Wrapper>
    );
  }
}

export default RecentGames;
