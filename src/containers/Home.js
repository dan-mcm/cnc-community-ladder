import React, { Component } from 'react';
import {
  CenterBullets,
  StyledLink,
  Wrapper
} from '../utils/styles';

class Home extends Component {
  render() {
    return (
      <Wrapper>
        <div>
        <hr/>
          <p>
            Welcome to the community run ladder for Command & Conquer Remastered Collection.<br/>
            The site is just up and running so bear with us while we work out the bugs.
          </p>
        </div>
        <hr/>
        <br/>
        <br/>
        Placeholder for video guide to getting setup on ladder.
        <br/>
        <br/>
        <iframe title="placeholder-video" width="560" height="315" src="https://www.youtube.com/embed/g2DAK4dtEZQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br/>
        <br/>
        <hr/>
        <div>
          <h3>📜 Season 4 Rules 📜</h3>
          <p>The community for Season 4 is primarily moderated via the official <StyledLink href="https://discord.gg/wRH37XXy3n">C&C Tiberian Dawn Remastered Communiy Ladder</StyledLink> Discord channel. <br/>
          All rules, regulations and issues can be found there. Players are welcome to join the season at any time. The following is a brief snapshot of the current rules:
          </p>
          <CenterBullets>
          <li>When online and available to play be sure to react to the relevant role in the #ready-to-play channel</li>
          <li>Players must pre-agree to a ranked game publicly using the #matchups channel and using the !mapselector </li>
          <li>Replays must be <StyledLink href="https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=upload&">uploaded</StyledLink> to GameReplays prefixed with [s4] in the replay title</li>
          <li>Wins & Losses must be reported in the #score-report channel with a link to the corresponding uploaded replay</li>
          <li>The public leaderboard will be updated every 24-48hrs</li>
          <li>Issues of misconduct may be reported to a Season Refree</li>
          <li>Season is scheduled to start at 12:00 GMT 01/01/21 and end on 31/01/21 at 12:00 GMT</li>
          </CenterBullets>
        </div>

      </Wrapper>
    );
  }
}
export default Home;
