import React from 'react';
import { connect } from 'react-redux';
import gameControlsDispatch from '../redux/dispatch/gameControls';

const GameControls = ({newGame}) => {
  return (
    <div className="game-controls">
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

export default connect(
  null,
  gameControlsDispatch,
)(GameControls);
