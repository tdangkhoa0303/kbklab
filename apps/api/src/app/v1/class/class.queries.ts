import {ClassWithClassLabDTO} from '@kbklab/api-interfaces';
import {ClassModel} from 'infra/database/models';
import {Aggregate} from 'mongoose';

export const getAllClassesWithClassLabs = (lecturer?: string): Aggregate<ClassWithClassLabDTO[]> => (
  ClassModel.aggregate([
    {$match: {lecturer}},
    {
      $lookup: {
        from: 'users',
        localField: 'students',
        foreignField: '_id',
        as: 'students',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'lecturer',
        foreignField: '_id',
        as: 'lecturer',
      },
    },
    {$unwind: '$lecturer'},
    {
      $lookup: {
        from: 'classlabs',
        let: {classId: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$class', '$$classId']}}},
          {
            $lookup: {
              from: 'labs',
              let: {labId: '$lab'},
              pipeline: [
                {$match: {$expr: {$eq: ['$_id', '$$labId']}}},
                {$project: {
                    description: 1,
                    steps: 1,
                    title: 1,
                    id: '$_id',
                  }
                }
              ],
              as: 'lab',
            },
          },
          {$unwind: '$lab'},
          {
            $project: {
              name: 1,
              class: 1,
              endDate: 1,
              startDate: 1,
              lab: 1,
              id: '$_id',
              _id: 0,
            },
          },
        ],
        as: 'classLabs',
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        classLabs: {
          $arrayToObject: {
            $map: {
              input: '$classLabs',
              as: 'item',
              in: {
                k: {$toString: '$$item.id'},
                v: '$$item',
              },
            },
          },
        },
        students: 1,
        code: 1,
        lecturer: 1,
      },
    },
  ])
);
