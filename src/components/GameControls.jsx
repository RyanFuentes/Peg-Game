import React from 'react';
import { connect } from 'react-redux';
import gameControlsDispatch from '../redux/dispatch/gameControls';
import ButtonSlide from './ButtonSlide';

const GameControls = ({newGame}) => {
  return (
    <div className="game-controls">
      <ButtonSlide
        title="New Game"
        options={[
          {title: 'Easy', onClick: newGame.bind(null, 4)},
          {title: 'Medium', onClick: newGame.bind(null, 5)},
          {title: 'Hard', onClick: newGame.bind(null, 6)}
        ]}/>
    </div>
  );
}

export default connect(
  null,
  gameControlsDispatch,
)(GameControls);
