import React,{Component} from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import { StyledLink } from '../utils/styles';
import { Flex, Box } from 'grid-styled';
import ModalSearchBar from '../components/ModalSearchBar';
import styled from 'styled-components';

// icons
import gdi from '../images/factions/gdi.png';
import nod from '../images/factions/nod.png';
import random from '../images/factions/random.png'
import randomgdi from '../images/factions/gdirandom.png'
import randomnod from '../images/factions/nodrandom.png'

const IconImg = styled.img`
  max-width: 40px;
  max-height: 40px;
  margin: 0 auto;
  padding: 0px;
  vertical-align: middle;
  padding-bottom: 5px;
`

const ModalWrap = styled.div`
  margin: 0 auto;
  min-width: 600px;
  max-height: 600px;
  overflow-y: auto;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: black;
  color: white;
  line-height: 1.6;
`;

const CustomP = styled.p`
  font-size: 15px;
`;

const CustomImg = styled.img`
  max-width: 180px;
  max-height: 180px;
`

let greenStyle = {
  color: 'green',
  fontWeight: 'bold'
}

let redStyle = {
  color: 'red',
  fontWeight: 'bold'
}

let plainStyle = {
  color: 'white',
  fontWeight: 'bold'
}

const modalStyle = {
  color: "yellow",
   backgroundColor: "black"
 };

class ScoreModal extends Component{
    toDateString(epochValue){
      let date = epochValue
      var utcSeconds = date
      var d = new Date(0) // sets the date to the epoch
      d.setUTCSeconds(utcSeconds)
      date = d
      return `${d.toLocaleDateString()} - ${d.toLocaleTimeString()}`
    }

