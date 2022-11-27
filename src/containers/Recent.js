// newly refactored to call from API instead of DB
import { CustomImg, StyledLink, IconImg, Wrapper } from '../utils/styles';
import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Flex, Box } from 'grid-styled';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import randomgdi from '../images/factions/gdirandom.png';
import randomnod from '../images/factions/nodrandom.png';

const axios = require('axios').default;

function ladderMapParserS3(mapname) {
  const ladderMaps = {
    MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_1_MAP: 'green_acres',
    MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_60_MAP: 'monkey_in_the_middle',
    MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_3_MAP: 'elevation',
    MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_4_MAP: 'heavy_metal',
    MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_5_MAP: 'quarry',
    MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_6_MAP: 'tournament_middle_camp',
    MOBIUS_TIBERIAN_DAWN_MULTIPLAYER_COMMUNITY_7_MAP: 'tournament_desert',
  };

  return ladderMaps[mapname];
}

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

function toDateString(epochValue) {
  let date = epochValue;
  const utcSeconds = date;
  const d = new Date(0); // Sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  date = d;
  return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
}

function lastHour(setCount, matches) {
  const currentTime = Date.now();
  const hour = 3600000;
  const hourOffset = (currentTime - hour) / 1000;
  let pastHourGames = matches.filter((match) => match.starttime > hourOffset);
  setCount(pastHourGames.length);
}

// filtering based on TD & Quickmatch 'ranked' games
function getTDMatchesOnly(matches) {
  return matches.filter(
    (match) =>
      match.mapname.includes('TIBERIAN_DAWN') && match.matchname.includes('QM')
  );
}

function getRecentMatches(setRecentMatches) {
  return axios
    .get('/ea/recent')
    .then((res) => {
      return setRecentMatches(getTDMatchesOnly(res.data.matches));
    })
    .catch((err) => console.log(err));
}

function Recent() {
  const [recentMatches, setRecentMatches] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [startMatch, setStartMatch] = useState(0);
  const [endMatch, setEndMatch] = useState(9);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getRecentMatches(setRecentMatches);
    lastHour(setCount, recentMatches);
  }, [recentMatches]);

  return (
    <Wrapper>
      <h2>Recent Played Matches</h2>
      <p>Games played in the last hour: {count}</p>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={9}
        totalItemsCount={recentMatches.length}
        pageRangeDisplayed={
          recentMatches.length / 9 > 10
            ? 10
            : Math.ceil(recentMatches.length / 9)
        }
        onChange={(e) =>
          handlePageChange(setActivePage, setStartMatch, setEndMatch, e)
        }
        prevPageText="<"
        nextPageText=">"
        itemClass="page-item"
        linkClass="page-link"
        activeLinkClass="page-selected"
      />
      <Flex style={{ flexWrap: 'wrap' }}>
        {recentMatches.slice(startMatch, endMatch).map((game) => (
          <Box key={game.starttime} px={2} py={3} width={[1, 1 / 3]}>
            {game.factions[0] === 0 && game.wasrandom[0] === false ? (
              <IconImg src={gdi} />
            ) : (
              <IconImg src={nod} />
            )}
            <b> {game.names[0]} </b>- v -<b> {game.names[1]} </b>
            {game.wasrandom[1]}{' '}
            {game.wasrandom[1] === true ? (
              game.factions[1] === 0 ? (
                <IconImg src={randomgdi} alt="randomgdi" />
              ) : (
                <IconImg src={randomnod} alt="randomnod" />
              )
            ) : game.factions[1] === 0 ? (
              <IconImg src={gdi} alt="gdi" />
            ) : (
              <IconImg src={nod} alt="nod" />
            )}
            <br />
            {toDateString(game.starttime)} <br />
            {`${Math.floor(game.matchduration / 60)}mins ${Math.trunc(
              game.matchduration - Math.floor(game.matchduration / 60) * 60
            )}secs`}{' '}
            <br />
            <span style={{ color: 'green', fontWeight: 'bold' }}>
              <span role="img" aria-label="medal">
                🏅
              </span>{' '}
              {game.names[game.winningteamid]}{' '}
              <span role="img" aria-label="medal">
                🏅
              </span>
            </span>
            <br />
            <StyledLink href={`https://replays.cnctdra.ea.com/${game.cdnurl}`}>
              Replay
            </StyledLink>
            <br />
            {
              <CustomImg
                src={require(`../images/maps/${ladderMapParserS3(
                  game.mapname
                )}.png`)}
              />
            }{' '}
          </Box>
        ))}
      </Flex>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={9}
        totalItemsCount={recentMatches.length}
        pageRangeDisplayed={
          recentMatches.length / 9 > 10
            ? 10
            : Math.ceil(recentMatches.length / 9)
        }
        onChange={(e) =>
          handlePageChange(setActivePage, setStartMatch, setEndMatch, e)
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

export default Recent;
