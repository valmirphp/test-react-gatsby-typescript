import { of } from 'rxjs';
import { filter, map, catchError, mergeMap } from 'rxjs/operators';
import { IEpicRoot, isActionOf } from 'typesafe-actions';

import { loadTodosAsync, saveTodosAsync } from './actions';
import { getAllTodos } from './selectors';

export const loadTodosEpic: IEpicRoot = (action$, state$, { todosApi }) =>
  action$.pipe(
    filter(isActionOf(loadTodosAsync.request)),
    mergeMap(() =>
      todosApi.loadSnapshot().pipe(
        map(loadTodosAsync.success),
        catchError((message: string) => of(loadTodosAsync.failure(message)))
      )
    )
  );

export const saveTodosEpic: IEpicRoot = (action$, state$, { todosApi }) =>
  action$.pipe(
    filter(isActionOf(saveTodosAsync.request)),
    mergeMap(() =>
      todosApi.saveSnapshot(getAllTodos(state$.value.todos)).pipe(
        map(saveTodosAsync.success),
        catchError((message: string) => of(saveTodosAsync.failure(message)))
      )
    )
  );
