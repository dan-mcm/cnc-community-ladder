import React from 'react';
import { Wrapper } from '../utils/styles';
import RecentGames from '../components/RecentGames';

function Recent() {
  return (
    <Wrapper>
      <h2>RECENT GAME STATISTICS</h2>
      <RecentGames />
    </Wrapper>
  );
}

export default Recent;