   render(){
      const { data, rank, onRequestClose } = this.props;
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.ScaleUp}
            styles={modalStyle}
            >
            <ModalWrap>
              <h3>#{rank + 1} {data.name}</h3>
              <br/>
              <hr/>
              <br/>
              <div style={plainStyle}>
                <Flex flexWrap="wrap">
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    <span role="img" aria-label="trophy">🏆</span> TOTAL WINS <br/>{(data.games.filter(game => game.result === "W")).length}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    <span role="img" aria-label="x">❌</span> TOTAL LOSSES <br/>{(data.games.filter(game => game.result === "L")).length}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    <span role="img" aria-label="play">▶️</span> TOTAL PLAYED <br/>{data.games.length}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    <span role="img" aria-label="graph">📈</span> OVERALL WINRATE <br/> {Math.floor((((data.games.filter(game => game.result === "W")).length) / (data.games.length) * 100))+'%'}
                  </Box>
                </Flex>
                <br/>
                <hr/>
                <h3>FACTION STATS</h3><br/>
                <Flex>
                  {console.log(data.games.filter(game => game.player_faction==="GDI").length)}
                  { (data.games.filter(game => game.player_faction==="GDI").length > 0) ?
                  <Box px={2} py={3} width={[1, 1 / 3]}>
                    <IconImg src={gdi} alt="gdi" /><br/>
                    GAMES WON - {data.games.filter(game => game.result === "W" && game.player_faction==="GDI" && ( game.player_random===false || game.player_random===null)).length}<br/>
                    GAMES LOST - {data.games.filter(game => game.result === "L" && game.player_faction==="GDI" && ( game.player_random===false || game.player_random===null)).length}<br/>
                    WINRATE - {(data.games.filter(game => game.result === "W" && game.player_faction==="GDI" && (game.player_random===false || game.player_random===null)).length > 0) ? Math.floor((data.games.filter(game => game.result === "W" && game.player_faction==="GDI" && (game.player_random===false || game.player_random===null)).length) / (data.games.filter(game => game.result === "W" && game.player_faction==="GDI" && (game.player_random===false || game.player_random===null)).length + data.games.filter(game => game.result === "L" && game.player_faction==="GDI" && (game.player_random===false || game.player_random===null)).length) * 100) : 0}%
                  </Box> : ""
                }
                { (data.games.filter(game => game.player_faction==="Nod").length > 0) ?
                  <Box px={2} py={3} width={[1, 1 / 3]}>
                    <IconImg src={nod} alt="nod" /><br/>
                    GAMES WON - {data.games.filter(game => game.result === "W" && game.player_faction==="Nod" && (game.player_random===false || game.player_random===null)).length}<br/>
                    GAMES LOST - {data.games.filter(game => game.result === "L" && game.player_faction==="Nod" && (game.player_random===false || game.player_random===null)).length}<br/>
                    WINRATE - {(data.games.filter(game => game.result === "W" && game.player_faction==="Nod" && (game.player_random===false || game.player_random===null)).length > 0) ? Math.floor((data.games.filter(game => game.result === "W" && game.player_faction==="Nod" && (game.player_random===false || game.player_random===null)).length) / (data.games.filter(game => game.result === "W" && game.player_faction==="Nod" && (game.player_random===false || game.player_random===null)).length + data.games.filter(game => game.result === "L" && game.player_faction==="Nod" && (game.player_random===false || game.player_random===null)).length) * 100) : 0}%
                  </Box> : ""
                }
                { (data.games.filter(game => game.player_random===true).length > 0) ?
                  <Box px={2} py={3} width={[1, 1 / 3]}>
                    <IconImg src={random} alt="random" /><br/>
                    GAMES WON - {data.games.filter(game => game.result === "W" && game.player_random===true).length}<br/>
                    GAMES LOST - {data.games.filter(game => game.result === "L" && game.player_random===true).length}<br/>
                    WINRATE - {(data.games.filter(game => game.result === "W" && game.player_random===true).length > 0) ? Math.floor((data.games.filter(game => game.result === "W" && game.player_random===true).length) / (data.games.filter(game => game.result === "W" && game.player_random===true).length + data.games.filter(game => game.result === "L" && game.player_random===true).length) * 100) : 0}%
                  </Box> : ""
                }
                </Flex>
                <br/>
                <hr/>
              </div>
              <ModalSearchBar data={data}/>
               <h3>RECENT GAMES</h3>
              <Flex flexWrap="wrap">
               {
                 data.games.sort((a,b) => (a.date > b.date) ? -1 : 1 ).map(game => (
                    <Box px={2} py={3} width={[1, 1 / 3]}>
                      <CustomP>
                        {
                          (game.player_random===true) ?
                          ((game.player_faction === 'GDI') ? <IconImg src={randomgdi} alt="randomgdi" /> : <IconImg src={randomnod} alt="randomnod" />)
                          : ((game.player_faction === 'GDI')  ? <IconImg src={gdi} alt="gdi" /> : <IconImg src={nod} alt="nod" />)
                        }
                        <b> {data.name}</b> -v- <b>{game.opponent} </b>
                        {
                          ( game.opponent_random===true) ?
                          ((game.opponent_faction === 'GDI') ? <IconImg src={randomgdi} alt="randomgdi" /> : <IconImg src={randomnod} alt="randomnod" />)
                          : ((game.opponent_faction === 'GDI')  ? <IconImg src={gdi} alt="gdi" /> : <IconImg src={nod} alt="nod" />)
                        } <br/>
                        {this.toDateString(game.date)} <br/>
                        {`${Math.floor(game.duration / 60)}mins ${Math.trunc(game.duration - Math.floor(game.duration / 60) * 60)}secs`}<br/>
                        {(game.result==="W") ? <span style={greenStyle}>Win</span> : <span style={redStyle}>Loss</span>} <br/>
                        <StyledLink href={game.replay}>Replay File</StyledLink>  <br/>
                        <CustomImg src={require(`../images/maps/${game.map}.png`)}/><br/>
                      </CustomP>
                    </Box>
                   )
                 )
               }
               </Flex>
               <br/>
               <br/>
            <button onClick={ModalManager.close}>Close</button>
            <br/><br/>
            </ModalWrap>
         </Modal>
      );
   }
}

export default ScoreModal;
