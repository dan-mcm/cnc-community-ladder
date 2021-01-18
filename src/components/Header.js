import React, { Component } from 'react';
import { CustomerHeader, SiteTitle } from '../utils/styles';

class Header extends Component {
  render() {
    return (
      <CustomerHeader>
        <SiteTitle>
          Command & Conquer - Tiberian Dawn - Community Ladder
        </SiteTitle>
      </CustomerHeader>
    );
  }
}

export default Header;
