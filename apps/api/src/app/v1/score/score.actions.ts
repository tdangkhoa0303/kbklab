import {UserDTO} from '@kbklab/api-interfaces';
import {ClassLab, Lab} from 'entities';
import {InstanceModel, ScoreModel} from 'infra/database/models';
import {AppError} from 'models';
import {ObjectId} from 'mongoose';
import {deleteDocker} from '../instance/instance.utils';
import * as ScoreQueries from './score.queries';
import {UpdateScorePayload, UserScore} from './score.types';

export const getClassScores = async (classCode: string): Promise<UserScore[]> => await ScoreQueries.getClassScores(classCode);

export const initializeScore = async (userId: ObjectId, classLabId: ObjectId) => {
  const isScoreExisted = await ScoreModel.findOne({
    user: userId,
    classLab: classLabId,
  });

  if (!isScoreExisted) {
    return await ScoreModel.create({
      user: userId,
      classLab: classLabId,
      stepSuccess: [[true]],
      attempt: 1,
    });
  } else {
    const success = [true];
    if (isScoreExisted.stepSuccess) {
      isScoreExisted.stepSuccess.push(success);
    }
    if (isScoreExisted.attempt) {
      isScoreExisted.attempt = isScoreExisted.attempt + 1;
      isScoreExisted.save();
    }
  }

  return isScoreExisted;
};

export const updateScore = async (payload: UpdateScorePayload): Promise<{}> => {
  const {containerId, numberSuccess} = payload;
  if (!containerId) {
    throw new AppError('Update score need a containerId', 400);
  }

  const userInstance = await InstanceModel
    .findOne({containerId})
    .populate<{classLab: ClassLab & {lab: Lab}}>({
      path: 'classLab',
      populate: {path: 'lab'},
    })
    .populate<{user: UserDTO}>('user');

  if (!userInstance) {
    throw new AppError('No instance found with this id', 400);
  }

  const scoreToUpdate = await ScoreModel.findOne({
    user: userInstance.user,
    classLab: userInstance.classLab,
  });

  if (!scoreToUpdate || !scoreToUpdate.stepSuccess) {
    throw new AppError('Not found score', 400);
  }

  const currentAttempt = scoreToUpdate.attempt - 1;
  const successStepNumber = Number.parseInt(numberSuccess);
  const classLab = userInstance.classLab;
  const totalStep = classLab.lab.steps.length - 1;

  if (successStepNumber === scoreToUpdate.stepSuccess[currentAttempt].length && successStepNumber <= totalStep) {
    scoreToUpdate.stepSuccess[currentAttempt].push(true);
    scoreToUpdate.markModified('stepSuccess');
    scoreToUpdate.save();
  }

  if (successStepNumber === totalStep && userInstance.user) {
    const {user, id: instanceId} = userInstance
    await deleteDocker(user.code, instanceId);
  }

  return {};
};
