import { XFrameworkCoreConfig } from 'x-framework-core';
import { XFrameworkServicesConfig } from 'x-framework-services';

export type XSharedConfig = XFrameworkCoreConfig &
  XFrameworkServicesConfig & { [key: string]: any };

// tslint:disable-next-line:no-empty-interface
export interface XFrameworkIdentitySDKConfig extends XSharedConfig {
  //
  // Api Configuration ...
  baseUrl: string;
  apiVersion: string;
  poweredValue: string;
  apiIdentifier: string;

  //
  // Registration Types ...
  registrationType: string[];

  //
  // Registration Available ...
  minAvailableDateConst: number;
  maxAvailableDateConst: number;

  //
  // Debouncing async actions Time ...
  debounceTime: number;

  //
  nameMinLength: number;
  nameMaxLength: number;

  //
  registrationOnlyWithInvitation: boolean;

  //
  userNameMinLength: number;
  userNameMaxLength: number;

  //
  passwordPolicies?: {
    requireDigit?: boolean;
    requiredLength?: number;
    requiredUniqueChars?: number;
    requireLowercase?: boolean;
    requireNonAlphanumeric?: boolean;
    requireUppercase?: boolean;
  };

  //
  passwordMinLength: number;
  passwordMaxLength: number;

  //
  verificationCodeLength: number;
  delayBetweenTwoVerificationCode: number;

  //
  // Attach Pages Index to Handle in Guard Rejects ...
  Pages: any;
}
