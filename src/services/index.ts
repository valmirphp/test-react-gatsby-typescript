import { TodoService } from './todo.service';
import * as logger from './logger.service';
import { api } from './api';
import { MemeService } from './meme.service';
import { client } from "./apollo/client";

const contextServices = {
  http: api,
  graphql: client,
  logger,
  todosApi: new TodoService(api),
  memesApi: new MemeService(client),
};

export default contextServices;
