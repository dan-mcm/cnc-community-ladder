import React, { useEffect, useReducer } from 'react';
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
  dispatch,
  activePage,
  startPlayer,
  endPlayer,
  selectedActivePage
) {
  let startingPlayer = activePage === 1 ? 0 : 200 * (activePage - 1);
  try {
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: selectedActivePage });
    dispatch({ type: 'SET_START_PLAYER', payload: startingPlayer });
    dispatch({ type: 'SET_END_PLAYER', payload: startingPlayer + 200 });
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

function ladderState(dispatch, season) {
  return axios
    .get(`/legacy/leaderboard/${season}`)
    .then((matches) => {
      console.log(
        `successfully fetched ladderState for season ${season}: ${JSON.stringify(
          matches.data
        )}`
      );
      let data = matches.data;
      dispatch({ type: 'SET_LEADERBOARD', payload: data });
    })
    .catch((err) => console.log(`ladderState error - ${err}`));
}

function seasonState(setSelectedSeason, setMaxSeason) {
  let currentSeason;
  let currentDate = Date.now() / 1000;

  const seasonStartDates = [
    { season: 1, startDate: 1593561600 }, // July 2020 // 2020-08-06T17:57:34.788946
    { season: 2, startDate: 1601510400 }, // October 2020// 2020-08-10T18:13:02.544681
    { season: 3, startDate: 1609459200 }, // January 2021 // 2020-09-17T12:34:19.147524 2021-03-16T13:19:51.430553
    { season: 4, startDate: 1615900791 }, // March 2021 // 2021-03-16T13:19:51.430553
    { season: 5, startDate: 1622502001 }, // June 2021 // 2021-06-01T00:00:01.108728
    { season: 6, startDate: 1630450799 }, // September 2021 // 2021-08-31T23:59:59.985442
    { season: 7, startDate: 1638316800 }, // December 2021 // 2021-12-01T00:00:00.475807
    { season: 8, startDate: 1646092800 }, // March 2022 // 2022-03-01T00:00:00.525261
    { season: 9, startDate: 1654037999 }, // June 2022 // 2022-05-31T23:59:59.790186
    { season: 10, startDate: 1661986800 }, // September 2022 // 2022-09-01T00:00:00.134442
    { season: 11, startDate: 1669852801 }, // December 2022 // 2022-12-01T00:00:01.204621
    { season: 12, startDate: 1677628799 }, // March 2023 // 2023-02-28T23:59:59.978612
    { season: 13, startDate: 1685574000 }, // June 2023  // 2023-06-01T00:00:00.29734
    { season: 14, startDate: 1693522801 }, // September 2023 // 2023-09-01T00:00:01.442857
  ];

  // Iterate through the start dates to find the current season
  for (const seasonInfo of seasonStartDates.reverse()) {
    if (currentDate >= seasonInfo.startDate) {
      currentSeason = seasonInfo.season;
      break;
    }
  }
  return currentSeason;
}

