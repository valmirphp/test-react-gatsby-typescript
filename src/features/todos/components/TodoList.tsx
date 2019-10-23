import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { Todo } from 'MyModels';
import * as selectors from '../selectors';
import * as actions from '../actions';
import TodoListItem from './TodoListItem';
import { StyledTodoList } from './todos.style';

type State = {
  isLoading: boolean;
  todos: Todo[];
};

const mapStateToProps = (state: RootState): State => ({
  isLoading: state.todos.isLoadingTodos,
  todos: selectors.getActiveTodos(state.todos),
});

export default () => {
  const dispatch = useDispatch();
  const removeTodo = (id: string) => dispatch(actions.removeTodo(id));
  const { isLoading, todos } = useSelector<RootState, State>(mapStateToProps);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <StyledTodoList>
      {todos.map(todo => (
        <TodoListItem
          key={todo.id}
          title={todo.title}
          onRemoveClick={() => removeTodo(todo.id)}
        />
      ))}
    </StyledTodoList>
  );
};
