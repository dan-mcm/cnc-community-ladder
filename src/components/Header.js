import React, { Component } from 'react';
import styled from 'styled-components';

const CustomerHeader = styled.header`
  margin: auto;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgb(139, 0, 0, 0.3);
  min-width: 600px;
`;

const SiteTitle = styled.h1`
  color: gold;
  font-family: 'Inconsolata', monospace;
  font-size: 50px;
`;

class Header extends Component {
  render() {
    return (
      <CustomerHeader>
        <SiteTitle>Command & Conquer - Tiberian Dawn - Community Ladder</SiteTitle>
      </CustomerHeader>
    );
  }
}

export default Header;
