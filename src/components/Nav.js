import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

const CustomNav = styled.div`
  background-repeat: repeat;
  background-color: black;
  min-width: 600px;
`;

const CustomLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: none;
    color: gold;
  }
`;

const CustomIcon = styled.img`
  max-width: 50px;
  max-height: 50px;
  padding: 0px;
  filter: grayscale(50%);
  &:hover {
    filter: grayscale(0%);
  }
`;

const CustomText = styled.p`
color: white;
text-decoration: none;
font-weight: bold;
font-size: 14px;
`

class Nav extends Component {
  render() {
    return (
      <CustomNav>
        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 1 / 5]}>
            <CustomLink to="/">C&C REMASTERED<br/>TIBERIAN DAWN<br/> COMMUNITY</CustomLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 5]}>
            <CustomLink to="/ladder">LADDER</CustomLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 5]}>
            <CustomLink to="/tournaments">TOURNAMENTS</CustomLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 5]}>
            <CustomLink to="/social">SOCIAL</CustomLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 5]}>
            <a href="https://discord.gg/wRH37XXy3n"><CustomIcon src={require('../images/icons/discord.png')} /></a>
          </Box>
        </Flex>
      </CustomNav>
    );
  }
}

export default Nav;
