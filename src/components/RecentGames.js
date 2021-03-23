import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { Flex, Box } from 'grid-styled';
import { CustomImg, StyledLink, IconImg, Wrapper } from '../utils/styles';

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
      matchData: [],
      activePage: 1,
      startMatch: 0,
      endMatch: 9,
    };
  }

  componentDidMount() {
    // defaulting to season 3
    this.getRecentMatches();
    this.lastHour();
  }

  handlePageChange(activePage) {
    let startMatch = activePage === 1 ? 0 : 9 * (activePage - 1);
    this.setState({
      activePage,
      startMatch,
      endMatch: startMatch + 9,
    });
  }

  getRecentMatches() {
    return axios.get(`/recent`).then((matches) => {
      const { data } = matches;
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

  lastHour() {
    return axios.get(`/recent/hour`).then((matches) => {
      const { data } = matches;
      this.setState({ count: data.length });
    });
  }

  stringify(data) {
    let sampleString = '';
    data.slice(0, 9).map((game) => {
      sampleString +=
        '   [  ' + game.player1_name + '-v-' + game.player2_name + '  ]   ';
    });

    return sampleString;
  }

  render() {
    return (
      <Wrapper>
        <p>Games played in the last hour: {this.state.count}</p>
        <hr />
        <h3>MOST RECENT GAMES</h3>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={9}
          totalItemsCount={this.state.matchData.length}
          pageRangeDisplayed={
            this.state.matchData.length / 9 > 10
              ? 10
              : Math.ceil(this.state.matchData.length / 9)
          }
          onChange={this.handlePageChange.bind(this)}
          prevPageText="<"
          nextPageText=">"
          itemClass="page-item"
          linkClass="page-link"
          activeLinkClass="page-selected"
        />
        <Flex style={{ flexWrap: 'wrap' }}>
          {this.state.matchData
            .slice(this.state.startMatch, this.state.endMatch)
            .map((game) => (
              <Box key={game.starttime} px={2} py={3} width={[1, 1 / 3]}>
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
                Season {game.season === 3
                  ? `${game.season}+`
                  : game.season}{' '}
                <br />
                {this.toDateString(game.starttime)} <br />
                {`${Math.floor(game.match_duration / 60)}mins ${Math.trunc(
                  game.match_duration -
                    Math.floor(game.match_duration / 60) * 60
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
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={9}
          totalItemsCount={this.state.matchData.length}
          pageRangeDisplayed={
            this.state.matchData.length / 9 > 10
              ? 10
              : Math.ceil(this.state.matchData.length / 9)
          }
          onChange={this.handlePageChange.bind(this)}
          prevPageText="<"
          nextPageText=">"
          itemClass="page-item"
          linkClass="page-link"
          activeLinkClass="page-selected"
        />
      </Wrapper>
    );
  }
}

export default RecentGames;
