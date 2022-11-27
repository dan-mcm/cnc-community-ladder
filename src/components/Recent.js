import React from 'react';
import { StyledLink } from '../utils/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import imageOne from '../images/tourny/aod-titans-3.png';
import imageTwo from '../images/tourny/admirals-cup.jpg';
import ladder from '../images/ladder.png';
import zlazher from '../images/tourny/zlazher.png';
import nyerguds from '../images/tourny/nyerguds.jpg';

function Recent() {
  const settings = {
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <h2>COMMUNITY SPOTLIGHT</h2>
      <Slider {...settings}>
        <div>
          <a href="https://cnc-stats.azurewebsites.net/">
            <img alt="zlazhers-leaderboard" src={zlazher} />
          </a>
          <p>
            Checkout{' '}
            <StyledLink href="https://cnc-stats.azurewebsites.net/">
              Zlazher's Red Alert Leaderboard QM Statistics
            </StyledLink>{' '}
          </p>
        </div>
        <div className="center">
          <a href="https://github.com/Nyerguds/CnCTDRAMapEditor">
            <img alt="nyerguds-map-editor" src={nyerguds} />
          </a>
          <p>
            Nyergud's Upgraded C&C Remastered Map Editor -{' '}
            <StyledLink href="https://github.com/Nyerguds/CnCTDRAMapEditor">
              Details
            </StyledLink>
            .
          </p>
        </div>
        <div className="center">
          <a href="https://steamcommunity.com/app/1213210/discussions/0/6303323545007755536/">
            <img alt="ladder-reset" src={ladder} />
          </a>
          <p>
            Official Continued Ladder Support From EA -{' '}
            <StyledLink href="https://steamcommunity.com/app/1213210/discussions/0/6303323545007755536/">
              Details
            </StyledLink>
            .
          </p>
        </div>
      </Slider>
    </div>
  );
}

export default Recent;
