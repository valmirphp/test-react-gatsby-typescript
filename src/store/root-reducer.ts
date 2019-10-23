import { combineReducers } from 'redux';

import todosReducer, { TodosState } from '../features/todos/reducer';

export interface RotState {
  todos: TodosState;
}

const rootReducer = combineReducers<RotState>({
  todos: todosReducer,
});

export default rootReducer;
