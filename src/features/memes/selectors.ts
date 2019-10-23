// import { createSelector } from 'reselect';

import { MemeState } from './reducer';
import { Meme } from 'MyModels';

export const getAllMemes = (state: MemeState): Meme[] => state.memes;
