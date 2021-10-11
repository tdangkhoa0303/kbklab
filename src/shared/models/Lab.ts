export interface Step {
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