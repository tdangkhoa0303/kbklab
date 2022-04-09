import {PlaygroundDTO} from '@kbklab/api-interfaces';
import {LabModel} from 'infra/database/models';
import {Aggregate} from 'mongoose';

export const getAllPlaygrounds = (userId: string): Aggregate<PlaygroundDTO[]> => (
  LabModel.aggregate([
    {$match: {isPlayground: true}},
    {
      $project: {
        _id: 0,
        id: '$_id',
        title: 1,
        description: 1,
        steps: 1,
        guide: 1,
        disabled: 1,
        isPlayground: 1,
      }
    },
    {
      $lookup: {
        from: "playground_instances",
        let: { "playground_id": "$_id" },
        pipeline: [
          {$match: {
            $expr: {
              $and: [
                {$eq: ['$playground', '$playground_id']},
                {$eq: ['$user', userId]},
              ]
            }
          }},
          {$project: {instanceUrl: 1}}
        ],
        as: "url"
      }
    },
    {
      $unwind: {
        path: '$url',
        preserveNullAndEmptyArrays: true
      },
    }
  ])
)
