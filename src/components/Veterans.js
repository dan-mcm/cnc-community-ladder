import React, { Component } from 'react';
import styled from 'styled-components';

// icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import random from '../images/factions/random.png';

const CustomRow = styled.tr`
  border: 2px solid white;
`;
const GDIData = styled.td`
  background-color: rgb(16, 16, 16);
  min-width: 200px;
`;

const NodData = styled.td`
  background-color: rgb(30, 30, 30);
  min-width: 200px;
`;

const RandomData = styled.td`
  background-color: rgb(16, 16, 16);
  min-width: 200px;
`;

const TotalData = styled.td`
  background-color: rgb(30, 30, 30);
  min-width: 200px;
`;

const IconImg = styled.img`
  max-width: 40px;
  max-height: 40px;
  margin: 0 auto;
  padding: 0px;
  vertical-align: middle;
  padding-bottom: 5px;
`;

const Overflow = styled.div`
  overflow-x: hidden;
`;

class Veterans extends Component {
  render() {
    return (
      <Overflow>
        <table>
          <CustomRow>
            <GDIData>
              <IconImg src={gdi} alt="nod" />
              <br />
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              {this.props.highestGDI.player}{' '}
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              <br /> {this.props.highestGDI.gdiTotal} GDI Games Played
            </GDIData>
            <NodData>
              <IconImg src={nod} alt="nod" />
              <br />
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              {this.props.highestNod.player}{' '}
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              <br /> {this.props.highestNod.nodTotal} Nod Games Played
            </NodData>
            <RandomData>
              <IconImg src={random} alt="random" />
              <br />
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              {this.props.highestRandom.player}{' '}
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              <br /> {this.props.highestRandom.randomTotal} Random Games Played
            </RandomData>
            <TotalData>
              <IconImg src={gdi} alt="nod" /> <IconImg src={nod} alt="nod" />{' '}
              <IconImg src={random} alt="random" />
              <br />
              🎖️ {this.props.highestTotal.player} 🎖️ <br />{' '}
              {this.props.highestTotal.playerTotal} Total Games Played
            </TotalData>
          </CustomRow>
        </table>
      </Overflow>
    );
  }
}

export default Veterans;
