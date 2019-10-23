import { Todo } from 'MyModels';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { v1 as uuid } from 'uuid';

import { loadTodosAsync, addTodo, removeTodo, saveTodosAsync } from './actions';

const initialLoadingState = false;

export const isLoadingTodos = createReducer<boolean>(initialLoadingState)
  .handleAction([loadTodosAsync.request], (state, action) => true)
  .handleAction(
    [loadTodosAsync.success, loadTodosAsync.failure],
    (state, action) => false
  );

const initialTodosState: Todo[] = [
  {
    id: uuid(),
    title: 'You can add new todos using the form or load saved snapshot...',
    isNew: true,
  },
];

export const todos = createReducer<Todo[]>(initialTodosState)
  .handleAction(loadTodosAsync.success, (state, action) => [...action.payload])
  .handleAction(saveTodosAsync.success, (state, action) => [...action.payload])
  .handleAction(addTodo, (state, action) => [...state, action.payload])
  .handleAction(removeTodo, (state, action) => {
    return state.map(todo =>
      todo.id === action.payload ? { ...todo, isDeleted: true } : todo
    );
  });

const todosReducer = combineReducers({
  isLoadingTodos,
  todos,
});

export default todosReducer;
export type TodosState = ReturnType<typeof todosReducer>;
