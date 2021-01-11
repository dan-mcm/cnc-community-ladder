// sourced from: https://www.coderomeos.org/scroll-to-top-of-the-page-a-simple-react-component

import React, { Component } from "react";
import styled from 'styled-components';

const CustomButton = styled.button`
  color: white;
  background-color: rgb(40,40,40);
  padding: 0.5em;
  &:hover{
    background-color: rgb(16,16,16) ;
    color: gold;
  }
`

export default class ScrollToTop extends Component {
  constructor(props) {
      super(props);
      this.state = {
        is_visible: false
      };
    }

    componentDidMount() {
      var scrollComponent = this;
      document.addEventListener("scroll", function(e) {
        scrollComponent.toggleVisibility();
      });
    }

    toggleVisibility() {
      if (window.pageYOffset > 300) {
        this.setState({
          is_visible: true
        });
      } else {
        this.setState({
          is_visible: false
        });
      }
    }

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

    render() {
      const { is_visible } = this.state;
      return (
        <div className="scroll-to-top">
          {is_visible && (
            <CustomButton onClick={() => this.scrollToTop()}>Scroll To Top</CustomButton>
          )}
        </div>
      );
    }
  }