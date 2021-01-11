import React, { Component } from 'react';
import {
  CenterBullets,
  StandardImage,
  StyledLink,
  Wrapper
} from '../utils/styles';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';


// season 3+ maps
import elevation from '../images/maps/elevation.png';
import quarry from '../images/maps/quarry.png';
import monkey from '../images/maps/monkey_in_the_middle.png';
import greenacres from '../images/maps/green_acres.png';
import tournamentmiddle  from '../images/maps/tournament_middle_camp.png';
import tournamentdesert from '../images/maps/tournament_desert.png';
import heavymetal from '../images/maps/heavy_metal.png';


// season 4 maps
import canyonpaths from '../images/maps/CanyonPaths.png';
import duality36 from '../images/maps/Duality36.png';
import frosted from '../images/maps/FrostedHostilities.png';
import higherorder from '../images/maps/HigherOrder.png';
import neopeaks from '../images/maps/NeoTwinPeaks.png';
import quicksilver from '../images/maps/Quicksilver.png';
import crystal from '../images/maps/SandCrystalShard.png';
import vales from '../images/maps/ValesOfTheTemplars.png';


// icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';

const CustomCenterD = styled.div`
  text-align: center;
  padding: 2.5rem;
`
const CustomLeftP = styled.p`
  max-width: 1000px;
  text-align: left;
  margin: auto;
`
const CustomLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.8rem;
  background-color: rgba(64, 64, 64, 0.6);
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: rgba(64, 64, 64, 0.9);
    text-decoration: none;
    color: gold;
  }
`;

const IconImg = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin: 0 auto;
  padding: 0px;
  vertical-align:middle
`

const IconDiv = styled.div`
  overflow:auto;
`

class Home extends Component {
  render() {
    return (
      <Wrapper>
      <Flex flexWrap="wrap">
        <Box px={2} py={3} width={[1, 1 / 3]}>
        <IconImg src={gdi} alt="gdi" />
        </Box>
        <Box px={2} py={3} width={[1, 1 / 3]}>
        <h3>C&C TIBERIAN DAWN REMASTERED COMMUNITY</h3>
        </Box>
        <Box px={2} py={3} width={[1, 1 / 3]}>
        <IconImg src={nod} alt="nod" />
        </Box>
      </Flex>



        <p>
          Welcome to the community run Tiberian Dawn ladders for the Command & Conquer Remastered Collection.<br/>
          The site is just up and running so bear with us while we work out the bugs.
        </p>
        <br/>
        <hr/>
        <div>
          <h3><span role="img" aria-label="rules">📜</span> SEASON 3+ OVERVIEW <span role="img" aria-label="rules">📜</span></h3>
          <CustomCenterD>
          <CustomLeftP>As there has been no official reset for the <StyledLink href="https://cnc.community/command-and-conquer-remastered/leaderboard/tiberian-dawn">Official C&C Remastered Tiberian Dawn Ladder</StyledLink>,
          we the community have set out to create out own reset of the current 'final' season 3 ladder.
          This Season 3+ ladder automatically tracks games played on the existing ladder maps and has reset all players elos to a score of 1000.<br/><br/>
          </CustomLeftP>
          <CustomLink to="/ladder">Season 3+ Ladder</CustomLink>
          </CustomCenterD>
          <br/>
        </div>
        <hr/>
        <div>
        <h3><span role="img" aria-label="map">🌍</span> SEASON 3+ MAPS <span role="img" aria-label="map">🌍</span></h3>
        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="#">Green Acres</StyledLink><br/>
            <StandardImage src={greenacres} alt="greenacres" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="#">Monkey in the Middle</StyledLink><br/>
            <StandardImage src={monkey} alt="monkey" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="#">Quarry</StyledLink><br/>
            <StandardImage src={quarry} alt="quarry" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="#">Elevation</StyledLink><br/>
            <StandardImage src={elevation} alt="elevation" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="#">Tournament Middle Camp</StyledLink><br/>
            <StandardImage src={tournamentmiddle} alt="tournamentmiddle" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="#">Tournament Desert</StyledLink><br/>
            <StandardImage src={tournamentdesert} alt="tournamentdesert" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <StyledLink href="#">Heavy Metal</StyledLink><br/>
            <StandardImage src={heavymetal} alt="heavymetal" />
          </Box>
        </Flex>
        </div>
        <hr/>
        <div>
          <h3><span role="img" aria-label="rules">📜</span> SEASON 4 OVERVIEW <span role="img" aria-label="rules">📜</span></h3>
          <CustomCenterD>
          <CustomLeftP>In addition to providing a season 3 elo reset we have set out to create a new map pool for a new community run season - Season 4.
          The community for Season 4 is primarily moderated via the official <StyledLink href="https://discord.gg/wRH37XXy3n">C&C Tiberian Dawn Remastered Communiy </StyledLink> Discord channel.
          All rules, regulations and issue reporting can be found there. <br/><br/>
          Players are welcome to join the season at any time.
          Any matches played on the selected Season 4 maps will be scored and counted - nothing extra is required for you to pariticpate.<br/><br/>
          The following is a brief snapshot of the current rules:
          </CustomLeftP>
          </CustomCenterD>
          <CenterBullets>
            <li>When online and available to play be sure to react to the relevant role in the #ready-to-play channel</li>
            <li>The public leaderboard will be updated automatically every 24-48hrs</li>
            <li>Issues of misconduct may be reported to a Season Refree</li>
          </CenterBullets>
          <p>
            Official start date of Season 4 pending, currently trialing setup with Season 3+ first.
          </p>
        </div>
        <br/>
        <hr/>
        <div>
        <h3><span role="img" aria-label="map">🌍</span> SEASON 4 MAPS <span role="img" aria-label="map">🌍</span></h3>



        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2190033889">Canyon Paths</StyledLink><br/>
            <StandardImage src={canyonpaths} alt="canyonpaths" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2179708584">Duality 3.6</StyledLink><br/>
            <StandardImage src={duality36} alt="duality36" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="https://discord.com/channels/784235637715894293/784235821531922433/784236389142495243">Frosted Hostilities (vertically mirrored)</StyledLink><br/>
            <StandardImage src={frosted} alt="frosted" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2154039195">Higher Order</StyledLink><br/>
            <StandardImage src={higherorder} alt="higherorder" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2178849887">Neo Twin Peaks</StyledLink><br/>
            <StandardImage src={neopeaks} alt="neopeaks" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2121157850">Quicksilver</StyledLink><br/>
            <StandardImage src={quicksilver} alt="quicksilver" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
            <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2192624799">Sand Crystal Shard</StyledLink><br/>
            <StandardImage src={crystal} alt="crystal" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 4]}>
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
