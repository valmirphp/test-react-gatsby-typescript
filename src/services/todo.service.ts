import { Todo } from 'MyModels';
import { forkJoin, Observable, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { RxAxios } from '../shared/rx-axios';

export class TodoService {
  constructor(private api: RxAxios) {}

  save(data: any): Observable<Todo> {
    return this.api.post<Todo>(`/todos`, data);
  }

  remove(id: string): Observable<unknown> {
    return this.api.delete(`/todos/${id}`);
  }

  loadSnapshot(): Observable<Todo[]> {
    return this.api.get<Todo[]>('/todos').pipe(delay(1000));
  }

  saveSnapshot(data: Todo[]): Observable<Todo[]> {
    const unchanged = data.filter(todo => !todo.isNew && !todo.isDeleted);

    const httpMultiSave = data
      .filter(todo => todo.isNew && !todo.isDeleted)
      .map(todo => ({ id: todo.id, title: todo.title }))
      .map(todo => this.save(todo));

    const httpMultiDelete = data
      .filter(todo => !todo.isNew && todo.id && todo.isDeleted)
      .map(todo => this.remove(todo.id));

    const requests: any[] = [...httpMultiDelete, ...httpMultiSave];

    if (requests.length === 0) {
      return throwError('oops! Empty action!');
    }

    return forkJoin(requests).pipe(
      tap(d => console.log('tap fork join', d)),
      map(results => results.filter((r: any) => r && r.id) as Todo[]),
      map(todos => [...todos, ...unchanged])
    );
  }
}
