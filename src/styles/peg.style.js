import {pegWidth, pegHeight} from '../utils/constants';
import { springSetting1, springSetting2, spring } from 'react-motion';

export const getPegStyle = (props) => {
  let {status, x, y} = props;

  if (status === 'dragging') {
    return {
      x, y,
      scale: spring(1.2, springSetting1),
      boxShadow: spring((x - (3 * pegWidth - 50) / 2) / 15, springSetting1)
    };
  } else if (status === 'dragged') {
    return {
      x: spring(x, springSetting1),
      y: spring(y, springSetting1),
      boxShadow: spring((x - (3 * pegWidth - 50) / 2) / 15, springSetting1)
    }
  } else {
    return {
      x: spring(x, springSetting2),
      y: spring(y, springSetting2),
      boxShadow: spring((x - (3 * pegWidth - 50) / 2) / 15, springSetting1)
    };
  }
}
