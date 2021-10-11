import {LabStatus} from 'shared/constants';

export const getLabStatus = (hasScore: boolean, instanceUrl?: string): LabStatus => {
	if(instanceUrl) {
		return LabStatus.InProgress;
	}

	if(hasScore) {
		return LabStatus.Closed;
	}

	return LabStatus.Future;
}