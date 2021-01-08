import React, { Component } from 'react';
import {
  CenterBullets,
  StandardImage,
  StyledLink,
  Wrapper
} from '../utils/styles';
import { Flex, Box } from 'grid-styled';

import canyonpaths from '../images/maps/CanyonPaths.png'
import duality36 from '../images/maps/Duality36.png';
import frosted from '../images/maps/FrostedHostilities.png';
import higherorder from '../images/maps/HigherOrder.png';
import neopeaks from '../images/maps/NeoTwinPeaks.png';
import quicksilver from '../images/maps/Quicksilver.png';
import crystal from '../images/maps/SandCrystalShard.png';
import vales from '../images/maps/ValesOfTheTemplars.png';

class Home extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <p>
            Welcome to the community run ladder for the Command & Conquer Remastered Collection.<br/>
            The site is just up and running so bear with us while we work out the bugs.
          </p>
        </div>
        <hr/>
        <h3><span role="img" aria-label="eagle">🦅</span> Season 4 Guide <span role="img" aria-label="scorpion">🦂</span></h3>
        <iframe title="placeholder-video" width="560" height="315" src="https://www.youtube.com/embed/g2DAK4dtEZQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br/>
        <br/>
        <hr/>
        <div>
          <h3><span role="img" aria-label="rules">📜</span> Season 4 Rules <span role="img" aria-label="rules">📜</span></h3>
          <p>The community for Season 4 is primarily moderated via the official <StyledLink href="https://discord.gg/wRH37XXy3n">C&C Tiberian Dawn Remastered Communiy Ladder</StyledLink> Discord channel. All rules, regulations and issues can be found there. Players are welcome to join the season at any time. The following is a brief snapshot of the current rules:
          </p>
          <CenterBullets>
            <li>When online and available to play be sure to react to the relevant role in the #ready-to-play channel</li>
            <li>Players must pre-agree to a ranked game publicly using the #matchups channel and using the !mapselector </li>
            <li>The public leaderboard will be updated every 24-48hrs</li>
            <li>Issues of misconduct may be reported to a Season Refree</li>
            <li>Season is scheduled to start at 12:00 GMT 01/01/21 and end on ???</li>
          </CenterBullets>
        </div>
        <br/>
        <hr/>
        <div>
        <h3><span role="img" aria-label="map">🌍</span> Season 4 Maps <span role="img" aria-label="map">🌍</span></h3>



        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2190033889">Canyon Paths</StyledLink><br/>
            <StandardImage src={canyonpaths} alt="canyonpaths" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2179708584">Duality 3.6</StyledLink><br/>
            <StandardImage src={duality36} alt="duality36" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="https://discord.com/channels/784235637715894293/784235821531922433/784236389142495243">Frosted Hostilities (vertically mirrored)</StyledLink><br/>
            <StandardImage src={frosted} alt="frosted" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2154039195">Higher Order</StyledLink><br/>
            <StandardImage src={higherorder} alt="higherorder" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2178849887">Neo Twin Peaks</StyledLink><br/>
            <StandardImage src={neopeaks} alt="neopeaks" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2121157850">Quicksilver</StyledLink><br/>
            <StandardImage src={quicksilver} alt="quicksilver" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 2]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2192624799">Sand Crystal Shard</StyledLink><br/>
            <StandardImage src={crystal} alt="crystal" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 2]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2190063332">Vales of the Templars</StyledLink><br/>
            <StandardImage src={vales} alt="vales" />
          </Box>
        </Flex>
        </div>
        <br/>
      </Wrapper>
    );
  }
}
export default Home;
