import { useState, useEffect } from 'react';
import { Wrapper } from '../utils/styles';
import { CustomBadge, CustomRow, Overflow, TableFormat } from '../utils/styles';
import { Flex, Box } from 'grid-styled';
import Pagination from 'react-js-pagination';
import { CustomImage } from '../utils/styles';

const axios = require('axios').default;

function handlePageChange(
  setLeaderboard,
  setActivePage,
  setSelectedSeason,
  selectedSeason,
  setPlayerIdTranslation,
  activePage
) {
  // let startMatch = activePage === 1 ? 0 : 9 * (activePage - 1);
  setActivePage(activePage);
  setSelectedSeason(selectedSeason);
  fetchLeaderboard(
    setLeaderboard,
    selectedSeason,
    setPlayerIdTranslation,
    activePage
  );
}

function getRank(rank) {
  if (rank <= 16) {
    return 'general';
  }

  if (rank <= 200) {
    return 'major';
  }

  if (rank <= 400) {
    return 'captain';
  }

  if (rank <= 600) {
    return 'lieutenant';
  }
  return 'sergeant';
}

function fetchLeaderboard(
  setLeaderboard,
  season,
  setPlayerIdTranslation,
  page
) {
  let adjustedPage;
  const nameArray = [];

  page === 1 ? (adjustedPage = 0) : (adjustedPage = (page - 1) * 200);

  return axios
    .get(`/ea/leaderboard/${season}/${adjustedPage}`)
    .then((res) => {
      // console.log(`Leaderboard Data: ${JSON.stringify(res.data)}`)
      // adding name values only to array
      res.data.ranks.map((player) => nameArray.push(player.steamids[0]));

      // TODO fix bug -> showing this function as undefined despite being defined above
      // when not using .then it displays the board ok!
      let usernames = getMultipleSteamUsernames(
        nameArray,
        setPlayerIdTranslation
      ); //.then((res) => res);
      // console.log(`Usernames: ${JSON.stringify(usernames)}`);
      // console.log(`NAME ARRAY: ${JSON.stringify(usernames)}`)
      setPlayerIdTranslation(usernames);
      return setLeaderboard(res.data.ranks);
    })
    .catch((err) => console.log(err));
}

// function seasonState(setSelectedSeason, setMaxSeason) {
//   let currentSeason;
//   let currentDate = Date.now() / 1000;
//
//   // 2021 months
//   let jan = 1609459200;
//   let apr = 1617235200;
//   let july = 1625097600;
//   let oct = 1633046400;
//   // 2022 months
//   let jan2 = 1640995200;
//   let apr2 = 1648771200;
//   let july2 = 1656633600;
//   let oct2 = 1664582400;
//   // 2023 months
//   let jan3 = 1672531200;
//   let apr3 = 1680307200;
//   let july3 = 1688169600;
//   let oct3 = 1696118400;
//   // 2024 months
//   let jan4 = 1704067200;
//   let apr4 = 1711929600;
//   let july4 = 1719792000;
//   let oct4 = 1727740800;
//   // 2025 months+
//   let jan5 = 1735689600;
//
//   // 2021
//   if (currentDate >= jan && currentDate < apr) currentSeason = 3;
//   if (currentDate >= apr && currentDate < july) currentSeason = 4;
//   if (currentDate >= july && currentDate < oct) currentSeason = 5;
//   if (currentDate >= oct && currentDate < jan2) currentSeason = 6;
//   // 2022
//   if (currentDate >= jan2 && currentDate < apr2) currentSeason = 7;
//   if (currentDate >= apr2 && currentDate < july2) currentSeason = 8;
//   if (currentDate >= july2 && currentDate < oct2) currentSeason = 9;
//   if (currentDate >= oct2 && currentDate < jan3) currentSeason = 10;
//   // 2023
//   if (currentDate >= jan3 && currentDate < apr3) currentSeason = 11;
//   if (currentDate >= apr3 && currentDate < july3) currentSeason = 12;
//   if (currentDate >= july3 && currentDate < oct3) currentSeason = 13;
//   if (currentDate >= oct3 && currentDate < jan4) currentSeason = 14;
//   // 2024
//   if (currentDate >= jan4 && currentDate < apr4) currentSeason = 15;
//   if (currentDate >= apr4 && currentDate < july4) currentSeason = 16;
//   if (currentDate >= july4 && currentDate < oct4) currentSeason = 17;
//   if (currentDate >= oct4 && currentDate < jan5) currentSeason = 18;
//   // 2025
//   if (currentDate > jan5) currentSeason = 19;
//
//   setSelectedSeason(currentSeason);
//   setMaxSeason(currentSeason);
// }

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

// // test this with a single value...
// // sample user id: 76561198036370701
// function getSingleSteamUsername(steamID) {
//   axios
//     .get(`/steamid/${steamID}`)
//     .then((res) => {
//       // console.log(res.data)
//       if (typeof res.data.response.players[0].personaname !== 'undefined') {
//         // console.log(res.data.response.players[0].personaname)
//         return res.data.response.players[0].personaname;
//       } else {
//         return 'N/A';
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       return 'N/A';
//     });
// }

