import {Request} from 'express';
import {apiWrapper} from 'utils';
import * as ScoreActions from './score.actions';
import {GetClassScoresDTO, GetClassScoresQuery, UpdateScoreQuery} from './score.types';

export const getClassScores = apiWrapper<GetClassScoresDTO>((req: Request<{}, {}, {}, GetClassScoresQuery, {}>) => {
  const {class: classCode} = req.query;
  return ScoreActions.getClassScores(classCode);
});

export const updateScore = apiWrapper((req: Request<{}, {}, {}, UpdateScoreQuery, {}>) => {
  // Treat container id like user id to populate to the log
  req.user.id = `Container ${req.query.containerId}`;
  return ScoreActions.updateScore(req.query);
});
