import {Score, User} from 'entities';
import {Query} from 'express-serve-static-core';

export interface UserScore {
  id: string;
  name: string;
  code: string;
  email: string;
  scores: Score[];
}

export type GetClassScoresDTO  = UserScore[];

export interface GetClassScoresQuery extends Query {
  class: string;
}

export interface UpdateScorePayload {
  containerId: string;
  numberSuccess: string;
}

export interface UpdateScoreQuery extends Query {
  containerId: string;
  numberSuccess: string;
}
