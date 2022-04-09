import {Step} from '@kbklab/api-interfaces';
import {BaseEntity} from './base-entity';

export interface Lab extends BaseEntity {
  title: string;
  description: string;
  location?: string;
  steps: Step[];
  guide: string;
  instanceNames: string;
  disabled: boolean;
  isPlayground?: boolean;
}
