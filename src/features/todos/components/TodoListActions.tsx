import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

import { loadTodosAsync, saveTodosAsync } from '../actions';

const mapStateToProps = (state: RootState): State => ({
  isLoading: state.todos.isLoadingTodos,
});

type State = {
  isLoading: boolean;
};

export default () => {
  const { isLoading } = useSelector<RootState, State>(mapStateToProps);
  const dispatch = useDispatch();
  const loadTodos = () => dispatch(loadTodosAsync.request());
  const saveTodos = () => dispatch(saveTodosAsync.request());
  const logout = () => console.log('Not action');
  const goToAbout = () => console.log('Not action');

  return (
    <section>
      <h2>Todo App</h2>
      <button type="button" onClick={loadTodos} disabled={isLoading}>
        Load snapshot
      </button>
      &nbsp;
      <button type="button" onClick={saveTodos} disabled={isLoading}>
        Save snapshot
      </button>{' '}
      &nbsp;
      <button type="button" onClick={goToAbout}>
        About
      </button>
      &nbsp;
      <button type="button" onClick={logout}>
        [x] Exit
      </button>
    </section>
  );
};
