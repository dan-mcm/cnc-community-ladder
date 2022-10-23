import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Flex, Box } from 'grid-styled';
import { CustomImg, StyledLink, IconImg, Wrapper } from '../utils/styles';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import randomgdi from '../images/factions/gdirandom.png';
import randomnod from '../images/factions/nodrandom.png';

const axios = require('axios').default;

function handlePageChange(
  setActivePage,
  setStartMatch,
  setEndMatch,
  activePage
) {
  let startMatch = activePage === 1 ? 0 : 9 * (activePage - 1);
  setActivePage(activePage);
  setStartMatch(startMatch);
  setEndMatch(startMatch + 9);
}

function getRecentMatches(setMatchData) {
  return axios.get(`/recent`).then((matches) => {
    const { data } = matches;
    setMatchData(data);
  });
}

function toDateString(epochValue) {
  let date = epochValue;
  const utcSeconds = date;
  const d = new Date(0); // Sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  date = d;
  return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
}

function lastHour(setCount) {
  return axios.get(`/recent/hour`).then((matches) => {
    const { data } = matches;
    setCount(data.length);
  });
}

// legacy code - no longer in use?
// function stringify(data) {
//   let sampleString = '';
//   data.slice(0, 9).map((game) => {
//     sampleString +=
//       '   [  ' + game.player1_name + '-v-' + game.player2_name + '  ]   ';
//   });
//
//   return sampleString;
// }

function RecentGames(props) {
  const [matchData, setMatchData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [startMatch, setStartMatch] = useState(0);
  const [endMatch, setEndMatch] = useState(9);
  const [count, setCount] = useState(0);

  // too many re-renders, seems bugged...
  useEffect(() => {
    getRecentMatches(setMatchData);
    lastHour(setCount);
  }, []);

  return (
    <Wrapper>
      <p>Games played in the last hour: {count}</p>
      <hr />
      <h3>MOST RECENT GAMES</h3>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={9}
        totalItemsCount={matchData.length}
        pageRangeDisplayed={
          matchData.length / 9 > 10 ? 10 : Math.ceil(matchData.length / 9)
        }
        onChange={handlePageChange(setActivePage, setStartMatch, setEndMatch)}
        prevPageText="<"
        nextPageText=">"
        itemClass="page-item"
        linkClass="page-link"
        activeLinkClass="page-selected"
      />
      <Flex style={{ flexWrap: 'wrap' }}>
        {matchData.slice(startMatch, endMatch).map((game) => (
          <Box key={game.starttime} px={2} py={3} width={[1, 1 / 3]}>
            {game.player1_faction === 'GDI' && game.player1_random === false ? (
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
            Season {game.season === 3 ? `${game.season}+` : game.season} <br />
            {toDateString(game.starttime)} <br />
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
            <StyledLink href={`https://replays.cnctdra.ea.com/${game.replay}`}>
              Replay
            </StyledLink>
            <br />
            {<CustomImg src={require(`../images/maps/${game.map}.png`)} />}{' '}
          </Box>
        ))}
      </Flex>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={9}
        totalItemsCount={matchData.length}
        pageRangeDisplayed={
          matchData.length / 9 > 10 ? 10 : Math.ceil(matchData.length / 9)
        }
        onChange={handlePageChange(setActivePage, setStartMatch, setEndMatch)}
        prevPageText="<"
        nextPageText=">"
        itemClass="page-item"
        linkClass="page-link"
        activeLinkClass="page-selected"
      />
    </Wrapper>
  );
}

export default RecentGames;
