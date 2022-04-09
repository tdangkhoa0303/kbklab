export interface Step {
	id: string;
	description: string;
	point: number;
}

export interface LabDTO {
	id: string;
	title: string;
	description: string;
	steps: Step[];
	guide: string;
	disabled: boolean;
  instanceNames: string;
}

export type GetAllLecturerLabsResponseData = {
  id: string,
  lab: LabDTO,
  startDate: Date,
  endDate: Date,
  stepSuccess: boolean[][],
  name: string,
  url?: string,
}[]
