import React from 'react';
import PropTypes from 'prop-types';
import {
  CustomRow3,
  GDIData,
  NodData,
  RandomData,
  TotalData,
  IconImg,
  Overflow,
} from '../utils/styles';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import random from '../images/factions/random.png';

function Veterans({
  highestTotal,
  highestGDI,
  highestNod,
  highestRandom,
  season,
}) {
  const totalData = highestTotal || {};
  const gdiData = highestGDI || {};
  const nodData = highestNod || {};
  const randomData = highestRandom || {};

  return (
    <Overflow>
      <table>
        <CustomRow3>
          <GDIData>
            <IconImg src={gdi} alt="nod" />
            <br />
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            {highestGDI.player}{' '}
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            <br /> {highestGDI.totals} GDI Games Played
          </GDIData>
          <NodData>
            <IconImg src={nod} alt="nod" />
            <br />
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            {highestNod.player}{' '}
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            <br /> {highestNod.totals} Nod Games Played
          </NodData>
          <RandomData>
            <IconImg src={random} alt="random" />
            <br />
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            {highestRandom.player}{' '}
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            <br /> {highestRandom.totals} Random Games Played
          </RandomData>
          <TotalData>
            <IconImg src={gdi} alt="nod" /> <IconImg src={nod} alt="nod" />{' '}
            <IconImg src={random} alt="random" />
            <br />
            🎖️ {highestTotal.player} 🎖️ <br /> {highestTotal.totals} Total Games
            Played
          </TotalData>
        </CustomRow3>
      </table>
    </Overflow>
  );
}

Veterans.propTypes = {
  highestTotal: PropTypes.object,
  highestGDI: PropTypes.object,
  highestNod: PropTypes.object,
  highestRandom: PropTypes.object,
  season: PropTypes.number.isRequired,
};

export default Veterans;
