import { LabStatus } from 'shared/constants';

export const LabStatusPriority: Record<LabStatus, number> = {
  [LabStatus.InProgress]: 3,
  [LabStatus.Open]: 2,
  [LabStatus.Closed]: 1,
  [LabStatus.Future]: 0,
};
