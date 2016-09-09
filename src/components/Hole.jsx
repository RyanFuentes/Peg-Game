import React from 'react';

const Hole = ({x, y}) => {
  return (
    <div
      className="hole"
      style={{
        WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(0.25)`,
        transform: `translate3d(${x}px, ${y}px, 0) scale(0.25)`,
        marginLeft: 1,
        marginTop: 1
      }}
    />
  );
};

export default Hole;
