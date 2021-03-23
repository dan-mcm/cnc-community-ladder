import React, { Component } from 'react';
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

class ScoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    };
  }

  componentDidMount() {
    this.scoreState(this.props.season, this.props.data.player_name);
  }

  scoreState(season, player) {
    return axios.get(`/elohistory/${season}/${player}`).then((matches) => {
      const { data } = matches;
      this.setState({ matches: data });
    });
  }

  render() {
    const { data, playername, rank, season, onRequestClose } = this.props;

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
            matches={this.state.matches}
            season={season}
            playername={playername}
          />
          <ModalSearchBar data={this.state.matches} playername={playername} />
          <RecentPlayerGames
            matches={this.state.matches}
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
}

ScoreModal.propTypes = {
  data: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  season: PropTypes.string.isRequired,
  playername: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ScoreModal;
