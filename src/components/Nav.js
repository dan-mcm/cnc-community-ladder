import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import { CustomNav, CustomReactLink, CustomIcon } from '../utils/styles';

class Nav extends Component {
  render() {
    return (
      <CustomNav>
        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 1 / 7]}>
            <CustomReactLink to="/">
              C&C REMASTERED
              <br />
              TIBERIAN DAWN
              <br /> COMMUNITY
            </CustomReactLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 7]}>
            <CustomReactLink to="/ladder">LADDER</CustomReactLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 7]}>
            <CustomReactLink to="/recent">RECENT</CustomReactLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 7]}>
            <CustomReactLink to="/streamers">STREAMERS</CustomReactLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 7]}>
            <CustomReactLink to="/tournaments">TOURNAMENTS</CustomReactLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 7]}>
            <CustomReactLink to="/social">SOCIAL</CustomReactLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 7]}>
            <a href="https://discord.gg/wRH37XXy3n">
              <CustomIcon src={require('../images/icons/discord.png')} />
            </a>
          </Box>
        </Flex>
      </CustomNav>
    );
  }
}

export default Nav;
