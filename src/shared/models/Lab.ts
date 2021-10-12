export interface Step {
	_id: string,
	description: string,
	point: number,
}

export interface Lab {
	labId: string,
	title: string,
	description: string,
	url?: string,
	steps: Step[],
	stepSuccess?: boolean[]
}