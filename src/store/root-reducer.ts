import { combineReducers } from 'redux';

import todosReducer, { TodosState } from '../features/todos/reducer';
import memeReducer, { MemeState } from '../features/memes/reducer';

export interface RotState {
  todos: TodosState;
  memes: MemeState;
}

const rootReducer = combineReducers<RotState>({
  todos: todosReducer,
  memes: memeReducer,
});

export default rootReducer;
