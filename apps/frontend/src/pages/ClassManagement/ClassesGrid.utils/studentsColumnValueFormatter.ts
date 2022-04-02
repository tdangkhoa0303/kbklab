import {ValueFormatterParams} from 'ag-grid-community';
import {User} from 'shared/models';
import {DISPLAYED_STUDENT_NAMES} from '../ClassesGrid.constants';

const buildStudentsString = (studentNames: string[]): string => {
  const displayedStudentNames = studentNames
    .slice(0, DISPLAYED_STUDENT_NAMES - 1)
    .join(', ');
  const remainingStudentNames = studentNames.length - DISPLAYED_STUDENT_NAMES;

  return (
    displayedStudentNames +
    ` + ${remainingStudentNames} more ${
      remainingStudentNames > 1 ? 'students' : 'student'
    }`
  );
};

export const studentsColumnValueFormatter = (
  params: ValueFormatterParams
): string => {
  const students: User[] = params.data.students;
  const studentNames = students.map((student) => student.name);
  return studentNames.length > DISPLAYED_STUDENT_NAMES
    ? buildStudentsString(studentNames)
    : studentNames.join(', ');
};
