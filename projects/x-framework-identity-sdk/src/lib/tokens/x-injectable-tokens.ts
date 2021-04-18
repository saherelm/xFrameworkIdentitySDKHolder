import { InjectionToken } from '@angular/core';
import { XApiConfiguration } from '../config/x-api-service.config';
import { XFrameworkIdentitySDKConfig } from '../config/x-framework-identity-sdk.config';

export const X_FRAMEWORK_IDENTITY_SDK_CONFIG = new InjectionToken<XFrameworkIdentitySDKConfig>(
  'x_config'
);

export const X_API_CONFIG = new InjectionToken<XApiConfiguration>(
  'apiConfiguration'
);
