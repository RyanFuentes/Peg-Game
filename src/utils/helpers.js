import ColorScheme from 'color-scheme';
import {pegWidth, pegHeight} from './constants';

export const coordinatesByIndex = (i) => {
  let y = Math.ceil((Math.sqrt(8 * (i + 1) + 1) - 1) / 2) - 1;
  let x = (i + 1) - ((y + 1) * y / 2) - ((y + 2) / 2);

  return {x: x*pegWidth, y: y*pegHeight};
}

export const numHolesFromLength = (x) => {
  return x * (x + 1) / 2;
}

export const generatePrettyColors = () => {
  var scheme = new ColorScheme;
  scheme.from_hue(~~(Math.random() * 360))
        .scheme('triade')
        .variation('soft');

  return scheme.colors();
}

export const createNewBoard = (sideLength = 5) => {
  let numHoles = numHolesFromLength(sideLength);

  return [...Array(numHoles).keys()].map(n => ({
    id: n,
    ...coordinatesByIndex(n)
  }));
}

export const createPegs = (board) => {
  let colors = generatePrettyColors();
  return board.map((h, i) => ({
    id: i,
    holeId: h.id,
    color: `#${colors[i%colors.length]}`
  }));
}

export const canPegJumpHole = (peg, hole, board) => {
  let pegsHole = getPegsHole(peg, board);
  return (
    Math.abs(pegsHole.x - hole.x) <= pegWidth &&
    Math.abs(pegsHole.y - hole.y) <= pegHeight
  );
}

export const getMiddleHole = (hole1, hole2, board) => {
  let midPoint = {
    x: (hole1.x + hole2.x) / 2,
    y: (hole1.y + hole2.y) / 2
  };

  return board.find(h => h.x === midPoint.x && h.y === midPoint.y);
}

const getHolesPeg = (hole, pegs) => {
  return pegs.find(p => p.holeId === hole.id);
}

const isHoleFilled = (hole, pegs) => {
  return !!getHolesPeg(hole, pegs);
}

export const getPegCoordinates = (peg, board) => {
  let {x, y} = getPegsHole(peg, board);
  return {x, y};
}

export const getPegsHole = (peg, board) => {
  return board.find(h => h.id === peg.holeId);
}

export const getValidHoleForPegMove = (peg, destXY, pegs, board) => {
  let pegsHole = getPegsHole(peg, board);
  let midpointHole = getMiddleHole(pegsHole, destXY, board);
  let destinationHole = board.find(h => h.x === destXY.x && h.y === destXY.y);

  if (
    !destinationHole ||
    isHoleFilled(destinationHole, pegs) ||
    !midpointHole ||
    !isHoleFilled(midpointHole, pegs) ||
    !canPegJumpHole(peg, midpointHole, board)
  ) return null;

  return destinationHole;
}


export const isGameOver = (board, pegs) => {
  let gameOver = true;
  pegs.forEach(p => {
    board.forEach(h => {
      if (getValidHoleForPegMove(p, h, pegs, board)) {
        gameOver = false;
      }
    });
  });

  return gameOver;
}

export const roundXYToNearestPegLocation = ({x, y}) => {
  // x rounds to nearest 0.5 width
  // y rounds to nearest 1.0 height
  let descaledX = x / pegWidth;
  let descaledY = y / pegHeight;

  return {
    x: Math.round(descaledX*2)/2 * pegWidth,
    y: Math.round(descaledY) * pegHeight
  };
}

export const getHoveredHole = (peg, coordinates, pegs, board) => {
  let hoveredSpot = roundXYToNearestPegLocation({x: coordinates[0], y: coordinates[1]});
  return getValidHoleForPegMove(peg, hoveredSpot, pegs, board);
}

export const getJumpedPeg = (peg, destinationHole, pegs, board) => {
  let sourceHole = getPegsHole(peg, board);
  let middleHole = getMiddleHole(sourceHole, destinationHole, board);

  return getHolesPeg(middleHole, pegs);
}
