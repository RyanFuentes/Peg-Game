import { pegDragging, pegEndDrag } from '../ducks/draggedPeg';
import {unlockControls} from '../ducks/game';

export default function boardDispatch(dispatch) {
  return {
    dragPeg: ({pageX, pageY}) => dispatch(pegDragging(pageX, pageY)),
    endDrag: () => dispatch(pegEndDrag()),
    animationDone: () => dispatch(unlockControls())
  };
}
