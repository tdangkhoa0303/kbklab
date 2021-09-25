export enum UserRole {
	Student = 'Student',
	Lecturer = 'Lecturer'
}

export interface User {
	name: string,
	class: string,
	email: string
	role: UserRole
}