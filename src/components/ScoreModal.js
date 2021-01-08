import React,{Component} from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import { StyledLink } from '../utils/styles';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

const ModalWrap = styled.div`
  margin: 0 auto;
  min-width: 600px;
  max-height: 600px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: black;
  color: white;
  line-height: 1.6;
`;

const CustomP = styled.p`
  font-size: 14px;
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
              <div style={greenStyle}>
                <Flex flexWrap="wrap">
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    🏆 WINS: {(data.games.filter(game => game.result === "W")).length}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    ❌ LOSSES: {(data.games.filter(game => game.result === "L")).length}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    ▶️ PLAYED: {data.games.length}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    📈 WIN RATIO: {Math.floor((((data.games.filter(game => game.result === "W")).length) / (data.games.length) * 100))+'%'}
                  </Box>
                </Flex>
              </div>

               <h3>Recent Games</h3>
               <Flex flexWrap="wrap">
               {
                 data.games.map(game => (
                    <Box px={2} py={3} width={[1, 1 / 3]}>
                      <CustomP>

                      <b>{data.name}</b> -v- <b>{game.opponent}</b> <br/>
                      {(game.result==="W") ? <span style={greenStyle}>Win</span> : <span style={redStyle}>Loss</span>} <br/>
                      {this.toDateString(game.date)                      }
                      <br/>
                      <CustomImg src={require(`../images/maps/${game.map}.png`)}/><br/>
                      <StyledLink href={game.replay}>Replay File</StyledLink>
                      </CustomP>
                    </Box>
                   )
                 )
               }
               </Flex>
               <br/>
               <br/>
            <button onClick={ModalManager.close}>Close</button>
            </ModalWrap>
         </Modal>
      );
   }
}

export default ScoreModal;
