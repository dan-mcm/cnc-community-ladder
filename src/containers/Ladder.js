import React, { Component } from 'react';
import { Wrapper } from '../utils/styles';
import SearchBar from '../components/SearchBar';
import { Flex, Box } from 'grid-styled';
import Pagination from 'react-js-pagination';
import ScrollToTop from '../components/Scroll.js';
import Veterans from '../components/Veterans.js';
import Leaderboard from '../components/Leaderboard.js';
import { CustomP, CustomImage } from '../utils/styles';

const axios = require('axios').default;

class Ladder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      startPlayer: 0,
      endPlayer: 200,
      matchData: [],
      highestTotal: {},
      highestGDI: {},
      highestNod: {},
      highestRandom: {},
      selectedSeason: 0,
      maxSeason: 0,
      leaderboard: [],
    };
  }

  componentDidMount() {
    this.seasonState();
    this.ladderState(this.state.selectedSeason);
    this.awardState(this.state.selectedSeason);
  }

  // componentDidUpdate(prevProps,prevState) {
  //   if (prevState.selected !== this.state.selectedSeason) {
  //     this.awardState(this.state.selectedSeason);
  //   }
  // }

  handlePageChange(activePage) {
    let startPlayer = activePage === 1 ? 0 : 200 * (activePage - 1);
    this.setState({
      activePage,
      startPlayer,
      endPlayer: startPlayer + 200,
    });
  }

  ladderState(season) {
    return axios.get(`/leaderboard/${season}`).then((matches) => {
      let data = matches.data;
      this.setState({ leaderboard: data });
    });
  }

  seasonState() {
    let currentSeason;
    let currentDate = Date.now() / 1000;

    // 2021 months
    let jan = 1609459200;
    let apr = 1617235200;
    let july = 1625097600;
    let oct = 1633046400;
    // 2022 months
    let jan2 = 1640995200;
    let apr2 = 1648771200;
    let july2 = 1656633600;
    let oct2 = 1664582400;
    // 2023 months
    let jan3 = 1672531200;
    let apr3 = 1680307200;
    let july3 = 1688169600;
    let oct3 = 1696118400;
    // 2024 months
    let jan4 = 1704067200;
    let apr4 = 1711929600;
    let july4 = 1719792000;
    let oct4 = 1727740800;
    // 2025 months+
    let jan5 = 1735689600;

    // 2021
    if (currentDate >= jan && currentDate < apr) currentSeason = 3;
    if (currentDate >= apr && currentDate < july) currentSeason = 4;
    if (currentDate >= july && currentDate < oct) currentSeason = 5;
    if (currentDate >= oct && currentDate < jan2) currentSeason = 6;
    // 2022
    if (currentDate >= jan2 && currentDate < apr2) currentSeason = 7;
    if (currentDate >= apr2 && currentDate < july2) currentSeason = 8;
    if (currentDate >= july2 && currentDate < oct2) currentSeason = 9;
    if (currentDate >= oct2 && currentDate < jan3) currentSeason = 10;
    // 2023
    if (currentDate >= jan3 && currentDate < apr3) currentSeason = 11;
    if (currentDate >= apr3 && currentDate < july3) currentSeason = 12;
    if (currentDate >= july3 && currentDate < oct3) currentSeason = 13;
    if (currentDate >= oct3 && currentDate < jan4) currentSeason = 14;
    // 2024
    if (currentDate >= jan4 && currentDate < apr4) currentSeason = 15;
    if (currentDate >= apr4 && currentDate < july4) currentSeason = 16;
    if (currentDate >= july4 && currentDate < oct4) currentSeason = 17;
    if (currentDate >= oct4 && currentDate < jan5) currentSeason = 18;
    // 2025
    if (currentDate > jan5) currentSeason = 19;

    this.setState({
      selectedSeason: currentSeason,
      maxSeason: currentSeason,
    });
  }

  awardState(season) {
    axios.get(`/awards/total/${season}`).then((matches) => {
      this.setState({ highestTotal: matches.data[0] });
    });
    axios.get(`/awards/faction/GDI/${season}`).then((matches) => {
      this.setState({ highestGDI: matches.data[0] });
    });
    axios.get(`/awards/faction/Nod/${season}`).then((matches) => {
      this.setState({ highestNod: matches.data[0] });
    });
    axios.get(`/awards/faction/random/${season}`).then((matches) => {
      this.setState({ highestRandom: matches.data[0] });
    });
    return;
  }

  seasonText(season) {
    return (
      <div>
        <CustomP>
          A natural extension of the official Season {this.state.selectedSeason}{' '}
          ladder using the same maps, considers a starting ELO level of 1,000
          for each player.
          <br />
          <br />
          Seasons run from: <br />
          January - March | April - June | July - September | October - December{' '}
          <br />
        </CustomP>
      </div>
    );
  }

  seasonOptions() {
    let maxSeason = this.state.maxSeason;

    let seasonsArray = [];
    for (let season = 1; season < maxSeason + 1; season++) {
      seasonsArray.push(season);
    }

    return (
      <select name="season" onChange={this.handleSeasonChange}>
        <option value="" disabled selected>
          -Select a season-
        </option>
        {seasonsArray
          .map((season) => <option value={season}>{season}</option>)
          .reverse()}
      </select>
    );
  }

  handleSeasonChange = (event) => {
    this.setState({ selectedSeason: parseInt(event.target.value) });
    this.ladderState(event.target.value);
    this.awardState(event.target.value);
  };

  render() {
    return (
      <Wrapper>
        <div>
          <Flex flexWrap="wrap">
            <Box px={2} py={3} width={[1, 2 / 3]}>
              <h3>TIBERIAN DAWN REMASTERED</h3>
              <p>COMMUNITY LEADERBOARD RANKINGS</p>
            </Box>
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <p>
                <CustomImage src={require('../images/cnc_remastered.png')} />
              </p>
              <Box px={2} py={3} width={[1, 3 / 3]}></Box>
            </Box>
          </Flex>
          <hr />
          <h3>
            <span role="img" aria-label="trophy">
              🏆
            </span>{' '}
            SEASON LADDER{' '}
            <span role="img" aria-label="trophy">
              🏆
            </span>
          </h3>
          <>
            <p>SELECT A SEASON</p>
            {this.seasonOptions()}
          </>
          <SearchBar
            data={this.state.leaderboard}
            season={this.state.selectedSeason}
            highestTotal={this.state.highestTotal}
            highestGDI={this.state.highestGDI}
            highestNod={this.state.highestNod}
            highestRandom={this.state.highestRandom}
          />
          <hr />
          <h3>SEASON {this.state.selectedSeason}</h3>
          <div>{this.seasonText(this.state.selectedSeason)}</div>
          <CustomP>* click rows for extra player data *</CustomP>
          {this.state.leaderboard.length === 0 ? (
            <div>
              <br />
              <div className="loader"></div>
              <br />
            </div>
          ) : (
            <>
              TOTAL PLAYERS: {this.state.leaderboard.length}
              <br />
              <br />
              <Veterans
                highestTotal={this.state.highestTotal}
                highestGDI={this.state.highestGDI}
                highestNod={this.state.highestNod}
                highestRandom={this.state.highestRandom}
                season={this.state.selectedSeason}
              />
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={200}
                totalItemsCount={this.state.leaderboard.length}
                pageRangeDisplayed={
                  this.state.leaderboard.length / 200 > 10
                    ? 10
                    : Math.ceil(this.state.leaderboard.length / 200)
                }
                onChange={this.handlePageChange.bind(this)}
                prevPageText="<"
                nextPageText=">"
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass="page-selected"
              />
              <Leaderboard
                data={this.state.leaderboard}
                startPlayer={this.state.startPlayer}
                endPlayer={this.state.endPlayer}
                activePage={this.state.activePage}
                highestTotal={this.state.highestTotal}
                highestGDI={this.state.highestGDI}
                highestNod={this.state.highestNod}
                highestRandom={this.state.highestRandom}
                season={this.state.selectedSeason}
              />
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={200}
                totalItemsCount={this.state.leaderboard.length}
                pageRangeDisplayed={
                  this.state.leaderboard.length / 200 > 10
                    ? 10
                    : Math.ceil(this.state.leaderboard.length / 200)
                }
                onChange={this.handlePageChange.bind(this)}
                prevPageText="<"
                nextPageText=">"
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass="page-selected"
              />
            </>
          )}

          <ScrollToTop />
          <br />
        </div>
        <div></div>
      </Wrapper>
    );
  }
}
export default Ladder;
