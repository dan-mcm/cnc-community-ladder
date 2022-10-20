import React, { Component } from 'react';
import { StyledLink, Wrapper } from '../utils/styles';
import aod from '../images/tourny/aod-titans-3.png';

class Tournaments extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <h2>Tournaments, Recordings & Replays</h2>
        </div>
        <hr />
        <div>
          <h4>SEASON 3+ TITANS TOURNAMENT</h4>
          <p>
            AOD Gaming is hosting his first tournament over on his{' '}
            <StyledLink href="https://aod-gaming.com/cc-tiberian-dawn-season-3-titans/">
              brand new site
            </StyledLink>
            !<br />
            Double Elimination Tournament taking place throughout the month of
            March 2021
          </p>
          <a href="https://aod-gaming.com/cc-tiberian-dawn-season-3-titans/">
            <img alt="aod" src={aod} />
          </a>
          <br />
          <br />
          <hr />
        </div>
        <div>
          <h4>THE ADMIRALS CUP 2021</h4>
          <iframe
            allowFullScreen
            title="the admirals cup"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/LnmpXlM9sVc"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <br />
          <StyledLink href="https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=event&id=1418">
            Replay Files
          </StyledLink>{' '}
          |{' '}
          <StyledLink href="https://www.gamereplays.org/community/index.php?showtopic=1046883">
            Results
          </StyledLink>
          <br />
          <br />
          <hr />
        </div>
        <div>
          <h4>GROUNDHOG BRAWL #5</h4>
          <iframe
            allowFullScreen
            title="groundhog brawl #5"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/LCIADKgFYgg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <br />
          <StyledLink href="https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=event&id=1401">
            Replay Files
          </StyledLink>{' '}
          |{' '}
          <StyledLink href="https://www.gamereplays.org/community/index.php?showtopic=1045680">
            Results
          </StyledLink>
          <br />
          <br />
          <hr />
        </div>
        <div>
          <h4>GROUNDHOG BRAWL #4</h4>
          <iframe
            allowFullScreen
            title="groundhog brawl #4"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/g2DAK4dtEZQ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <br />
          <StyledLink href="https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=event&id=1396">
            Replay Files
          </StyledLink>{' '}
          |{' '}
          <StyledLink href="https://www.gamereplays.org/community/index.php?showtopic=1044672">
            Results
          </StyledLink>
          <br />
          <br />
          <hr />
        </div>
        <div>
          <h4>GROUNDHOG BRAWL #1</h4>
          <iframe
            allowFullScreen
            title="groundhog brawl #1"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/uWEdHzKw6lQ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          <br />
          <StyledLink href="https://www.gamereplays.org/community/index.php?showtopic=1040829">
            Results
          </StyledLink>
          <br />
          <br />
          <hr />
        </div>
        <br />
      </Wrapper>
    );
  }
}
export default Tournaments;
