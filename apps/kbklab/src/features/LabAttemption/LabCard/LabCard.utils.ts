import moment from 'moment';
import {LabStatus} from 'shared/constants';

export interface GetLabStatusParams {
	endDate: string;
	startDate: string;
	instanceUrl?: string;
	isStudent?: boolean;
}

export const getLabStatus = (params: GetLabStatusParams): LabStatus => {
	const {startDate, endDate, instanceUrl, isStudent} = params;
	const currentTime = moment();

	if (currentTime.isBefore(new Date(startDate))) {
		return LabStatus.Future;
	}

	if (currentTime.isAfter(new Date(endDate))) {
		return LabStatus.Closed;
	}

	return (instanceUrl && isStudent) ? LabStatus.InProgress : LabStatus.Open;
};
