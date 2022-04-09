import {PlaygroundDTO} from '@kbklab/api-interfaces';
import {EntityState} from '@reduxjs/toolkit';
import {APIClientResponse} from 'shared/utilities';
import {ResponseStatus} from 'shared/constants';

export type PlaygroundGridState = EntityState<PlaygroundDTO>;

export type FetchPlaygroundResponse = APIClientResponse<PlaygroundDTO[]>;

export interface StartPlaygroundFulfilledPayload {
  playgroundId: string;
  url: string;
}

export interface PlaygroundUIState {
  startPlaygroundStatus: ResponseStatus | null;
  finishPlaygroundStatus: ResponseStatus | null;
}
