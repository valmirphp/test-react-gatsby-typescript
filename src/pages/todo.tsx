import React from 'react';
import TodoListActions from '../features/todos/components/TodoListActions';
import AddTodoForm from '../features/todos/components/AddTodoForm';
import TodoList from '../features/todos/components/TodoList';

const todo: React.FC = () => {
  return (
    <section>
      <TodoListActions />
      <br />
      <AddTodoForm />
      <hr />
      <TodoList />
    </section>
  );
};

export default todo;
