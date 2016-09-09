import { getPegCoordinates } from '../../utils/helpers';

export default function mapStateToProps(state, props) {
  const { game: {board, pegs}, draggedPeg, routing } = state;

  return  {
    board,
    pegs: pegs.map(p => ({
      ...p,
      ...getPegCoordinates(p, board)
    })),
    draggedPeg,
    routing
  };
}
