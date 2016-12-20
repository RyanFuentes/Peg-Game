import { pegDragging, pegEndDrag } from '../ducks/draggedPeg';

export default function boardDispatch(dispatch) {
  return {
    dragPeg: ({pageX, pageY}) => dispatch(pegDragging(pageX, pageY)),
    endDrag: () => dispatch(pegEndDrag())
  };
}
