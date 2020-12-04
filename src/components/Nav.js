import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

const CustomNav = styled.div`
  background-image: url('/beanstalk-dark.png');
  background-repeat: repeat;
  min-width: 600px;
`;

const CustomLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

class Nav extends Component {
  render() {
    return (
      <CustomNav>
        <Flex flexWrap="wrap">
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <CustomLink to="/">Home</CustomLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <CustomLink to="/ladder">Ladder</CustomLink>
          </Box>
          <Box px={2} py={3} width={[1, 1 / 3]}>
            <CustomLink to="/social">Social</CustomLink>
          </Box>
        </Flex>
      </CustomNav>
    );
  }
}

export default Nav;
