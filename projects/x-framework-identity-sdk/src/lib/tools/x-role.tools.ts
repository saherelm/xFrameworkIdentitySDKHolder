import { hasChild } from 'x-framework-core';
import { XUserProfileDto } from '../models/x-user.dto';
import { XUserRoleInfo, XAvailableRoles } from '../typings/x-role.typings';

export function toRoleInfo(user: XUserProfileDto): XUserRoleInfo {
  //
  if (!user) {
    return null;
  }

  //
  const result: XUserRoleInfo = {
    isAdmin: hasChild(user.roles) && user.roles.includes(XAvailableRoles.Admin),
    isAgent: hasChild(user.roles) && user.roles.includes(XAvailableRoles.Agent),
    isBusinessOwner:
      hasChild(user.roles) &&
      user.roles.includes(XAvailableRoles.BusinessOwner),
    isUser: hasChild(user.roles) && user.roles.includes(XAvailableRoles.User),
  };

  //
  return result;
}
