import React,{Component} from 'react';
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';
import { StyledLink } from '../utils/styles';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

const ModalWrap = styled.div`
  margin: 0 auto;
  min-width: 600px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgba(0, 0, 0, 1);
  color: white;
  line-height: 1.6;
`;

let greenStyle = {
  color: 'green',
  fontWeight: 'bold'
}

let redStyle = {
  color: 'red',
  fontWeight: 'bold'
}

class ScoreModal extends Component{
   render(){
      const { data,onRequestClose } = this.props;
      return (
         <Modal
            onRequestClose={onRequestClose}
            effect={Effect.ScaleUp}>
            <ModalWrap>
              <h3>#{data.rank} {data.name}</h3>
              <div style={greenStyle}>
                <Flex flexWrap="wrap">
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    🏆 WINS: {data.wins}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    ❌ LOSSES: {data.losses}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    ▶️ PLAYED: {data.wins + data.losses}
                  </Box>
                  <Box px={2} py={3} width={[1, 1 / 4]}>
                    📈 WIN RATIO: {Math.floor((data.wins / (data.losses+data.wins) * 100))+'%'}
                  </Box>
                </Flex>
              </div>

               <h3>Recent Games</h3>
               <Flex flexWrap="wrap">
               {
                 data.games.map(game => (
                    <Box px={2} py={3} width={[1, 1 / 3]}>
                      <p>
                      {game.date} <br/>
                      {data.name} -v- {game.opponent} <br/>
                      {(game.result==="W") ? <span style={greenStyle}>Win</span> : <span style={redStyle}>Loss</span>}
                      <br/>
                      {game.map} <br/>
                      <StyledLink href={game.replay}>Replay File</StyledLink>
                      </p>
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
