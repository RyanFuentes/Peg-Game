export default function mapStateToProps(state, props) {
  let {x, y, id} = props;
  let {draggedPeg, game} = state;


  if (draggedPeg.isBeingDragged && id === draggedPeg.pegId) {
    return {
      x: draggedPeg.mouse[0],
      y: draggedPeg.mouse[1],
      status: 'dragging',
      controlsLocked: game.lockControls
    };
  }

  if (id === draggedPeg.pegId) {
    return {
      x, y,
      status: 'dragged',
      controlsLocked: game.lockControls
    };
  }

  return {
    x, y,
    status: 'normal',
    controlsLocked: game.lockControls
  }
}