// make playerIDs comma delimited list of up to 100 users...
function getMultipleSteamUsernames(steamIDs, setPlayerIdTranslation) {
  const hundredSplit1 = steamIDs.slice(0, 99).join(',');
  const hundredSplit2 = steamIDs.slice(100, 199).join(',');

  // note: these will only handle the public steam user accounts...
  const firstHundredPromise = axios.get(`/steamid/${hundredSplit1}`);
  const secondHundredPromise = axios.get(`/steamid/${hundredSplit2}`);

  Promise.all([firstHundredPromise, secondHundredPromise])
    .then((res) => {
      // const tempArray = []
      const tempObj = {};

      // console.log(`Promise.all Result: ${JSON.stringify(res.data.response.players)}`)
      // console.log('RES: ', JSON.stringify(res) )
      res.map((hundredSplit) => {
        hundredSplit.data.response.players.map((player) => {
          const playerIDObj = {}; // {player.steamid : player.personaname}
          console.log('PLAYER:', player);
          tempObj[player.steamid] = player.personaname;
          return tempObj;
        });
      });
      return setPlayerIdTranslation(tempObj);
    })
    .catch((err) => {
      console.log(err);
      return 'N/A';
    });
  // console.log(`getMultipleSteamusernames DEBUG: ${steamIDs}`)
}

function getUsername(userid, playerIdTranslation) {
  if (
    typeof playerIdTranslation === 'object' &&
    userid in playerIdTranslation
  ) {
    return playerIdTranslation[userid];
  } else {
    return userid;
  }
}

function CurrentLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [activePage, setActivePage] = useState(1);
  // const [awards, setAwards] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(10); // TODO hardcoded to season 10 as a default, can make it dynamically loaded
  const [maxSeason] = useState(10); // TODO hardcoded to 10 for now, needs setMaxSeason based on seasonState function logic
  const [playerIdTranslation, setPlayerIdTranslation] = useState({});

  useEffect(() => {
    fetchLeaderboard(
      setLeaderboard,
      selectedSeason,
      setPlayerIdTranslation,
      activePage
    );
    // awardState(leaderboard,setAwards);
  }, [selectedSeason, activePage]);

  return (
    <Wrapper>
      <Flex flexWrap="wrap">
        <Box px={2} py={3} width={[1, 2 / 3]}>
          <h3>TIBERIAN DAWN REMASTERED</h3>
          <p>EA LEADERBOARD RANKINGS</p>
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
        SEASON {selectedSeason} LADDER{' '}
        <span role="img" aria-label="trophy">
          🏆
        </span>
      </h3>
      <p>SELECT A SEASON</p>
      {seasonOptions(setSelectedSeason, maxSeason)}
      <Pagination
        activePage={activePage}
        itemsCountPerPage={200}
        totalItemsCount={1000}
        pageRangeDisplayed={leaderboard.length / 200 > 10 ? 10 : 1000}
        onChange={(e) =>
          handlePageChange(
            setLeaderboard,
            setActivePage,
            setSelectedSeason,
            selectedSeason,
            setPlayerIdTranslation,
            e
          )
        }
        prevPageText="<"
        nextPageText=">"
        itemClass="page-item"
        linkClass="page-link"
        activeLinkClass="page-selected"
      />
      <Overflow>
        <TableFormat>
          <tbody>
            <tr>
              <th>RANK</th>
              <th>POSITION</th>
              <th>NAME</th>
              <th>POINTS</th>
              <th>WINS</th>
              <th>LOSSES</th>
              <th>PLAYED</th>
              <th>WINRATE</th>
            </tr>
          </tbody>
          {leaderboard.map((player) => {
            return (
              <CustomRow>
                <td>
                  {' '}
                  <CustomBadge
                    src={require(`../images/ranks/${getRank(player.rank)}.png`)}
                  />
                </td>
                <td>{player.rank}</td>
                <td>{getUsername(player.steamids[0], playerIdTranslation)}</td>
                <td>{Math.ceil(player.points)}</td>
                <td>{player.wins}</td>
                <td>{player.loses}</td>
                <td>{player.wins + player.loses}</td>
                <td>
                  {player.loses === 0
                    ? '100%'
                    : Math.ceil(
                        ((player.wins / (player.wins + player.loses)) * 100) / 1
                      ) + '%'}
                </td>
              </CustomRow>
            );
          })}
        </TableFormat>
      </Overflow>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={200}
        totalItemsCount={1000}
        pageRangeDisplayed={leaderboard.length / 200 > 10 ? 10 : 1000}
        onChange={(e) =>
          handlePageChange(
            setLeaderboard,
            setActivePage,
            setSelectedSeason,
            selectedSeason,
            setPlayerIdTranslation,
            e
          )
        }
        prevPageText="<"
        nextPageText=">"
        itemClass="page-item"
        linkClass="page-link"
        activeLinkClass="page-selected"
      />
    </Wrapper>
  );
}

export default CurrentLeaderboard;
