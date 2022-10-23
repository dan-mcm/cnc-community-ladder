import React from 'react';
import { StyledLink } from '../utils/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import imageOne from '../images/tourny/aod-titans-3.png';
import imageTwo from '../images/tourny/admirals-cup.jpg';
import ladder from '../images/ladder.png';

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
        <div className="center">
          <a href="https://steamcommunity.com/app/1213210/discussions/0/6303323545007755536/">
            <img alt="ladder-reset" src={ladder} />
          </a>
          <p>
            Official Season 4 Ladder Support From EA -{' '}
            <StyledLink href="https://steamcommunity.com/app/1213210/discussions/0/6303323545007755536/">
              Details
            </StyledLink>
            .
          </p>
        </div>
        <div className="center">
          <a href="https://aod-gaming.com/cc-tiberian-dawn-season-3-titans/">
            <img alt="aod-titans-3" src={imageOne} />
          </a>
          <p>
            <StyledLink href="https://aod-gaming.com/cc-tiberian-dawn-season-3-titans/">
              Signup
            </StyledLink>{' '}
            to AOD's April 2021 Double Elimination Tournament!
          </p>
        </div>
        <div>
          <a href="https://www.youtube.com/watch?v=LnmpXlM9sVc&t=2s">
            <img alt="admirals-cup" src={imageTwo} />
          </a>
          <p>
            Checkout{' '}
            <StyledLink href="https://www.youtube.com/watch?v=LnmpXlM9sVc&t=2s">
              JimmyVisions cast
            </StyledLink>{' '}
            of the Admirals Cup Finals!
          </p>
        </div>
      </Slider>
    </div>
  );
}

export default Recent;
