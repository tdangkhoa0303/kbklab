export enum UserRole {
	Student = 'student',
	Lecturer = 'lecturer'
}

export interface User {
	name: string,
	class: string,
	email: string
	role: UserRole
}