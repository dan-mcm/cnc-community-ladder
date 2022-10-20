import React, { Component } from 'react';
import {
  CustomCenterD,
  CustomLeftP,
  CustomLink2,
  HomeImg,
  StandardImage,
  StyledLink,
  StyledInternalLink,
  Wrapper,
} from '../utils/styles';
import { Flex, Box } from 'grid-styled';
import Recent from '../components/Recent';

// Season 3+ maps
import elevation from '../images/maps/elevation.png';
import quarry from '../images/maps/quarry.png';
import monkey from '../images/maps/monkey_in_the_middle.png';
import greenacres from '../images/maps/green_acres.png';
import tournamentmiddle from '../images/maps/tournament_middle_camp.png';
import tournamentdesert from '../images/maps/tournament_desert.png';
import heavymetal from '../images/maps/heavy_metal.png';

// Season 4 maps - legacy not currently in use
// import canyonpaths from '../images/maps/canyon_paths.png';
// import duality36 from '../images/maps/duality.png';
// import frosted from '../images/maps/frosted_hostilities_vertically_mirrored.png';
// import higherorder from '../images/maps/higher_order.png';
// import neopeaks from '../images/maps/neo_twin_peaks.png';
// import quicksilver from '../images/maps/quicksilver.png';
// import crystal from '../images/maps/sand_crystal_shard.png';
// import vales from '../images/maps/vales_of_the_templars.png';

// Icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';

