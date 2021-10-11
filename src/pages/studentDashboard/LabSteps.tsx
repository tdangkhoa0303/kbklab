import React from 'react';
import {Step} from 'shared/models';
import Timeline from '@mui/lab/Timeline';
import LabStepsItem from './labSteps/LabStepsItem';

const defaultProps = {
	stepSuccess: []
}
export type LabStepsProps = {
	steps: Step[],
	stepSuccess?: boolean[]
}

export type LabStepsPropsWithDefault = LabStepsProps & Readonly<typeof defaultProps>;

const LabSteps: React.FC<LabStepsProps> = (props) => {
	const {steps, stepSuccess} = props as LabStepsPropsWithDefault;

	return (
		<Timeline position="alternate">
			{steps.map((step, index) => {
				const {description, point} = step;

				return (
					<LabStepsItem
						point={point}
						isTail={index === steps.length - 1}
						isDone={stepSuccess[index]}
						description={description}
					/>
				)
			})}
		</Timeline>
	)
}

LabSteps.defaultProps = defaultProps;

export default React.memo(LabSteps);