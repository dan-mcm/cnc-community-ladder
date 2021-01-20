import React, { Component } from 'react';
import { Wrapper } from '../utils/styles';
import RecentGames from '../components/RecentGames.js';

class Recent extends Component {
  render() {
    return (
      <Wrapper>
        <h2>Recent Season Games Played</h2>
        <RecentGames />
      </Wrapper>
    );
  }
}

export default Recent;
