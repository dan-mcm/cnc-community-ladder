import React, { Component } from 'react';
import styled from 'styled-components';

// icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';

const CustomHeaderRow = styled.tr`
  border-bottom: 2px solid white;
`

const CustomRow = styled.tr`
  border-bottom: 2px solid white;
`
const GDIData = styled.td`
  background-color: rgb(89,83,39, 0.7);
  &:hover{
    background-color: rgb(89,83,39,1);
  }
`

const NodData = styled.td`
  background-color: rgb(114,47,55, 0.7);
  &:hover{
    background-color: rgb(114,47,55, 0.7)
  }
`

const RandomData = styled.td`
  background-color: rgb(34,139,34, 0.7);
  &:hover{
    background-color: rgb(34,139,34, 1);
  }
`

const IconImg = styled.img`
  max-width: 40px;
  max-height: 40px;
  margin: 0 auto;
  padding: 0px;
  vertical-align: middle;
  padding-bottom: 5px;
`

class Veterans extends Component {
  constructor(props) {
    super(props)
  }

  specialBadge(player, rank){
    if (rank === 1) return '🥇 ' + player + ' 🥇'
    if (rank === 2) return '🥈 ' + player + ' 🥈'
    if (rank === 3) return '🥉 ' + player + ' 🥉'
    return player;
  }

  render() {
    return (
      <div>
        <h3>SEASON 3+ VETERANS</h3>
        <table>
        <CustomHeaderRow>
          <th>GDI</th>
          <th>NOD</th>
          <th>TOTAL</th>
        </CustomHeaderRow>
        <CustomRow>
          <GDIData><IconImg src={gdi} alt="nod" /><br/>🎖️ {this.props.highestGDI.player} 🎖️ <br/> {this.props.highestGDI.gdiTotal} GDI Games Played</GDIData>
          <NodData><IconImg src={nod} alt="nod" /><br/>🎖️ {this.props.highestNod.player} 🎖️ <br/> {this.props.highestNod.nodTotal} Nod Games Played</NodData>
          <RandomData><IconImg src={gdi} alt="nod" /> + <IconImg src={nod} alt="nod" /><br/>🎖️ {this.props.highestTotal.player} 🎖️ <br/> {this.props.highestTotal.playerTotal} Total Games Played</RandomData>
        </CustomRow>
        </table>

      </div>
    );
  }
}

export default Veterans;
