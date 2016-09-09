export default function mapStateToProps(state, props) {
  let {x, y, id} = props;
  let {draggedPeg} = state;

  if (id === draggedPeg.pegId) {
    if (draggedPeg.isBeingDragged) {
      return {
        x: draggedPeg.mouse[0],
        y: draggedPeg.mouse[1],
        status: 'dragging'
      }
    } else {
      return {
        x, y,
        status: 'dragged'
      }
    }
  } else {
    return {
      x, y,
      status: 'normal'
    }
  }
}
