import { UserRole } from 'shared/models';

export interface NavItemConfig {
  label: string;
  path: string;
  icon: string;
  restrictedRole?: UserRole[];
}
