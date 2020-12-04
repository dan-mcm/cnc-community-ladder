import React, { Component } from 'react';
import { Wrapper, NonbulletList, StandardImage, StyledLink } from '../utils/styles';
import { twitchData } from '../utils/socialData';
import twitch from '../images/twitch.png';
import discord from '../images/discord.png';
import youtube from '../images/youtube.png';

class Social extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <StandardImage src={discord} alt="Discord" />
          <NonbulletList>
            <li>
              <StyledLink href="https://discord.gg/wRH37XXy3n">
                C&C Tiberian Dawn Remastered Community Ladder
              </StyledLink>
            </li>
            <li>
              <StyledLink href="https://discord.gg/B4jDdDDdM4">
                C&C Tournament Central
              </StyledLink>
            </li>
            <li>
              <StyledLink href="https://discord.gg/ScPuahJQPM">
                GameReplays
              </StyledLink>
            </li>
          </NonbulletList>
        </div>
        <br />
        <hr />
        <div>
          <StandardImage src={twitch} alt="Twitch" />
          <NonbulletList>
            {twitchData.map(streamer => (
              <li>
                <StyledLink href={"https://www.twitch.tv/" +streamer}>
                  {streamer}
                </StyledLink>
              </li>
              )
            )}
          </NonbulletList>
        </div>
        <br />
        <hr />
        <div>
          <StandardImage src={youtube} alt="YouTube" />
          <NonbulletList>
            <li>
              <StyledLink href="https://www.youtube.com/channel/UCAuprck5AbqxHjYQXbEOb7A">
                AOD Gaming
              </StyledLink>
            </li>
          </NonbulletList>
        </div>
        <br />
      </Wrapper>
    );
  }
}

export default Social;
