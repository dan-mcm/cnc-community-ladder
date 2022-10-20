// Sourced from: https://www.coderomeos.org/scroll-to-top-of-the-page-a-simple-react-component

import React, { useState, useEffect } from 'react';
import { CustomButton } from '../utils/styles';

function toggleVisibility(setVisibility) {
  if (window.pageYOffset > 300) {
    setVisibility(true);
  } else {
    setVisibility(false);
  }
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function ScrollToTop() {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', function (e) {
      toggleVisibility(setVisibility);
    });
  });

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <CustomButton onClick={() => scrollUp()}>Scroll To Top</CustomButton>
      )}
    </div>
  );
}

export default ScrollToTop;
