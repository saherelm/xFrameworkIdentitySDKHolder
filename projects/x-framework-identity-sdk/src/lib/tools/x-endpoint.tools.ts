import {
  values,
  toArray,
  hasChild,
  XKeyValue,
  XOneOrManyType,
  isNullOrEmptyString,
} from 'x-framework-core';

export function isContainsParams<TParams>(
  route: string,
  params?: XOneOrManyType<XKeyValue<TParams, string>>
) {
  //
  // Validate Args ...
  if (isNullOrEmptyString(route)) {
    return false;
  }

  //
  if (!hasChild(params)) {
    return false;
  }

  //
  const result = toArray(params).some((param) =>
    route.includes(String(param.key))
  );
  return result;
}

export function setParams<TParams>(
  route: string,
  params?: XOneOrManyType<XKeyValue<TParams, string>>
) {
  //
  // Validate Args ...
  if (
    !hasChild(params) ||
    isNullOrEmptyString(route) ||
    !isContainsParams(route, params)
  ) {
    return route;
  }

  //
  // Do Actions ...
  toArray(params).forEach((paramKeyValue) => {
    //
    route = route.replace(
      String(paramKeyValue.key),
      encodeURIComponent(String(paramKeyValue.value))
    );
  });

  //
  return route;
}
