export interface User {
  id: number;
  createdAt: Date;
  firstName: string;
  lastName: string;
  identityNumber: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
  userPermissions: string[];
  roles: string[];
  projects: string[];
}
