import React, { useState, useEffect } from 'react';
import { Wrapper } from '../utils/styles';
import SearchBar from '../components/SearchBar';
import { Flex, Box } from 'grid-styled';
import Pagination from 'react-js-pagination';
import ScrollToTop from '../components/Scroll.js';
import Veterans from '../components/Veterans.js';
import Leaderboard from '../components/Leaderboard.js';
import { CustomP, CustomImage } from '../utils/styles';

const axios = require('axios').default;

function handlePageChange(
  activePage,
  startPlayer,
  endPlayer,
  selectedActivePage
) {
  let startingPlayer = activePage === 1 ? 0 : 200 * (activePage - 1);
  activePage(selectedActivePage);
  startPlayer(startingPlayer);
  endPlayer(startingPlayer + 200);
}

function ladderState(setLeaderboard, season) {
  return axios
    .get(`/leaderboard/${season}`)
    .then((matches) => {
      let data = matches.data;
      setLeaderboard(data);
    })
    .catch((err) => console.log(`ladderState Debug - ${err}`));
}

function seasonState(setSelectedSeason, setMaxSeason) {
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

  setSelectedSeason(currentSeason);
  setMaxSeason(currentSeason);
}

function awardState(
  setHighestTotal,
  setHighestGDI,
  setHighestNod,
  setHighestRandom,
  season
) {
  // TODO this new promisifcation needs to be validated as working...
  // TODO fix console error log, when server 500 returning XML parsing error: syntax error (potentially express side header issue)
  const highestTotalURL = `/awards/total/${season}`;
  const highestGDIURL = `/awards/faction/GDI/${season}`;
  const highestNodURL = `/awards/faction/Nod/${season}`;
  const highestRandomURL = `/awards/faction/random/${season}`;

  const totalPromise = axios.get(highestTotalURL);
  const gdiPromise = axios.get(highestGDIURL);
  const nodPromise = axios.get(highestNodURL);
  const randomPromise = axios.get(highestRandomURL);

  Promise.all([totalPromise, gdiPromise, nodPromise, randomPromise])
    .then((promises) => {
      setHighestTotal(promises[0].data[0]);
      setHighestGDI(promises[1].data[0]);
      setHighestNod(promises[2].data[0]);
      setHighestRandom(promises[3].data[0]);
    })
    .catch((err) => {
      console.log(`awardState Debug - ${err}`);
    });
  return;
}

function seasonText(selectedSeason) {
  return (
    <div>
      <CustomP>
        A natural extension of the official Season {selectedSeason} ladder using
        the same maps, considers a starting ELO level of 1,000 for each player.
        <br />
        <br />
        Seasons run from: <br />
        January - March | April - June | July - September | October - December{' '}
        <br />
      </CustomP>
    </div>
  );
}

function seasonOptions(setSelectedSeason, maxSeason) {
  let seasonsArray = [];
  for (let season = 1; season < maxSeason + 1; season++) {
    seasonsArray.push(season);
  }

  return (
    <select
      name="season"
      onChange={(event) => setSelectedSeason(event.target.value)}
      defaultValue=""
    >
      <option value="" disabled>
        -Select a season-
      </option>
      {seasonsArray
        .map((season, index) => (
          <option value={season} key={index}>
            {season}
          </option>
        ))
        .reverse()}
    </select>
  );
}

// legacy code - not in actual use?
// function handleSeasonChange(event, setLeaderboard, setSelectedSeason, setHighestTotal, setHighestGDI, setHighestNod, setHighestRandom) {
//   setSelectedSeason(parseInt(event.target.value))
//   ladderState(setLeaderboard, event.target.value);
//   awardState(setHighestTotal, setHighestGDI, setHighestNod, setHighestRandom, event.target.value);
// };

function Ladder(props) {
  const [activePage, setActivePage] = useState(1);
  const [startPlayer, setStartPlayer] = useState(0);
  const [endPlayer, setEndPlayer] = useState(200);
  const [matchData, setMatchData] = useState([]);
  const [highestTotal, setHighestTotal] = useState({});
  const [highestGDI, setHighestGDI] = useState({});
  const [highestNod, setHighestNod] = useState({});
  const [highestRandom, setHighestRandom] = useState({});
  const [selectedSeason, setSelectedSeason] = useState(0); // TODO improve performance, starts at season 0 and tries a load... waste of time? Preload latest season for first check...
  const [maxSeason, setMaxSeason] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // TODO verify intiial load of data sufficient, otherwise change [] args
  useEffect(() => {
    seasonState(setSelectedSeason, setMaxSeason);
    ladderState(setLeaderboard, selectedSeason);
    awardState(
      setHighestTotal,
      setHighestGDI,
      setHighestNod,
      setHighestRandom,
      selectedSeason
    );
  }, []);

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
          {seasonOptions(setSelectedSeason, maxSeason)}
        </>
        <SearchBar
          data={leaderboard}
          season={selectedSeason}
          highestTotal={highestTotal}
          highestGDI={highestGDI}
          highestNod={highestNod}
          highestRandom={highestRandom}
        />
        <hr />
        <h3>SEASON {selectedSeason}</h3>
        <div>{seasonText(selectedSeason)}</div>
        <CustomP>* click rows for extra player data *</CustomP>
        {leaderboard.length === 0 ? (
          <div>
            <br />
            <div className="loader"></div>
            <br />
          </div>
        ) : (
          <>
            TOTAL PLAYERS: {leaderboard.length}
            <br />
            <br />
            <Veterans
              highestTotal={highestTotal}
              highestGDI={highestGDI}
              highestNod={highestNod}
              highestRandom={highestRandom}
              season={selectedSeason}
            />
            <Pagination
              activePage={activePage}
              itemsCountPerPage={200}
              totalItemsCount={leaderboard.length}
              pageRangeDisplayed={
                leaderboard.length / 200 > 10
                  ? 10
                  : Math.ceil(leaderboard.length / 200)
              }
              onChange={(e) => handlePageChange(e)}
              prevPageText="<"
              nextPageText=">"
              itemClass="page-item"
              linkClass="page-link"
              activeLinkClass="page-selected"
            />
            <Leaderboard
              data={leaderboard}
              startPlayer={startPlayer}
              endPlayer={endPlayer}
              activePage={activePage}
              highestTotal={highestTotal}
              highestGDI={highestGDI}
              highestNod={highestNod}
              highestRandom={highestRandom}
              season={selectedSeason}
            />
            <Pagination
              activePage={activePage}
              itemsCountPerPage={200}
              totalItemsCount={leaderboard.length}
              pageRangeDisplayed={
                leaderboard.length / 200 > 10
                  ? 10
                  : Math.ceil(leaderboard.length / 200)
              }
              onChange={(e) => handlePageChange(e)}
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
export default Ladder;
