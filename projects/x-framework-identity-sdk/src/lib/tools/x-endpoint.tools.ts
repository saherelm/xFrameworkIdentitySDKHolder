import {
  values,
  toArray,
  hasChild,
  XKeyValue,
  XOneOrManyType,
  isNullOrEmptyString,
} from 'x-framework-core';
import { XAccountEndPointParam } from '../typings/x-endpoint.typings';

export function isContainsParams(route: string) {
  //
  // Validate Args ...
  if (isNullOrEmptyString(route)) {
    return false;
  }

  //
  const paramValues = values(XAccountEndPointParam) as Array<string>;
  if (!hasChild(paramValues)) {
    return false;
  }

  //
  const result = paramValues.some((param) => route.includes(param));
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
    !isContainsParams(route) ||
    isNullOrEmptyString(route)
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
