import { XValidators } from 'x-framework-core';
import { XUserAccountInfo } from '../typings/x-account.typings';

export function validateUserAccountInfo(model: XUserAccountInfo): void {
  //
  XValidators.validateNotNull(model);
  XValidators.validateNotEmpty(
    model.userSelectBy,
    model.accessToken,
    model.refreshToken
  );
  XValidators.validateBiggerThan(0, model.expiresAt);
}
