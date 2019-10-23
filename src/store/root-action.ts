import { createStandardAction } from 'typesafe-actions';
import * as todosActions from '../features/todos/actions';

export const emptyAction = createStandardAction('EMPTY_ACTION')();

export default {
  system: { noAction: emptyAction },
  todos: todosActions
};
