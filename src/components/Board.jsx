import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import boardMapDispatch from '../redux/dispatch/board';
import boardStateToProps from '../redux/selectors/board';
import { TransitionMotion, spring } from 'react-motion';
import { springSetting2 } from '../utils/constants';
import Peg from './Peg';
import Hole from './Hole';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  getPegTransitionStyles = () => (
    this.props.pegs.map(peg => ({
      style: {scale: 1},
      key: peg.id,
      data: peg
    }))
  );

  handleMouseMove = (e) => {
    let {dragPeg, endDrag, draggedPeg} = this.props;

    if (draggedPeg.isBeingDragged) {
      if (e.buttons !== 0) {
        dragPeg(e);
      } else {
        endDrag();
      }
    }
  };

  handleMouseUp = () => {
    let {endDrag} = this.props;
    endDrag();
  };

  willLeave = () => {
    return {
      scale: spring(0, springSetting2)
    };
  };

  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        didLeave={this.props.animationDone}
        styles={this.getPegTransitionStyles}>
        {pegs => (
          <div className="game-board">
            {this.props.board.map(h => (
              <Hole key={`hole-${h.id}`} {...h} />
            ))}
            {pegs.map(({key, style, data}) => (
              <Peg {...data} key={key} style={style} />
            ))}
          </div>
        )}
      </TransitionMotion>
    );
  }
}

export default connect(
  boardStateToProps,
  boardMapDispatch,
)(Board);
