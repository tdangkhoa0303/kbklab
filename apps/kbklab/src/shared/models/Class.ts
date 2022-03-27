import {ClassLab} from './ClassLab';
import {User} from './User';

export interface Class {
	id: string;
	lecturer: User;
	students: User[];
	code: string;
	classLabs: Record<string, ClassLab>;
}
