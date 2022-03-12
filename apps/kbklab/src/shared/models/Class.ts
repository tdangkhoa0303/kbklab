import {Dictionary} from '@reduxjs/toolkit';
import {ClassLab} from './ClassLab';
import {Lecturer, User} from './User';

export interface Class {
	id: string;
	lecturer: Lecturer;
	students: User[];
	code: string;
	classLabs: Record<string, ClassLab>;
}
