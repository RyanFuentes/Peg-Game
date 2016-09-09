import React from 'react';
import Board from './Board';
import GameControls from './GameControls';
import InfoBar from './InfoBar';

const Game = () => {
  return (
    <div>
      <Board />
      <GameControls />
      <InfoBar />
    </div>
  );
}

export default Game;
