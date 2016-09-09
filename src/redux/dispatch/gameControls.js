import { newGame } from '../ducks/game';

export default function gameControlsDispatch(dispatch) {
  return {
    newGame: () => dispatch(newGame())
  };
}