async function fetchAndDispatchAwards(season, dispatch) {
  const fetchAwardData = async (url) => {
    const response = await axios.get(url);
    return response.data;
  };

  try {
    const highestTotalData = await fetchAwardData(
      `/legacy/awards/total/${season}`
    );
    dispatch({ type: 'SET_HIGHEST_TOTAL', payload: highestTotalData[0] });

    const highestGDIData = await fetchAwardData(
      `/legacy/awards/faction/GDI/${season}`
    );
    dispatch({ type: 'SET_HIGHEST_GDI', payload: highestGDIData[0] });

    const highestNodURLData = await fetchAwardData(
      `/legacy/awards/faction/Nod/${season}`
    );
    dispatch({ type: 'SET_HIGHEST_NOD', payload: highestNodURLData[0] });

    const highestRandomData = await fetchAwardData(
      `/legacy/awards/faction/random/${season}`
    );
    dispatch({ type: 'SET_HIGHEST_RANDOM', payload: highestRandomData[0] });

    // Fetch leaderboard data and wait for it to complete
    const leaderboardData = await ladderState(dispatch, season);
    dispatch({ type: 'SET_LEADERBOARD', payload: leaderboardData });
  } catch (error) {
    console.error('Error fetching data: ', error);
  }

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

function seasonOptions(maxSeason, dispatch) {
  let seasonsArray = [];
  for (let season = 1; season < maxSeason + 1; season++) {
    seasonsArray.push(season);
  }

  const handleSeasonChange = (event) => {
    const selectedSeason = parseInt(event.target.value);
    dispatch({ type: 'SET_SELECTED_SEASON', payload: selectedSeason });
  };

  return (
    <select
      name="season"
      onChange={(event) => handleSeasonChange(event.target.value)}
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

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_SEASON':
      return { ...state, selectedSeason: action.payload };
    case 'SET_LEADERBOARD':
      return { ...state, leaderboard: action.payload };
    case 'SET_ACTIVE_PAGE':
      return { ...state, activePage: action.payload };
    case 'SET_START_PLAYER':
      return { ...state, startPlayer: action.payload };
    case 'SET_END_PLAYER':
      return { ...state, endPlayer: action.payload };
    case 'SET_MATCH_DATA':
      return { ...state, matchData: action.payload };
    case 'SET_HIGHEST_TOTAL':
      return { ...state, highestTotal: action.payload };
    case 'SET_HIGHEST_GDI':
      return { ...state, highestGDI: action.payload };
    case 'SET_HIGHEST_NOD':
      return { ...state, highestNod: action.payload };
    case 'SET_HIGHEST_RANDOM':
      return { ...state, highestRandom: action.payload };
    case 'SET_MAX_SEASON':
      return { ...state, maxSeason: action.payload };
    default:
      return state;
  }
}

async function fetchInitialData(dispatch) {
  try {
    const season = await seasonState();
    dispatch({ type: 'SET_SELECTED_SEASON', payload: season });

    // defaulting to blank array, handled further in fetchAndDispatchAwards
    dispatch({ type: 'SET_LEADERBOARD', payload: [] });

    await fetchAndDispatchAwards(season, dispatch);
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}

function Ladder(props) {
  const initialState = {
    selectedSeason: 14,
    leaderboard: [],
    activePage: 1,
    startPlayer: 0,
    endPlayer: 200,
    matchData: [],
    highestTotal: {},
    highestGDI: {},
    highestNod: {},
    highestRandom: {},
    maxSeason: 14,
  };

  // const [selectedSeason, setSelectedSeason] = useState(14);
  // const [maxSeason, setMaxSeason] = useState(14);
  // const [leaderboard, setLeaderboard] = useState([]);
  // const [activePage, setActivePage] = useState(1);
  // const [startPlayer, setStartPlayer] = useState(0);
  // const [endPlayer, setEndPlayer] = useState(200);
  // const [highestTotal, setHighestTotal] = useState({});
  // const [highestGDI, setHighestGDI] = useState({});
  // const [highestNod, setHighestNod] = useState({});
  // const [highestRandom, setHighestRandom] = useState({});
  // const [matchData, setMatchData] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchInitialData(dispatch);
    console.log(state);
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
          {seasonOptions(state.maxSeason, dispatch)}
        </>
        <SearchBar
          data={state.leaderboard}
          season={state.selectedSeason}
          highestTotal={state.highestTotal}
          highestGDI={state.highestGDI}
          highestNod={state.highestNod}
          highestRandom={state.highestRandom}
        />
        <hr />
        <h3>SEASON {state.selectedSeason}</h3>
        <div>{seasonText(state.selectedSeason)}</div>
        <CustomP>* click rows for extra player data *</CustomP>
        {state.leaderboard === undefined ? (
          <div>
            <br />
            <div className="loader"></div>
            <br />
          </div>
        ) : (
          <>
            TOTAL PLAYERS: {state.leaderboard.length}
            <br />
            <br />
            <Veterans
              highestTotal={state.highestTotal}
              highestGDI={state.highestGDI}
              highestNod={state.highestNod}
              highestRandom={state.highestRandom}
              season={state.selectedSeason}
            />
            <Pagination
              activePage={state.activePage}
              itemsCountPerPage={200}
              totalItemsCount={state.leaderboard.length}
              pageRangeDisplayed={
                state.leaderboard.length / 200 > 10
                  ? 10
                  : Math.ceil(state.leaderboard.length / 200)
              }
              onChange={(pageNumber) => handlePageChange(dispatch, pageNumber)}
              prevPageText="<"
              nextPageText=">"
              itemClass="page-item"
              linkClass="page-link"
              activeLinkClass="page-selected"
            />
            <Leaderboard
              data={state.leaderboard}
              startPlayer={state.startPlayer}
              endPlayer={state.endPlayer}
              activePage={state.activePage}
              highestTotal={state.highestTotal}
              highestGDI={state.highestGDI}
              highestNod={state.highestNod}
              highestRandom={state.highestRandom}
              season={state.selectedSeason.toString()}
            />
            <Pagination
              activePage={state.activePage}
              itemsCountPerPage={200}
              totalItemsCount={state.leaderboard.length}
              pageRangeDisplayed={
                state.leaderboard.length / 200 > 10
                  ? 10
                  : Math.ceil(state.leaderboard.length / 200)
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
