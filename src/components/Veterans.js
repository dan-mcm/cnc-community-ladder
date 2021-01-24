import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CustomRow3,
  GDIData,
  NodData,
  RandomData,
  TotalData,
  IconImg,
  Overflow
} from '../utils/styles';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import random from '../images/factions/random.png';

const axios = require('axios').default;

class Veterans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalAward: {},
      randomAward: {},
      nodAward: {},
      gdiAward: {}
    };
  }

  componentDidMount() {
    // defaulting to season 3
    this.awardState(this.props.season);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.season !== this.props.season) {
      this.awardState(this.props.season);
    }
  }

  awardState(season){
    axios.get(`/awards/total/${season}`).then(matches => {
      this.setState({ totalAward: matches.data[0] });
    });
    axios.get(`/awards/faction/GDI/${season}`).then(matches => {
      this.setState({ gdiAward: matches.data[0] });
    });
    axios.get(`/awards/faction/Nod/${season}`).then(matches => {
      this.setState({ nodAward: matches.data[0] });
    });
    axios.get(`/awards/faction/random/${season}`).then(matches => {
      this.setState({ randomAward: matches.data[0] });
    });
    return
  }

  render() {
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
              {this.state.gdiAward.player}{' '}
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              <br /> {this.state.gdiAward.totals} GDI Games Played
            </GDIData>
            <NodData>
              <IconImg src={nod} alt="nod" />
              <br />
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              {this.state.nodAward.player}{' '}
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              <br /> {this.state.nodAward.totals} Nod Games Played
            </NodData>
            <RandomData>
              <IconImg src={random} alt="random" />
              <br />
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              {this.state.randomAward.player}{' '}
              <span role="img" aria-label="medal">
                🎖️
              </span>{' '}
              <br /> {this.state.randomAward.totals} Random Games Played
            </RandomData>
            <TotalData>
              <IconImg src={gdi} alt="nod" /> <IconImg src={nod} alt="nod" />{' '}
              <IconImg src={random} alt="random" />
              <br />
              🎖️ {this.state.totalAward.player} 🎖️ <br />{' '}
              {this.state.totalAward.totals} Total Games Played
            </TotalData>
          </CustomRow3>
        </table>
      </Overflow>
    );
  }
}

Veterans.propTypes = {
  highestGDI: PropTypes.object.isRequired,
  highestNod: PropTypes.object.isRequired,
  highestRandom: PropTypes.object.isRequired,
  highestTotal: PropTypes.object.isRequired
};

export default Veterans;
