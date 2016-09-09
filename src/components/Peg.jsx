import React from 'react';
import { connect } from 'react-redux';
import {Motion, spring} from 'react-motion';
import pegMapDispatch from '../redux/dispatch/peg';
import pegStateToProps from '../redux/selectors/peg';
import { getPegStyle } from '../styles/peg.style';

const Peg = ({style, color, openingMove, beginDrag, ...props}) => (
  <Motion style={{...style, ...getPegStyle(props)}}>
  {({x, y, scale, boxShadow}) => (
    <div
      className="golf-peg"
      onClick={openingMove}
      onMouseDown={beginDrag}
      style={{
        backgroundColor: color,
        WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
        zIndex: props.status === 'normal' ? 98 : 99,
      }}
    />)
  }
  </Motion>
);

export default connect(
  pegStateToProps,
  pegMapDispatch,
)(Peg);
