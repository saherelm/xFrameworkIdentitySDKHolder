import {
  XTokenResponseDto,
  XLoginRequestDto,
  XLoginResponseDto,
} from '../models/x-login.dto';
import {
  X_API_CONFIG,
  X_FRAMEWORK_IDENTITY_SDK_CONFIG,
} from '../tokens/x-injectable-tokens';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { XManagerService } from 'x-framework-services';
import { XAccountService } from '../x-account.service';
import { XDiscoveryDto } from '../models/x-discovery.dto';
import { XApiScope } from '../constants/x-api-scope.enum';
import { XUserAccountInfo } from '../typings/x-account.typings';
import { XApiConfiguration } from '../config/x-api-service.config';
import { map, concatMap, filter, catchError } from 'rxjs/operators';
import { XAccountBaseService } from '../partial/x-account.base.service';
import { notValue, fromJson, isNullOrUndefined } from 'x-framework-core';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { XFrameworkIdentitySDKConfig } from '../config/x-framework-identity-sdk.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends XAccountBaseService {
  //
  //#region Constructor ...
  constructor(
    protected router: Router,
    protected httpClient: HttpClient,
    @Inject(X_FRAMEWORK_IDENTITY_SDK_CONFIG)
    config: XFrameworkIdentitySDKConfig,
    @Inject(X_API_CONFIG) apiConfig: XApiConfiguration,
    protected managerService: XManagerService,
    protected accountService: XAccountService
  ) {
    super(router, httpClient, config, apiConfig, managerService);

    //
    this.registerApiConfigurationUpdater();
  }
  //#endregion

  //
  //#region Provider Actions ...
  /**
   * check a user id is same as current user id or not ...
   * @param userId dest user id's
   */
  isMe(userId?: string): Observable<boolean> {
    //
    if (!userId) {
      return of(false);
    }

    //
    return this.state$.pipe(
      filter((res) => !isNullOrUndefined(res)),
      map((state) => state.profile.userId === userId)
    );
  }

  /**
   * check a user id is not same as current user id or not ...
   * @param userId dest user id's
   */
  isNotMe(userId: string): Observable<boolean> {
    return notValue(this.isMe(userId));
  }
  //#endregion

  //
  //#region Service Actions ...
  /**
   * Retrieve Discovery Document
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestDiscoveryDocument(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XDiscoveryDto>;
  public requestDiscoveryDocument(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XDiscoveryDto>>;
  public requestDiscoveryDocument(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XDiscoveryDto>>;
  public requestDiscoveryDocument(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    return this.accountService.requestDiscoveryDocument(
      observe,
      reportProgress
    );
  }

  /**
   * Request Specific Scope Access Token for API Actions
   *
   * @param scope the specific api scope
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestScopeAccessToken(
    scope: XApiScope,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XTokenResponseDto>;
  public requestScopeAccessToken(
    scope: XApiScope,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XTokenResponseDto>>;
  public requestScopeAccessToken(
    scope: XApiScope,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XTokenResponseDto>>;
  public requestScopeAccessToken(
    scope: XApiScope,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    return this.accountService.requestScopeAccessToken(
      scope,
      observe,
      reportProgress
    );
  }

  /**
   * Authenticate a User
   *
   * @param body an instance of XLoginRequest class which holds UserName and Password
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public authenticate(
    body: XLoginRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XTokenResponseDto>;
  public authenticate(
    body: XLoginRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XTokenResponseDto>>;
  public authenticate(
    body: XLoginRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XTokenResponseDto>>;
  public authenticate(
    body: XLoginRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    return this.accountService.authenticate(body, observe, reportProgress);
  }

  /**
   * Login a User
   *
   * @param body an instance of XLoginRequest class which holds UserName and Password
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public login(
    body: XLoginRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XLoginResponseDto>;
  public login(
    body: XLoginRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XLoginResponseDto>>;
  public login(
    body: XLoginRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XLoginResponseDto>>;
  public login(
    body: XLoginRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    return this.applyLoginResponseActions(
      body.userSelectBy,
      this.accountService.login(body, observe, reportProgress)
    );
  }

  /**
   * Refresh Expired Tokens
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public refreshTokens(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XTokenResponseDto>;
  public refreshTokens(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XTokenResponseDto>>;
  public refreshTokens(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XTokenResponseDto>>;
  public refreshTokens(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    return this.accountService.refreshTokens(observe, reportProgress);
  }

  /**
   * Validate Revision Checksum
   *
   * @param revision token renew Revision
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public validateRevision(
    revision: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public validateRevision(
    revision: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public validateRevision(
    revision: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public validateRevision(
    revision: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    return this.accountService.validateRevision(
      revision,
      observe,
      reportProgress
    );
  }

  /**
   * Logout User ...
   */
  public async logout(returnUrl?: string) {
    return this.accountService.logout(returnUrl);
  }
  //#endregion

  //
  //#region Private ...
  private registerApiConfigurationUpdater(): void {
    //
    // Register Api Configuration Updater ...
    this.state$
      .pipe(filter((state) => !!state))
      // tslint:disable-next-line: deprecation
      .subscribe((state) => {
        //
        if (state.isLoggedIn) {
          //
          this.apiConfig.setUserAccount(state);
        } else {
          this.apiConfig.setUserAccount(null);
        }
      });
  }

  private applyLoginResponseActions(
    userSelectBy: string,
    observable: Observable<XLoginResponseDto>
  ): Observable<XUserAccountInfo> {
    //
    return observable.pipe(
      concatMap((res) => {
        //
        // Convert Login Response ...
        const mResponse = fromJson<XLoginResponseDto>(res);

        //
        // Prepare XUserAccountInfo instance ...
        const mUserInfo: XUserAccountInfo = {
          ...mResponse,
          userSelectBy,
        };

        //
        return this.applyUpdateUserAccountInfo(mUserInfo);
      })
      // ,
      // concatMap((userInfo) => {
      //   //
      //   return this.accountService.accountsFriendshipInfo(userSelectBy).pipe(
      //     concatMap((friendshipInfo) => {
      //       //
      //       // Add Friendship ...
      //       userInfo.profile.friendshipInfo = friendshipInfo;

      //       //
      //       return this.applyUpdateUserAccountInfo(userInfo);
      //     })
      //   );
      // })
      ,
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  private applyUpdateUserAccountInfo(
    userInfo: XUserAccountInfo
  ): Observable<XUserAccountInfo> {
    //
    // Update User Account Info ...
    return of(
      this.addOrUpdateUserAccount(userInfo.userSelectBy, userInfo, true)
    ).pipe(
      concatMap(() => {
        //
        // set User Account in API Config ...
        return of(this.apiConfig.setUserAccount(userInfo)).pipe(
          map(() => userInfo)
        );
      })
    );
  }
  //#endregion
}
