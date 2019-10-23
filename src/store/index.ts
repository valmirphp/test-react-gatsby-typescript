import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState, ServiceContext } from 'typesafe-actions';

import { composeEnhancers } from './utils';
import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import contextServices from '../services';

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  ServiceContext
>({
  dependencies: contextServices,
});

// configure middlewares
const middlewares = [epicMiddleware];

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// preloadedState will be passed in by the plugin
export default (preloadedState: RootState) => {
  const store = createStore(rootReducer, preloadedState, enhancer);

  epicMiddleware.run(rootEpic);

  return store;
};
