import { Meme } from 'MyModels';

import { createAsyncAction } from 'typesafe-actions';

export const loadMemesAsync = createAsyncAction(
  'LOAD_MEMES_REQUEST',
  'LOAD_MEMES_SUCCESS',
  'LOAD_MEMES_FAILURE'
)<undefined, Meme[], string>();
