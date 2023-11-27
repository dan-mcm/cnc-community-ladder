import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { CustomImg, CustomP, IconImg, StyledLink } from '../utils/styles';
import { Flex, Box } from 'grid-styled';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import randomgdi from '../images/factions/gdirandom.png';
import randomnod from '../images/factions/nodrandom.png';

const greenStyle = {
  color: 'green',
  fontWeight: 'bold',
};

const redStyle = {
  color: 'red',
  fontWeight: 'bold',
};

function handlePageChange(
  setActivePage,
  setStartMatch,
  setEndMatch,
  activePage
) {
  const startMatch = activePage === 1 ? 0 : 9 * (activePage - 1);
  setActivePage(activePage);
  setStartMatch(startMatch);
  setEndMatch(startMatch + 9);
}

function toDateString(epochValue) {
  let date = epochValue;
  let utcSeconds = date;
  let d = new Date(0); // sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  date = d;
  return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`;
}

function RecentPlayerGames(props) {
  const [activePage, setActivePage] = useState(1);
  const [startMatch, setStartMatch] = useState(0);
  const [endMatch, setEndMatch] = useState(9);

  return (
    <div>
      <h3>RECENT GAMES</h3>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={9}
        totalItemsCount={props.matches.length}
        pageRangeDisplayed={
          props.matches.length / 9 > 10
            ? 10
            : Math.ceil(props.matches.length / 9)
        }
        prevPageText="<"
        nextPageText=">"
        itemClass="page-item"
        linkClass="page-link"
        activeLinkClass="page-selected"
        onChange={handlePageChange(setActivePage, setStartMatch, setEndMatch)}
      />
      <Flex flexWrap="wrap">
        {props.matches.slice(startMatch, endMatch).map((game, index) => (
          <Box key={index} px={2} py={3} width={[1, 1 / 3]}>
            <CustomP>
              {game.player_random === true ? (
                game.player_faction === 'GDI' ? (
                  <IconImg src={randomgdi} alt="randomgdi" />
                ) : (
                  <IconImg src={randomnod} alt="randomnod" />
                )
              ) : game.player_faction === 'GDI' ? (
                <IconImg src={gdi} alt="gdi" />
              ) : (
                <IconImg src={nod} alt="nod" />
              )}
              <b> {game.player}</b> [
              {game.player_new_elo - game.player_existing_elo > 0 ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  +{game.player_new_elo - game.player_existing_elo}
                </span>
              ) : (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  {game.player_new_elo - game.player_existing_elo}
                </span>
              )}
              ] -v- [
              {game.opponent_new_elo - game.opponent_existing_elo > 0 ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  +{game.opponent_new_elo - game.opponent_existing_elo}
                </span>
              ) : (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  {game.opponent_new_elo - game.opponent_existing_elo}
                </span>
              )}
              ] <b>{game.opponent} </b>
              {game.opponent_random === true ? (
                game.opponent_faction === 'GDI' ? (
                  <IconImg src={randomgdi} alt="randomgdi" />
                ) : (
                  <IconImg src={randomnod} alt="randomnod" />
                )
              ) : game.opponent_faction === 'GDI' ? (
                <IconImg src={gdi} alt="gdi" />
              ) : (
                <IconImg src={nod} alt="nod" />
              )}{' '}
              <br />
              {toDateString(game.starttime)} <br />
              {`${Math.floor(game.duration / 60)}mins ${Math.trunc(
                game.duration - Math.floor(game.duration / 60) * 60
              )}secs`}
              <br />
              {(game.player === props.playername && game.result === false) ||
              (game.opponent === props.playername && game.result === true) ? (
                <span style={greenStyle}>Win</span>
              ) : (
                <span style={redStyle}>Loss</span>
              )}{' '}
              <br />
              <StyledLink href={game.replay}>Replay File</StyledLink> <br />
              <CustomImg src={require(`../images/maps/${game.map}.png`)} />
              <br />
            </CustomP>
          </Box>
        ))}
      </Flex>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={9}
        totalItemsCount={props.matches.length}
        pageRangeDisplayed={
          props.matches.length / 9 > 10
            ? 10
            : Math.ceil(props.matches.length / 9)
        }
        onChange={handlePageChange(setActivePage, setStartMatch, setEndMatch)}
        prevPageText="<"
        nextPageText=">"
        itemClass="page-item"
        linkClass="page-link"
        activeLinkClass="page-selected"
      />
    </div>
  );
}

RecentPlayerGames.propTypes = {
  playername: PropTypes.string.isRequired,
};

export default RecentPlayerGames;
