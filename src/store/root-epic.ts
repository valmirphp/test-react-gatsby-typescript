import { combineEpics } from 'redux-observable';

import * as todosEpics from '../features/todos/epics';
import * as memesEpics from '../features/memes/epics';

export default combineEpics(
  ...Object.values(todosEpics),
  ...Object.values(memesEpics)
);
