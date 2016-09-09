import React from 'react';
import { connect } from 'react-redux';

const InfoBar = ({message, visible}) => {
  return (
    <div className="info-bar">
      <p style={{opacity: visible ? 100 : 0}}>{message}</p>
    </div>
  );
}


const getMessage = (() => {
  let message = '';

  return (state => {
    let visible = true;
    if (!state.game.started) {
      message = 'Click a Peg to Begin.';
    } else if (state.game.isGameOver) {
      message = 'Game Over!';
    } else if (state.game.pegs.length === state.game.board.length -1) {
      message = 'Jump pegs by dragging them.';
    } else {
      visible = false;
    }
    return {message, visible};
  });
})();

export default connect(
  (state, props) => ({...getMessage(state)}),
  null,
)(InfoBar);
