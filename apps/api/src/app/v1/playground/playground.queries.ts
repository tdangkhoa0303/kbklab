import {PlaygroundDTO} from '@kbklab/api-interfaces';
import {LabModel} from 'infra/database/models';
import {Aggregate} from 'mongoose';

export const getAllPlaygrounds = (userId: string): Aggregate<PlaygroundDTO[]> => (
  LabModel.aggregate([
    {$match: {isPlayground: true}},
    {
      $lookup: {
        from: "playgroundInstances",
        let: { "playgroundId": "$_id" },
        pipeline: [
          {$match: {
            $expr: {
              $and: [
                {$eq: ['$playgroundId', '$$playground']},
                {$eq: ['$$user', userId]},
              ]
            }
          }},
          {$project: {instanceUrl: 1}}
        ],
        as: "url"
      }
    },
    {$unwind: 'url'}
  ])
)
