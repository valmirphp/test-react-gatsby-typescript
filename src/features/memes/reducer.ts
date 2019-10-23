import { Meme } from 'MyModels';
import { createReducer } from 'typesafe-actions';

import { loadMemesAsync } from './actions';

export interface MemeState {
  loading: boolean;
  memes: Meme[];
  message?: string;
}

const initialState: MemeState = {
  loading: false,
  memes: [],
};

export const memeReducer = createReducer<MemeState>(initialState)
  .handleAction(loadMemesAsync.request, state => ({
    ...state,
    loading: true,
    message: '',
  }))
  .handleAction(loadMemesAsync.success, (state, action) => ({
    ...state,
    loading: false,
    message: '',
    memes: [...action.payload],
  }))
  .handleAction(loadMemesAsync.failure, (state, action) => ({
    ...state,
    loading: false,
    message: action.payload,
    memes: [],
  }));

export default memeReducer;
