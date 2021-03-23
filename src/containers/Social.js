import React, { Component } from 'react';
import { Wrapper, StandardImage, StyledLink } from '../utils/styles';
import { Flex, Box } from 'grid-styled';
import { twitchData } from '../utils/socialData';
import twitch from '../images/twitch.png';
import discord from '../images/discord.png';
import youtube from '../images/youtube.png';
import community from '../images/community.png';
import aod from '../images/community/aod.png';
import cnc from '../images/community/cnc-community.svg';
import rap from '../images/community/rap.png';

class Social extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <StandardImage src={community} alt="Community" />
          <Flex flexWrap="wrap">
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <a href="https://cnc.community/">
                <img alt="cnc community" src={cnc} width="250" height="250" />
              </a>
              <br />
              <br />
              For all things C&C Related
            </Box>
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <a href="https://www.redalertpros.com/">
                <img alt="rap" src={rap} width="250" height="250" />
              </a>
              <br />
              <br />
              For all your Red Alert Remastered Needs
            </Box>
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <a href="https://aod-gaming.com/">
                <img alt="aod gaming" src={aod} width="450" height="250" />
              </a>
              <br />
              <br />
              Community Streamer & Tournament Hoster
            </Box>
          </Flex>
        </div>
        <br />
        <hr />
        <div>
          <StandardImage src={discord} alt="Discord" />
          <Flex flexWrap="wrap">
            <Box px={2} py={3} width={[1, 1 / 1]}>
              <StyledLink href="https://discord.gg/wRH37XXy3n">
                C&C Tiberian Dawn Remastered Community Ladder
              </StyledLink>
            </Box>
            <Box px={2} py={3} width={[1, 1 / 1]}>
              <StyledLink href="https://discord.gg/B4jDdDDdM4">
                C&C Tournament Central
              </StyledLink>
            </Box>
            <Box px={2} py={3} width={[1, 1 / 1]}>
              <StyledLink href="https://discord.gg/ScPuahJQPM">
                GameReplays
              </StyledLink>
            </Box>
          </Flex>
        </div>
        <br />
        <hr />
        <div>
          <StandardImage src={twitch} alt="Twitch" />
          <Flex flexWrap="wrap">
            {twitchData.map((streamer) => (
              <Box key={streamer} px={2} py={3} width={[1, 1 / 3]}>
                <StyledLink href={'https://www.twitch.tv/' + streamer}>
                  {streamer}
                </StyledLink>
              </Box>
            ))}
          </Flex>
        </div>
        <br />
        <hr />
        <div>
          <StandardImage src={youtube} alt="YouTube" />
          <Flex flexWrap="wrap">
            <Box px={2} py={3} width={[1, 1 / 2]}>
              <StyledLink href="https://www.youtube.com/channel/UCAuprck5AbqxHjYQXbEOb7A">
                AOD Gaming
              </StyledLink>
            </Box>
            <Box px={2} py={3} width={[1, 1 / 2]}>
              <StyledLink href="https://www.youtube.com/channel/UC_avVhLS065uCaTTdBY6v_Q">
                Danku
              </StyledLink>
            </Box>
          </Flex>
        </div>
        <br />
      </Wrapper>
    );
  }
}

export default Social;
