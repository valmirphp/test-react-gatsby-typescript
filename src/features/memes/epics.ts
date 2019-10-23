import { of } from 'rxjs';
import { filter, map, catchError, mergeMap } from 'rxjs/operators';
import { IEpicRoot, isActionOf } from 'typesafe-actions';

import { loadMemesAsync } from './actions';

export const loadMemesEpic: IEpicRoot = (action$, state$, { memesApi }) =>
  action$.pipe(
    filter(isActionOf(loadMemesAsync.request)),
    mergeMap(() =>
      memesApi.all().pipe(
        map(loadMemesAsync.success),
        catchError((message: string) => of(loadMemesAsync.failure(message)))
      )
    )
  );
