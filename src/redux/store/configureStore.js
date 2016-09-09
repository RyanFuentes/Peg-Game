import { routerReducer } from 'react-router-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '../../components/DevTools';

import game from '../ducks/game';
import draggedPeg from '../ducks/draggedPeg';

const reducer = combineReducers({
    game,
    draggedPeg,
    routing: routerReducer,
  },
);

const enhancer = (store) => {
  if (process.env.NODE_ENV === 'development') {
    return compose(
      applyMiddleware(thunkMiddleware),
      DevTools.instrument({ maxAge: 50 })
    )(store);
  } else {
    return compose(
      applyMiddleware(thunkMiddleware)
    )(store);
  }
}

export default function configureStore(initialState = {}) {
  return createStore(reducer, initialState, enhancer);
}
