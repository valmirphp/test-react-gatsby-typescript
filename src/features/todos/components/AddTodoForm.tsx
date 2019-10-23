import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo } from '../actions';

type EventHandler = React.ReactEventHandler<HTMLInputElement>;

const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');

  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(addTodo({ title }));
    setTitle('');
  };

  const handleTitleChange: EventHandler = ev =>
    setTitle(ev.currentTarget.value);

  return (
    <form onSubmit={ev => ev.preventDefault()}>
      <input
        style={{ width: 450 }}
        type="text"
        placeholder="Enter new item"
        value={title}
        onChange={handleTitleChange}
      />
      &nbsp;
      <button type="submit" onClick={handleAddClick} disabled={!title}>
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
