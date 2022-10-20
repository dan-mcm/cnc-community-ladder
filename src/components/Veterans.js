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

function Veterans(props) {
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
            {props.highestGDI.player}{' '}
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            <br /> {props.highestGDI.totals} GDI Games Played
          </GDIData>
          <NodData>
            <IconImg src={nod} alt="nod" />
            <br />
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            {props.highestNod.player}{' '}
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            <br /> {props.highestNod.totals} Nod Games Played
          </NodData>
          <RandomData>
            <IconImg src={random} alt="random" />
            <br />
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            {props.highestRandom.player}{' '}
            <span role="img" aria-label="medal">
              🎖️
            </span>{' '}
            <br /> {props.highestRandom.totals} Random Games Played
          </RandomData>
          <TotalData>
            <IconImg src={gdi} alt="nod" /> <IconImg src={nod} alt="nod" />{' '}
            <IconImg src={random} alt="random" />
            <br />
            🎖️ {props.highestTotal.player} 🎖️ <br /> {props.highestTotal.totals}{' '}
            Total Games Played
          </TotalData>
        </CustomRow3>
      </table>
    </Overflow>
  );
}

Veterans.propTypes = {
  highestGDI: PropTypes.object.isRequired,
  highestNod: PropTypes.object.isRequired,
  highestRandom: PropTypes.object.isRequired,
  highestTotal: PropTypes.object.isRequired,
};

export default Veterans;
