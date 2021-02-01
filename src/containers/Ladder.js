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

  handleSeasonChange = event => {
    this.setState({ selectedSeason: parseInt(event.target.value) });
    this.ladderState(event.target.value);
    this.awardState(event.target.value)
  };

  render() {
    return (
      <Wrapper>
        <div>
          <Flex flexWrap="wrap">
            <Box px={2} py={3} width={[1, 2 / 3]}>
              <p>
                <h3>TIBERIAN DAWN REMASTERED</h3>
                COMMUNITY LEADERBOARD RANKINGS
              </p>
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
            <select name="season" onChange={this.handleSeasonChange}>
              <option value="" disabled selected>
                -Select a season-
              </option>
              <option value="3">3+</option>
              <option value="4">4</option>
            </select>
            {this.state.matchata}
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
          <CustomP>
            {this.state.selectedSeason === 3 ? (
              <div>
                <CustomP>
                  A natural extension of the official Season 3 ladder using the
                  same maps, considers a starting ELO level of 1,000 for each
                  player.
                  <br />
                  Restricted to games played via in-game quickmatch option from
                  27/01/21.
                </CustomP>
                <CustomP></CustomP>
                Start: ~ 06/01/21 <br />
                End: ~ 31/03/21
              </div>
            ) : (
              <div>
                <CustomP>
                  A brand new ladder to enable players to have ranked games on
                  custom maps (see homepage for map selection)
                  <br />
                  Considers a starting ELO level of 1,000 for each player.
                  <br />
                </CustomP>
                <CustomP>
                  Start: ~ 11/01/21 <br />
                  End: ~ 31/03/21
                </CustomP>
              </div>
            )}
          </CustomP>
          <CustomP>* click rows for extra player data *</CustomP>
          {this.state.leaderboard.length === 0 ? (
            <div>
              <br />
              <div class="loader"></div>
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
                  this.state.leaderboard.length / 200 > 10 ? 10 : Math.ceil(
                  this.state.leaderboard.length / 200
                )}
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
                  this.state.leaderboard.length / 200 > 10 ? 10 : Math.ceil(
                  this.state.leaderboard.length / 200
                )}
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
