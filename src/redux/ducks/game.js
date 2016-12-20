import { createAction, handleActions } from 'redux-actions';
import { createNewBoard, createPegs, isGameOver, getHoveredHole, getJumpedPeg } from '../../utils/helpers';
import {PEG_DRAG_END} from './draggedPeg';

const NEW_GAME = 'NEW_GAME';
const OPENING_MOVE = 'OPENING_MOVE';
const JUMP_MOVE = 'JUMP_MOVE';

const newGameAction = createAction(NEW_GAME);
const openingMoveAction = createAction(OPENING_MOVE);
const jumpMoveAction = createAction(JUMP_MOVE);

export const newGame = () => (dispatch) => dispatch(newGameAction())

export const openingMove = (pegId) => (dispatch, getState) => {
  let {game: {started, pegs}} = getState();
  let peg = pegs.find(p => p.id === pegId);

  if (!started && peg) {
    dispatch(openingMoveAction({pegId}));
  }
}

export const jumpMove = () => (dispatch, getState) => {
  let { game, draggedPeg } = getState();
  let peg = game.pegs.find(p => p.id === draggedPeg.pegId);
  let destHole = getHoveredHole(peg, draggedPeg.mouse, game.pegs, game.board);

  if (destHole) {
    let jumpedPeg = getJumpedPeg(peg, destHole, game.pegs, game.board);
    dispatch(jumpMoveAction({pegId: peg.id, holeId: destHole.id, jumpedPegId: jumpedPeg.id}));
  }
}

const initialState = (puzzleLength = 5) => {
  let board = createNewBoard(puzzleLength);
  let pegs = createPegs(board);

  return {
    board,
    pegs,
    started: false,
    isGameOver: false
  }
};

const removePeg = (state, pegId) => {
  let {pegs, board} = state;
  let pegIndex = pegs.indexOf(pegs.find(p => p.id === pegId));
  let updatedPegs = [...pegs.slice(0, pegIndex), ...pegs.slice(pegIndex + 1)];
  return {...state,
    started: true,
    isGameOver: isGameOver(board, updatedPegs),
    pegs: updatedPegs
  };
};

const movePeg = (state, pegId, holeId) => {
  return {...state,
    pegs: state.pegs.map(p => p.id === pegId ? {...p, holeId} : p)
  };
};

const jumpPeg = (state, pegId, holeId, jumpedPegId) => {
  let newState = movePeg(state, pegId, holeId);
  return removePeg(newState, jumpedPegId);
};

export default handleActions({
  [NEW_GAME]: () => {
    return initialState();
  },
  [OPENING_MOVE]: (state, {payload: {pegId}}) => {
    return removePeg(state, pegId);
  },
  [JUMP_MOVE]: (state, {payload: {pegId, holeId, jumpedPegId}}) => {
    return jumpPeg(state, pegId, holeId, jumpedPegId);
  }
}, initialState());
