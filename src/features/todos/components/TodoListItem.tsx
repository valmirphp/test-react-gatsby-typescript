import React from 'react';
import { ButtonRemove, StyledTodoItem } from './todos.style';

interface Props {
  title: string;
  onRemoveClick: () => void;
}

export default ({ title, onRemoveClick }: Props) => {
  return (
    <StyledTodoItem>
      {title}
      <ButtonRemove onClick={onRemoveClick}>X</ButtonRemove>
    </StyledTodoItem>
  );
};
