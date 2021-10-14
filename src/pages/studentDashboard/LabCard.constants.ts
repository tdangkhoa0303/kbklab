import {LabStatus} from 'shared/constants';

export const LabStatusColor: Record<LabStatus, string> = {
	[LabStatus.Closed]: '#FF3D00',
	[LabStatus.InProgress]: '#4CAF50',
	[LabStatus.Future]: '#0091EA'
}

export const LAB_STATUS_DOT_SIZE = 16;

export const EMPTY_INFO_TEXT = '-/-';