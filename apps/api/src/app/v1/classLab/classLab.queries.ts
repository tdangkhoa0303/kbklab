import {ClassLabDTO} from '@kbklab/api-interfaces';
import {User} from 'entities';
import {ScoreModel} from 'infra/database/models';
import {Aggregate} from 'mongoose';

export const getUserClassLabsWithScore = (user: User): Aggregate<ClassLabDTO[]> => (
  ScoreModel.aggregate<ClassLabDTO>([
    {$match: {user: user._id}},
    {
      $lookup: {
        from: 'classlabs',
        localField: 'classLab',
        foreignField: '_id',
        as: 'fromClassLab',
      },
    },
    {$project: {_id: 0, id: 0}},
    {
      $replaceRoot: {newRoot: {$mergeObjects: [{$arrayElemAt: ['$fromClassLab', 0]}, '$$ROOT']}},
    },
    {
      $lookup: {
        from: 'labs',
        localField: 'lab',
        foreignField: '_id',
        as: 'lab',
      },
    },
    {$unwind: '$lab'},
    {$addFields: {
      id: {$toString: '$_id'}
    }},
    {$project: {
        _id: 0,
        fromClassLab: 0,
        '__v': 0,
      }
    }
  ])
)
