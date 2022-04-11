import {UserRole} from 'shared/models';
import {NavItemConfig} from './Sidebar.types';

export const sidebarItems: NavItemConfig[] = [
  {
    label: 'Student Labs',
    path: '/student',
    icon: 'eva:cube-fill',
    restrictedRole: [UserRole.Student],
  },
  {
    label: 'class Management',
    path: '/class-management',
    icon: 'eva:cube-fill',
    restrictedRole: [
      UserRole.Lecturer,
      UserRole.HeadDepartment,
      UserRole.Admin,
    ],
  },
  {
    label: 'Lecturer Management',
    path: '/lecturer-management',
    icon: 'eva:monitor-fill',
    restrictedRole: [UserRole.HeadDepartment, UserRole.Admin],
  },
  {
    label: 'Score Dashboard',
    path: '/score-dashboard',
    icon: 'eva:pie-chart-fill',
    restrictedRole: [
      UserRole.Lecturer,
      UserRole.HeadDepartment,
      UserRole.Admin,
    ],
  },
  {
    label: 'Practice Playground',
    path: '/practice',
    icon: 'eva:layers-fill',
    restrictedRole: [UserRole.Student]
  }
];
