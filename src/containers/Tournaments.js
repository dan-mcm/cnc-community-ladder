import React, { Component } from 'react';
import { StyledLink, Wrapper } from '../utils/styles';

class Tournaments extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <p>
            Recent Tournament Footage & Details
          </p>
        </div>
        <hr/>
        <div>
          <h3>UPCOMING TOURNAMENTS</h3>
          <p>Pending...</p>
          <br/>
          <br/>
          <hr/>
        </div>
        <div>
          <h4>GROUNDHOG BRAWL #5</h4>
          <iframe title="groundhog brawl #5" width="560" height="315" src="https://www.youtube.com/embed/LCIADKgFYgg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <br/><StyledLink href='https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=event&id=1401'>Replay Files</StyledLink> | <StyledLink href='https://www.gamereplays.org/community/index.php?showtopic=1045680'>Results</StyledLink>
          <br/>
          <br/>
          <hr/>
        </div>
        <div>
          <h4>GROUNDHOG BRAWL #4</h4>
          <iframe title="groundhog brawl #4" width="560" height="315" src="https://www.youtube.com/embed/g2DAK4dtEZQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <br/><StyledLink href='https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=event&id=1396'>Replay Files</StyledLink> | <StyledLink href='https://www.gamereplays.org/community/index.php?showtopic=1044672'>Results</StyledLink>
          <br/>
          <br/>
          <hr/>
        </div>
        <br/>
      </Wrapper>
    );
  }
}
export default Tournaments;
