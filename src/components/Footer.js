import React, { Component } from 'react';
import { CustomFooter, CustomLink } from '../utils/styles';

class Footer extends Component {
  render() {
    return (
      <CustomFooter>
        <CustomLink href="https://github.com/dan-mcm">
          Daniel McMahon
        </CustomLink>{' '}
        2020 ©
      </CustomFooter>
    );
  }
}

export default Footer;
