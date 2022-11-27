import React from 'react';
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

function Home() {
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
      <hr />
      <Recent />
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
      <br />
    </Wrapper>
  );
}
export default Home;
