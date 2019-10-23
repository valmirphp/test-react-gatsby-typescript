import styled from 'styled-components';

export const StyledTodoList = styled.ul`
  text-align: left;
  margin: auto;
  max-width: 500px;
  padding: 0;
  list-style: none;
`;

export const StyledTodoItem = styled.li`
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const ButtonRemove = styled.div`
  color: darkred;
  float: right;
  cursor: pointer;
`;
