import Timeline from '@mui/lab/Timeline';
import moment from 'moment';
import React, { useMemo } from 'react';
import { Step } from 'shared/models';
import LabStepsItem from './LabStepsItem';

const defaultProps = {
  stepSuccess: [],
};
export type LabStepsProps = {
  steps: Step[];
  stepSuccess?: boolean[][];
  startDate: string;
  endDate: string;
};

export type LabStepsPropsWithDefault = LabStepsProps &
  Readonly<typeof defaultProps>;

const formatLabTime = (time: string): string =>
  moment(time).local().format('DD/MM/YYYY hh:mm');

const LabSteps: React.FC<LabStepsProps> = (props) => {
  const { steps, stepSuccess, startDate, endDate } =
    props as LabStepsPropsWithDefault;
  const latestStepSuccess = useMemo(
    () => (stepSuccess ? stepSuccess[stepSuccess.length - 1] || [] : []),
    [stepSuccess]
  );
  const isEnded = moment().isAfter(endDate);

  return (
    <Timeline sx={{ margin: 0, overflow: 'auto', padding: 0 }}>
      <LabStepsItem
        isTail={false}
        isDone={true}
        subTitle="SYSTEM"
        isClosed={false}
        description={`Lab Created - ${formatLabTime(startDate)}`}
      />
      {steps.map((step, index) => {
        const { description, point, _id } = step;
        const pointString = point
          ? `${point} ${point > 1 ? 'POINTS' : 'POINT'}`
          : '';

        return (
          <LabStepsItem
            key={_id}
            subTitle={pointString}
            isTail={false}
            isDone={latestStepSuccess[index]}
            description={description}
            isClosed={isEnded}
          />
        );
      })}
      <LabStepsItem
        isTail={true}
        subTitle="SYSTEM"
        isClosed={isEnded}
        isDone={latestStepSuccess[steps.length - 1]}
        description={`Lab Closed - ${formatLabTime(endDate)}`}
      />
    </Timeline>
  );
};

LabSteps.defaultProps = defaultProps;

export default React.memo(LabSteps);
