import React, { Component } from 'react';
import { Wrapper } from '../utils/styles';

class Tournaments extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <p>
            Recent Tournament Footage & Details
          </p>
        </div>
        <hr/>
        <div>
          <h3>Upcoming Tournaments</h3>
          <p>Pending...</p>
          <br/>
          <br/>
          <hr/>
        </div>
        <div>
          <h4>Groundhog Brawl #5</h4>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/LCIADKgFYgg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <br/>
          <br/>
          <hr/>
        </div>
        <div>
          <h4>Groundhog Brawl #4</h4>
          <iframe title="placeholder-video" width="560" height="315" src="https://www.youtube.com/embed/g2DAK4dtEZQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <br/>
          <br/>
          <hr/>
        </div>
        <br/>
      </Wrapper>
    );
  }
}
export default Tournaments;
