import { createAction, handleActions } from 'redux-actions';
import { createNewBoard, createPegs, isGameOver, getHoveredHole, getJumpedPeg } from '../../utils/helpers';

const NEW_GAME = 'NEW_GAME';
const REMOVE_PEG = 'REMOVE_PEG';
const MOVE_PEG = 'MOVE_PEG';
const UNLOCK_CONTROLS = 'UNLOCK_CONTROLS';

const newGameAction = createAction(NEW_GAME);
const removePegAction = createAction(REMOVE_PEG);
const movePegAction = createAction(MOVE_PEG);
const unlockControlsAction = createAction(UNLOCK_CONTROLS);

export const newGame = () => (dispatch) => dispatch(newGameAction())

export const openingMove = (pegId) => (dispatch, getState) => {
  let {game: {started, pegs}} = getState();
  let peg = pegs.find(p => p.id === pegId);

  if (!started && peg) {
    dispatch(removePegAction({pegId}));
  }
}

export const dropPeg = () => (dispatch, getState) => {
  let { game, draggedPeg } = getState();
  let peg = game.pegs.find(p => p.id === draggedPeg.pegId);
  let destHole = getHoveredHole(peg, draggedPeg.mouse, game.pegs, game.board);

  if (destHole) {
    let jumpedPeg = getJumpedPeg(peg, destHole, game.pegs, game.board);
    dispatch(movePegAction({pegId: peg.id, holeId: destHole.id}));
    dispatch(removePegAction({pegId: jumpedPeg.id}));
  }
}

export const unlockControls = () => (dispatch, getState) => {
  dispatch(unlockControlsAction());
}

const initialState = (puzzleLength = 5) => {
  let board = createNewBoard(puzzleLength);
  let pegs = createPegs(board);

  return {
    board,
    pegs,
    lockControls: false,
    started: false,
    isGameOver: false
  }
};


export default handleActions({
  [NEW_GAME]: () => {
    return initialState();
  },
  [REMOVE_PEG]: (state, {payload: {pegId}}) => {
    let pegIndex = state.pegs.indexOf(state.pegs.find(p => p.id === pegId));
    let updatedPegs = [...state.pegs.slice(0, pegIndex), ...state.pegs.slice(pegIndex + 1)];
    return {...state,
      started: true,
      lockControls: true,
      isGameOver: isGameOver(state.board, updatedPegs),
      pegs: updatedPegs
    };
  },
  [MOVE_PEG]: (state, {payload: {pegId, holeId}}) => {
    return {...state,
      pegs: state.pegs.map(p => p.id === pegId ? {...p, holeId} : p)
    };
  },
  [UNLOCK_CONTROLS]: (state) => {
    return {...state,
      lockControls: false
    };
  }
}, initialState());
