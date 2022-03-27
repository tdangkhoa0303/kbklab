import {LabDTO} from '@kbklab/api-interfaces';
import {LabModel} from 'infra/database/models';

export const getAllLabs = async (): Promise<LabDTO[]> => {
  return LabModel.find();
}
