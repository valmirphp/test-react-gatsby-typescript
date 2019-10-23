import { TodoService } from './todo-service';
import * as logger from './logger-service';
import { api } from './api';

const contextServices = {
  http: api,
  logger,
  todosApi: new TodoService(api)
};

export default contextServices;
