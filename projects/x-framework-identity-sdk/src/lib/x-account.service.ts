import {
  X_API_CONFIG,
  X_FRAMEWORK_IDENTITY_SDK_CONFIG,
} from './tokens/x-injectable-tokens';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { XManagerService } from 'x-framework-services';
import { XApiConfiguration } from './config/x-api-service.config';
import { XAccountFinalService } from './partial/x-account.final.service';
import { XFrameworkIdentitySDKConfig } from './config/x-framework-identity-sdk.config';

@Injectable({
  providedIn: 'root',
})
export class XAccountService extends XAccountFinalService {
  //
  //#region Constructor ...
  constructor(
    protected router: Router,
    protected httpClient: HttpClient,
    @Inject(X_FRAMEWORK_IDENTITY_SDK_CONFIG)
    config: XFrameworkIdentitySDKConfig,
    @Inject(X_API_CONFIG) apiConfig: XApiConfiguration,
    protected managerService: XManagerService
  ) {
    super(router, httpClient, config, apiConfig, managerService);
  }
  //#endregion
}
