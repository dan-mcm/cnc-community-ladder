import React, { Component } from 'react';
import { Wrapper } from '../utils/styles';
import RecentGames from '../components/RecentGames';

class Recent extends Component {
  render() {
    return (
      <Wrapper>
        <h2>RECENT GAME STATISTICS</h2>
        <RecentGames />
      </Wrapper>
    );
  }
}

export default Recent;
