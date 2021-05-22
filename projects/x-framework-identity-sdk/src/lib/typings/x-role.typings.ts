export enum XAvailableRoles {
  Admin = 'admin',
  Agent = 'agent',
  ChiefActuary = 'chief_actuary',
  Actuary = 'actuary',
  Reporter = 'reporter',
  Elite = 'elite',
  User = 'user',
}

export interface XUserRoleInfo {
  isAdmin: boolean;
  isAgent: boolean;
  isChiefActuary: boolean;
  isActuary: boolean;
  isReporter: boolean;
  isElite: boolean;
  isUser: boolean;
}
