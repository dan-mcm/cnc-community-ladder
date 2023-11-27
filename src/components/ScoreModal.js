import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { ModalWrap } from '../utils/styles';
import ModalSearchBar from './ModalSearchBar';
import PlayerStats from './PlayerStats';
import RecentPlayerGames from './RecentPlayerGames';

const axios = require('axios').default;

const modalStyle = {
  color: 'yellow',
  backgroundColor: 'black',
};

function scoreState(setMatches, season, player) {
  return axios.get(`/elohistory/${season}/${player}`).then((matches) => {
    const { data } = matches;
    setMatches(data);
  });
}

function ScoreModal(props) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    scoreState(setMatches, props.season, props.data.player_name);
  }, [setMatches, props.season, props.data.player_name]);

  const { data, playername, rank, season, onRequestClose } = props;

  return (
    <Modal
      styles={modalStyle}
      effect={Effect.ScaleUp}
      onRequestClose={onRequestClose}
    >
      <ModalWrap>
        <h3>
          #{rank + 1} {playername}
        </h3>
        <br />
        <hr />
        <br />
        <PlayerStats
          matches={matches}
          season={season}
          playername={playername}
        />
        <ModalSearchBar data={matches} playername={playername} />
        <RecentPlayerGames
          matches={matches}
          season={season}
          playername={playername}
          data={data}
        />
        <button onClick={ModalManager.close}>Close</button>
        <br />
        <br />
      </ModalWrap>
    </Modal>
  );
}

ScoreModal.propTypes = {
  data: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
  playername: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ScoreModal;
