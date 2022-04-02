import Stack from '@mui/material/Stack';
import React from 'react';
import {LabStatus} from 'shared/constants';
import {Step} from 'shared/models';
import {useLabScore} from './LabCard.hooks';
import ScoreItem from './labCardInfo/ScoreItem';
import StatusItem from './labCardInfo/StatusItem';
import StepsItem from './labCardInfo/StepsItem';

export interface LabCardInfoItemProps {
  status: LabStatus;
  steps: Step[];
  stepSuccess?: boolean[][];
}

const LabCardInfo: React.FC<LabCardInfoItemProps> = (props) => {
  const { status, steps, stepSuccess } = props;
  const labScore = useLabScore(steps, stepSuccess);

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <StatusItem status={status} />
      <StepsItem steps={steps} />
      <ScoreItem score={labScore} />
    </Stack>
  );
};

export default React.memo(LabCardInfo);
