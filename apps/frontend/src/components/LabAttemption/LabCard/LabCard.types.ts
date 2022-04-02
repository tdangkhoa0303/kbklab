import {ClassLabId} from 'components/LabAttemption/index';
import React, {ReactNode, ReactText} from 'react';

export interface LabFieldDefinition {
  field: string;
  path: string;
  name: string;
  component?: React.FC<Omit<LabFieldDefinition, 'component'>>;
  formatter?: (value: ReactText) => ReactText | ReactNode;
  span: number;
}

export type OnAttemptLab = (classLabId: ClassLabId) => void;

export type OnFinishLab = (classLabId: ClassLabId) => void;

export enum StepsModalTabIndex {
  Steps = 'steps',
  Guide = 'guide',
}

export interface StepsModalTabConfigs {
  label: string;
  index: StepsModalTabIndex;
}
