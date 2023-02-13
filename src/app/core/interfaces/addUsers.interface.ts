export interface AddUsers {
  firstName: string;
  lastName: string;
  identityNumber: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
}
export interface UsersDeleteResponse {
  deleted: boolean;
  message: string;
}