class Home extends Component {
  render() {
    return (
      <Wrapper>
        {console.log(`     ██╗ ██████╗ ██╗███╗   ██╗    ████████╗██╗  ██╗███████╗     ██████╗ ██████╗ ██╗
     ██║██╔═══██╗██║████╗  ██║    ╚══██╔══╝██║  ██║██╔════╝    ██╔════╝ ██╔══██╗██║
     ██║██║   ██║██║██╔██╗ ██║       ██║   ███████║█████╗      ██║  ███╗██║  ██║██║
██   ██║██║   ██║██║██║╚██╗██║       ██║   ██╔══██║██╔══╝      ██║   ██║██║  ██║██║
╚█████╔╝╚██████╔╝██║██║ ╚████║       ██║   ██║  ██║███████╗    ╚██████╔╝██████╔╝██║
 ╚════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝       ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═════╝ ╚═╝

██████╗ ███████╗██╗   ██╗ ██████╗ ██╗     ██╗   ██╗████████╗██╗ ██████╗ ███╗   ██╗
██╔══██╗██╔════╝██║   ██║██╔═══██╗██║     ██║   ██║╚══██╔══╝██║██╔═══██╗████╗  ██║
██████╔╝█████╗  ██║   ██║██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██╔██╗ ██║
██╔══██╗██╔══╝  ╚██╗ ██╔╝██║   ██║██║     ██║   ██║   ██║   ██║██║   ██║██║╚██╗██║
██║  ██║███████╗ ╚████╔╝ ╚██████╔╝███████╗╚██████╔╝   ██║   ██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚══════╝  ╚═══╝   ╚═════╝ ╚══════╝ ╚═════╝    ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                                                                                   `)}
        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <HomeImg src={gdi} alt="gdi" />
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <h3>C&C TIBERIAN DAWN REMASTERED COMMUNITY</h3>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <HomeImg src={nod} alt="nod" />
          </Box>
        </Flex>
        <p>
          Welcome to the community run Tiberian Dawn ladders for the Command &
          Conquer Remastered Collection.
        </p>
        <br />
        <hr />
        <Recent />
        <hr />
        <div>
          <h3>COMMUNITY LADDER</h3>
          <CustomCenterD>
            <CustomLeftP>
              As there has been no official reset for the{' '}
              <StyledLink href="https://cnc.community/command-and-conquer-remastered/leaderboard/tiberian-dawn">
                Official C&C Remastered Tiberian Dawn Ladder
              </StyledLink>
              , we the community have set out to create out own ladders.
            </CustomLeftP>
            <br />
            <br />
            <CustomLink2 to="/ladder">Go To Season Ladders</CustomLink2>
            <br />
          </CustomCenterD>
        </div>
        <hr />
        <div>
          <h3>QUICKMATCH SEASON OVERVIEW</h3>
          <CustomLeftP>
            We have started the community ladder with a <b>Season 3+</b> ladder
            which is an elo reset of the official season 3 ladder. This Season
            3+ ladder automatically tracks games played on the existing
            quickmatch ladder pool and has reset all players elos to a score of
            1000. You can checkout the existing quickmatch map pool below.
            <br />
            <br />
            The community run quickmatch map ladders will be refreshed every 3
            months, you can see the start and end date for each season under the{' '}
            <StyledInternalLink to="/ladder">Ladder</StyledInternalLink>{' '}
            section.
          </CustomLeftP>
          <br />
        </div>

        <hr />
        <div>
          <h3>
            <span role="img" aria-label="map">
              🌍
            </span>{' '}
            QUICKMATCH SEASON MAPS{' '}
            <span role="img" aria-label="map">
              🌍
            </span>
          </h3>
          <Flex flexWrap="wrap">
            <Box px={2} py={3} width={[1, 1 / 4]}>
              <StyledLink href="#">Green Acres</StyledLink>
              <br />
              <StandardImage src={greenacres} alt="greenacres" />
            </Box>
            <Box px={2} py={3} width={[1, 1 / 4]}>
              <StyledLink href="#">Monkey in the Middle</StyledLink>
              <br />
              <StandardImage src={monkey} alt="monkey" />
            </Box>
            <Box px={2} py={3} width={[1, 1 / 4]}>
              <StyledLink href="#">Quarry</StyledLink>
              <br />
              <StandardImage src={quarry} alt="quarry" />
            </Box>
            <Box px={2} py={3} width={[1, 1 / 4]}>
              <StyledLink href="#">Elevation</StyledLink>
              <br />
              <StandardImage src={elevation} alt="elevation" />
            </Box>
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <StyledLink href="#">Tournament Middle Camp</StyledLink>
              <br />
              <StandardImage src={tournamentmiddle} alt="tournamentmiddle" />
            </Box>
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <StyledLink href="#">Tournament Desert</StyledLink>
              <br />
              <StandardImage src={tournamentdesert} alt="tournamentdesert" />
            </Box>
            <Box px={2} py={3} width={[1, 1 / 3]}>
              <StyledLink href="#">Heavy Metal</StyledLink>
              <br />
              <StandardImage src={heavymetal} alt="heavymetal" />
            </Box>
          </Flex>
        </div>
        <hr />
        <div>
          {/*  <CustomCenterD>*/}
          {/*    <h3>CUSTOMMATCH SEASON OVERVIEW</h3>*/}
          {/*    <CustomLeftP>*/}
          {/*      In addition to providing a quickmatch based community ladder we*/}
          {/*      have set out to create a new map pool for a special custom map*/}
          {/*      community run season - Season 4. The community for Season 4 is*/}
          {/*      primarily moderated via the official{' '}*/}
          {/*      <StyledLink href="https://discord.gg/wRH37XXy3n">*/}
          {/*        C&C Tiberian Dawn Remastered Communiy{' '}*/}
          {/*      </StyledLink>{' '}*/}
          {/*      Discord channel. All rules, regulations and issue reporting can be*/}
          {/*      found there. <br />*/}
          {/*      <br />*/}
          {/*      Players are welcome to join the season at any time. Any matches*/}
          {/*      played on the selected Season 4 maps will be scored and counted -*/}
          {/*      nothing extra is required for you to pariticpate.*/}
          {/*    </CustomLeftP>*/}
          {/*  </CustomCenterD>*/}
          {/*</div>*/}
          {/*<br />*/}
          {/*<hr />*/}
          {/*<div>*/}
          {/*  <h3>*/}
          {/*    <span role="img" aria-label="map">*/}
          {/*      🌍*/}
          {/*    </span>{' '}*/}
          {/*    CUSTOMMATCH SEASON MAPS{' '}*/}
          {/*    <span role="img" aria-label="map">*/}
          {/*      🌍*/}
          {/*    </span>*/}
          {/*  </h3>*/}

          {/*  <Flex flexWrap="wrap">*/}
          {/*    <Box px={2} py={3} width={[1, 1 / 4]}>*/}
          {/*      <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2190033889">*/}
          {/*        Canyon Paths*/}
          {/*      </StyledLink>*/}
          {/*      <br />*/}
          {/*      <StandardImage src={canyonpaths} alt="canyonpaths" />*/}
          {/*    </Box>*/}
          {/*    <Box px={2} py={3} width={[1, 1 / 4]}>*/}
          {/*      <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2179708584">*/}
          {/*        Duality 3.6*/}
          {/*      </StyledLink>*/}
          {/*      <br />*/}
          {/*      <StandardImage src={duality36} alt="duality36" />*/}
          {/*    </Box>*/}
          {/*    <Box px={2} py={3} width={[1, 1 / 4]}>*/}
          {/*      <StyledLink href="https://discord.com/channels/784235637715894293/784235821531922433/784236389142495243">*/}
          {/*        Frosted Hostilities (vertically mirrored)*/}
          {/*      </StyledLink>*/}
          {/*      <br />*/}
          {/*      <StandardImage src={frosted} alt="frosted" />*/}
          {/*    </Box>*/}
          {/*    <Box px={2} py={3} width={[1, 1 / 4]}>*/}
          {/*      <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2154039195">*/}
          {/*        Higher Order*/}
          {/*      </StyledLink>*/}
          {/*      <br />*/}
          {/*      <StandardImage src={higherorder} alt="higherorder" />*/}
          {/*    </Box>*/}
          {/*    <Box px={2} py={3} width={[1, 1 / 4]}>*/}
          {/*      <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2178849887">*/}
          {/*        Neo Twin Peaks*/}
          {/*      </StyledLink>*/}
          {/*      <br />*/}
          {/*      <StandardImage src={neopeaks} alt="neopeaks" />*/}
          {/*    </Box>*/}
          {/*    <Box px={2} py={3} width={[1, 1 / 4]}>*/}
          {/*      <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2121157850">*/}
          {/*        Quicksilver*/}
          {/*      </StyledLink>*/}
          {/*      <br />*/}
          {/*      <StandardImage src={quicksilver} alt="quicksilver" />*/}
          {/*    </Box>*/}
          {/*    <Box px={2} py={3} width={[1, 1 / 4]}>*/}
          {/*      <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2192624799">*/}
          {/*        Sand Crystal Shard*/}
          {/*      </StyledLink>*/}
          {/*      <br />*/}
          {/*      <StandardImage src={crystal} alt="crystal" />*/}
          {/*    </Box>*/}
          {/*    <Box px={2} py={3} width={[1, 1 / 4]}>*/}
          {/*      <StyledLink href="https://steamcommunity.com/sharedfiles/filedetails/?id=2190063332">*/}
          {/*        Vales of the Templars*/}
          {/*      </StyledLink>*/}
          {/*      <br />*/}
          {/*      <StandardImage src={vales} alt="vales" />*/}
          {/*    </Box>*/}
          {/*  </Flex>*/}
        </div>
        <br />
      </Wrapper>
    );
  }
}
export default Home;
