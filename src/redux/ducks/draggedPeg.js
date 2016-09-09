import { createAction, handleActions } from 'redux-actions';
import { createNewBoard, createPegs, isGameOver, getHoveredHole, getMiddleHole } from '../../utils/helpers';

import { dropPeg } from './game';

const PEG_DRAG_START = 'PEG_DRAG_START';
const PEG_DRAGGING = 'PEG_DRAGGING';
const PEG_DRAG_END = 'PEG_DRAG_END';

const pegStartDragAction = createAction(PEG_DRAG_START);
const pegDraggingAction = createAction(PEG_DRAGGING);
const pegEndDragAction = createAction(PEG_DRAG_END);

export const pegStartDrag = (pegId, delta, mouse) => (dispatch, getState) => {
  let {game} = getState();
  if (!game.lockControls && game.started) {
    dispatch(pegStartDragAction({pegId, delta, mouse}));
  }
}

export const pegDragging = (pageX, pageY) => (dispatch, getState) => {
  let {draggedPeg} = getState();
  let {delta: [dx, dy]} = draggedPeg;
  let mouse = [pageX - dx, pageY - dy];

  dispatch(pegDraggingAction({mouse}));
}

export const pegEndDrag = () => (dispatch, getState) => {
  let {draggedPeg} = getState();
  if (draggedPeg.isBeingDragged) {
    dispatch(dropPeg());
    dispatch(pegEndDragAction());
  }
}

const initialState = {
  pegId: null,
  isBeingDragged: false,
  delta: [0, 0],
  mouse: [0, 0]
}

export default handleActions({
  [PEG_DRAG_START]: (state, {payload: {pegId, delta, mouse}}) => {
    return {...state,
      isBeingDragged: true,
      pegId,
      delta,
      mouse
    };
  },
  [PEG_DRAGGING]: (state, {payload: {mouse}}) => {
    return {...state,
      mouse
    };
  },
  [PEG_DRAG_END]: (state) => {
    return {...state,
      isBeingDragged: false,
      delta: [0, 0]
    }
  }
}, initialState);
