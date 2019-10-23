// import { createSelector } from 'reselect';

import { TodosState } from './reducer';

export const getAllTodos = (state: TodosState) => state.todos;

export const getActiveTodos = (state: TodosState) =>
  state.todos.filter(t => !t.isDeleted);
