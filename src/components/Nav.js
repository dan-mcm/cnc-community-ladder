import React from 'react';
import { Flex, Box } from 'grid-styled';
import { CustomNav, CustomReactLink, CustomIcon } from '../utils/styles';

function Nav() {
  return (
    <CustomNav>
      <Flex flexWrap="wrap">
        <Box px={2} py={3} width={[1, 1 / 4]}>
          <CustomReactLink to="/">Home</CustomReactLink>
        </Box>
        <Box px={2} py={3} width={[1, 1 / 4]}>
          <CustomReactLink to="/leaderboard">Leaderboard</CustomReactLink>
        </Box>
        <Box px={2} py={3} width={[1, 1 / 4]}>
          <CustomReactLink to="/recent">Recent</CustomReactLink>
        </Box>
        <Box px={2} py={3} width={[1, 1 / 4]}>
          <a href="https://discord.gg/wRH37XXy3n">
            <CustomIcon src={require('../images/icons/discord.png')} />
          </a>
        </Box>
      </Flex>
    </CustomNav>
  );
}

export default Nav;
