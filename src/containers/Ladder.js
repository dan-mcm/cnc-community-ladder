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
      selectedSeason: 3,
      leaderboard: []
    };
  }

  componentDidMount() {
    // defaulting to season 3
    this.ladderState(3);
    this.awardState(this.state.selectedSeason);
    this.seasonState();
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
      endPlayer: startPlayer + 200
    });
  }

  ladderState(season) {
    return axios.get(`/leaderboard/${season}`).then(matches => {
      let data = matches.data;
      this.setState({ leaderboard: data });
    });
  }

  seasonState(){
    // 2021 months
    let jan = 1609459200
    let apr = 1617235200
    let july = 1625097600
    let oct = 1633046400
    // 2022 months
    let jan2 = 1640995200

    let currentSeason = 0;
    let starttime = Date.now() / 1000;
    if(starttime > jan && starttime < apr) currentSeason = 3
    // skipping 4 as used for our custom-map season
    if(starttime >= apr && starttime < july) currentSeason = 5
    if(starttime >= july && starttime < oct) currentSeason = 6
    if(starttime >= oct && starttime < jan2) currentSeason = 7
    // placeholder defaulting to season 8
    if(starttime >= jan2) currentSeason = 8

    this.setState({ selectedSeason: currentSeason });
  }

  awardState(season) {
    axios.get(`/awards/total/${season}`).then(matches => {
      this.setState({ highestTotal: matches.data[0] });
    });
    axios.get(`/awards/faction/GDI/${season}`).then(matches => {
      this.setState({ highestGDI: matches.data[0] });
    });
    axios.get(`/awards/faction/Nod/${season}`).then(matches => {
      this.setState({ highestNod: matches.data[0] });
    });
    axios.get(`/awards/faction/random/${season}`).then(matches => {
      this.setState({ highestRandom: matches.data[0] });
    });
    return;
  }

  seasonText(season) {
    if (this.state.selectedSeason === 3) {
      return (
        <div>
          <CustomP>
            A natural extension of the official Season 3 ladder using the same
            maps, considers a starting ELO level of 1,000 for each player.
            <br />
            Restricted to games played via in-game quickmatch option from
            27/01/21.
          </CustomP>
          <CustomP></CustomP>
          Start: ~ 06/01/21 <br />
          End: ~ 31/03/21
        </div>
      );
    }

    if (this.state.selectedSeason === 4) {
      return (
        <div>
          <CustomP>
            A brand new ladder to enable players to have ranked games on custom
            maps (see homepage for map selection)
            <br />
            Considers a starting ELO level of 1,000 for each player.
            <br />
          </CustomP>
          <CustomP>
            Start: ~ 11/01/21 <br />
            End: ~ TBC
          </CustomP>
        </div>
      );
    }

    if (this.state.selectedSeason === 5) {
      return (
        <div>
          <CustomP>
            A natural extension of the community Season 3+ ladder using the same
            maps, considers a starting ELO level of 1,000 for each player.
          </CustomP>
          <CustomP>
            Start: 01/04/21 <br />
            End: 30/06/21
          </CustomP>
        </div>
      );
    }

    if (this.state.selectedSeason === 6) {
      return (
        <div>
          <CustomP>
            A natural extension of the community Season 5 ladder using the same
            maps, considers a starting ELO level of 1,000 for each player.
          </CustomP>
          <CustomP>
            Start: 01/07/21 <br />
            End: 30/09/21
          </CustomP>
        </div>
      );
    }

    if (this.state.selectedSeason === 7) {
      return (
        <div>
          <CustomP>
            A natural extension of the community Season 6 ladder using the same
            maps, considers a starting ELO level of 1,000 for each player.
          </CustomP>
          <CustomP>
            Start: 01/10/21 <br />
            End:~ 31/12/21
          </CustomP>
        </div>
      );
    }

    if (this.state.selectedSeason >= 8) {
      return (
        <div>
          <CustomP>
            A natural extension of the community Season 7 ladder using the same
            maps, considers a starting ELO level of 1,000 for each player.
            <br />
            Considers a starting ELO level of 1,000 for each player.
            <br />
          </CustomP>
          <CustomP>
            Start: 01/01/22 <br />
            End: TBC
          </CustomP>
        </div>
      );
    }
  }

  seasonOptions() {
    let current = Date.now() / 1000;

    // 2021 months
    let jan = 1609459200
    let apr = 1617235200
    let july = 1625097600
    let oct = 1633046400
    // 2022 months
    let jan2 = 1640995200

    if (current >= jan2) {
      return (
        <select name="season" onChange={this.handleSeasonChange}>
          <option value="" disabled selected>
            -Select a season-
          </option>
          <option value="3">3+</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      );
    }

    if (current >= oct) {
      return (
        <select name="season" onChange={this.handleSeasonChange}>
          <option value="" disabled selected>
            -Select a season-
          </option>
          <option value="3">3+</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      );
    }

    if (current >= july) {
      return (
        <select name="season" onChange={this.handleSeasonChange}>
          <option value="" disabled selected>
            -Select a season-
          </option>
          <option value="3">3+</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      );
    }

    if (current >= apr) {
      return (
        <select name="season" onChange={this.handleSeasonChange}>
          <option value="" disabled selected>
            -Select a season-
          </option>
          <option value="3">3+</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      );
    }
    // should be default case
    if (current >= jan) {
      return (
        <select name="season" onChange={this.handleSeasonChange}>
          <option value="" disabled selected>
            -Select a season-
          </option>
          <option value="3">3+</option>
          <option value="4">4</option>
        </select>
      );
    }
  }

  handleSeasonChange = event => {
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
          <h3>
            SEASON{' '}
            {this.state.selectedSeason === 3 ? '3+' : this.state.selectedSeason}
          </h3>
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
