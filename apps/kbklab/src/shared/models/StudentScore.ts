import {StepSuccess} from './ClassLab';

export interface ScoreRecord {
	classLabId: string;
	attempt: number;
	stepSuccess: StepSuccess,
}

export interface StudentScore {
	id: string,
	name: 1,
	code: 1,
	email: string,
	scores: Record<string, ScoreRecord>
}
