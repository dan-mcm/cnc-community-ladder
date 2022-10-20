import React from 'react';
import { CustomFooter, CustomLink } from '../utils/styles';

function Footer() {
  return (
    <CustomFooter>
      <CustomLink href="https://github.com/dan-mcm">Daniel McMahon</CustomLink>{' '}
      {new Date().getFullYear()} ©
    </CustomFooter>
  );
}

export default Footer;
