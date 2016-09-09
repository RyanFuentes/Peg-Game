import { openingMove } from '../ducks/game';
import { pegStartDrag } from '../ducks/draggedPeg';

export default function boardDispatch(dispatch, props) {
  return {
    openingMove: () => dispatch(openingMove(props.id)),
    beginDrag: ({pageX, pageY}) => {
      let delta = [pageX - props.x, pageY - props.y];
      let mouse = [props.x, props.y];
      dispatch(pegStartDrag(props.id, delta, mouse));
    }
  };
}
