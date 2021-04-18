export enum XAvailableRoles {
  Admin = 'admin',
  Agent = 'agent',
  BusinessOwner = 'business_owner',
  User = 'user'
}

export interface XUserRoleInfo {
  isAdmin: boolean;
  isAgent: boolean;
  isBusinessOwner: boolean;
  isUser: boolean;
}
