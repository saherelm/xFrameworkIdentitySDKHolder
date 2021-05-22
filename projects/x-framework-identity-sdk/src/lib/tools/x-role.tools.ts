import { XUserProfileDto } from '../models/x-user.dto';
import { hasChild, throwException, XExceptionIDs } from 'x-framework-core';
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
    isChiefActuary:
      hasChild(user.roles) && user.roles.includes(XAvailableRoles.ChiefActuary),
    isActuary:
      hasChild(user.roles) && user.roles.includes(XAvailableRoles.Actuary),
    isReporter:
      hasChild(user.roles) && user.roles.includes(XAvailableRoles.Reporter),
    isElite: hasChild(user.roles) && user.roles.includes(XAvailableRoles.Elite),
    isUser: hasChild(user.roles) && user.roles.includes(XAvailableRoles.User),
  };

  //
  return result;
}

export function toRoleInfoByRoles(roles: string[]): XUserRoleInfo {
  //
  if (!hasChild(roles)) {
    return null;
  }

  //
  const result: XUserRoleInfo = {
    isAdmin: roles.includes(XAvailableRoles.Admin),
    isAgent: roles.includes(XAvailableRoles.Agent),
    isChiefActuary: roles.includes(XAvailableRoles.ChiefActuary),
    isActuary: roles.includes(XAvailableRoles.Actuary),
    isReporter: roles.includes(XAvailableRoles.Reporter),
    isElite: roles.includes(XAvailableRoles.Elite),
    isUser: roles.includes(XAvailableRoles.User),
  };

  //
  return result;
}

export function getTopRoleByRoleInfo(roleInfo: XUserRoleInfo) {
  //
  if (!roleInfo) {
    throwException(XExceptionIDs.InvalidArgs);
  }

  //
  if (roleInfo.isAdmin) {
    return XAvailableRoles.Admin;
  } else if (roleInfo.isAgent) {
    return XAvailableRoles.Agent;
  } else if (roleInfo.isChiefActuary) {
    return XAvailableRoles.ChiefActuary;
  } else if (roleInfo.isActuary) {
    return XAvailableRoles.Actuary;
  } else if (roleInfo.isReporter) {
    return XAvailableRoles.Reporter;
  } else if (roleInfo.isElite) {
    return XAvailableRoles.Elite;
  } else if (roleInfo.isUser) {
    return XAvailableRoles.User;
  } else {
    throwException(XExceptionIDs.InvalidArgs);
  }
}

export function getTopRoleByRoles(roles: string[]) {
  //
  const roleInfo = toRoleInfoByRoles(roles);
  if (!roleInfo) {
    throwException(XExceptionIDs.InvalidArgs);
  }

  //
  if (roleInfo.isAdmin) {
    return XAvailableRoles.Admin;
  } else if (roleInfo.isAgent) {
    return XAvailableRoles.Agent;
  } else if (roleInfo.isChiefActuary) {
    return XAvailableRoles.ChiefActuary;
  } else if (roleInfo.isActuary) {
    return XAvailableRoles.Actuary;
  } else if (roleInfo.isReporter) {
    return XAvailableRoles.Reporter;
  } else if (roleInfo.isElite) {
    return XAvailableRoles.Elite;
  } else if (roleInfo.isUser) {
    return XAvailableRoles.User;
  } else {
    throwException(XExceptionIDs.InvalidArgs);
  }
}

export function getTopRoleByProfile(user: XUserProfileDto) {
  //
  const roleInfo = toRoleInfo(user);
  if (!roleInfo) {
    throwException(XExceptionIDs.InvalidArgs);
  }

  //
  return getTopRoleByRoleInfo(roleInfo);
}

export function checkIsInRoleByInfo(
  role: XAvailableRoles,
  roleInfo: XUserRoleInfo
): boolean {
  //
  switch (role) {
    //
    case XAvailableRoles.Admin:
      return roleInfo.isAdmin;

    //
    case XAvailableRoles.Agent:
      return roleInfo.isAgent;

    //
    case XAvailableRoles.ChiefActuary:
      return roleInfo.isChiefActuary;

    //
    case XAvailableRoles.Actuary:
      return roleInfo.isActuary;

    //
    case XAvailableRoles.Reporter:
      return roleInfo.isReporter;

    //
    case XAvailableRoles.Elite:
      return roleInfo.isElite;

    //
    case XAvailableRoles.User:
      return roleInfo.isUser;

    //
    default:
      return false;
  }
}

export function checkIsInRoleByUser(
  role: XAvailableRoles,
  user: XUserProfileDto
): boolean {
  //
  // Validate Args ...
  if (!role || !user) {
    return false;
  }

  //
  const roleInfo = toRoleInfo(user);
  if (!roleInfo) {
    return false;
  }

  //
  switch (role) {
    //
    case XAvailableRoles.Admin:
      return roleInfo.isAdmin;

    //
    case XAvailableRoles.Agent:
      return roleInfo.isAgent;

    //
    case XAvailableRoles.ChiefActuary:
      return roleInfo.isChiefActuary;

    //
    case XAvailableRoles.Actuary:
      return roleInfo.isActuary;

    //
    case XAvailableRoles.Reporter:
      return roleInfo.isReporter;

    //
    case XAvailableRoles.Elite:
      return roleInfo.isElite;

    //
    case XAvailableRoles.User:
      return roleInfo.isUser;

    //
    default:
      return false;
  }
}
