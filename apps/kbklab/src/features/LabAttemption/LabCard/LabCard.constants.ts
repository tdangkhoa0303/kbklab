import moment from 'moment';
import {LabStatus} from 'shared/constants';
import {LabFieldDefinition, StepsModalTabConfigs, StepsModalTabIndex} from './LabCard.types';

export const LabStatusColor: Record<LabStatus, string> = {
	[LabStatus.Open]: '#FFC107',
	[LabStatus.Closed]: '#FF3D00',
	[LabStatus.InProgress]: '#4CAF50',
	[LabStatus.Future]: '#0091EA',
};

export const LAB_STATUS_DOT_SIZE = 16;

export const EMPTY_INFO_TEXT = '-/-';

export const labDetailFieldDefs: LabFieldDefinition[] = [
	{
		field: 'startDate',
		name: 'Start Date',
		path: 'startDate',
		formatter: (value) => moment(new Date(value)).format('DD/MM/YYYY hh:mm'),
		span: 4,
	},
	{
		field: 'endDate',
		name: 'End Date',
		path: 'endDate',
		formatter: (value) => moment(new Date(value)).format('DD/MM/YYYY hh:mm'),
		span: 4,
	},
	{
		field: 'description',
		name: 'Description',
		path: 'lab.description',
		span: 12,
	},
];

export const LAB_STEPS_MODAL_TABS: StepsModalTabConfigs[] = [
	{
		label: 'Steps',
		index: StepsModalTabIndex.Steps
	},
	{
		label: 'Guide',
		index: StepsModalTabIndex.Guide
	}
]
