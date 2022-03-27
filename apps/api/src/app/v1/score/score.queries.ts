import {ScoreDTO} from '@kbklab/api-interfaces';
import {ClassModel, ScoreModel} from 'infra/database/models';
import {Aggregate, Query} from 'mongoose';
import {UserScore} from './score.types';

export const getUserScores = (userId: string): Query<ScoreDTO[], ScoreDTO, object, ScoreDTO> => (
  ScoreModel.find<ScoreDTO>({
    user: userId,
  }).populate({
    path: 'classLab',
    populate: {path: 'lab'},
  }).populate('user')
);

export const getClassScores = (classCode: string): Aggregate<UserScore[]> => (
  ClassModel.aggregate([
    {$match: {code: classCode}},
    {
      $project: {
        _id: 0,
        students: 1,
        lecturer: 1,
        classCode: '$code',
      },
    },
    {$unwind: '$students'},
    {
      $lookup: {
        from: 'users',
        localField: 'students',
        foreignField: '_id',
        as: 'fromStudents',
      },
    },
    {
      $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$fromStudents', 0]}, '$$ROOT']}},
    },
    {
      $project: {
        name: 1,
        code: 1,
        email: 1,
      },
    },
    {
      $lookup: {
        from: 'scores',
        localField: '_id',
        foreignField: 'user',
        as: 'scores',
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        name: 1,
        code: 1,
        email: 1,
        scores: {
          $arrayToObject: {
            $map: {
              input: '$scores',
              as: 'score',
              in: {
                k: {$toString: '$$score.classLab'},
                v: {
                  classLabId: '$$score.classLab',
                  attempt: '$$score.attempt',
                  stepSuccess: '$$score.stepSuccess',
                },
              },
            },
          },
        },
      },
    },
  ])
);


