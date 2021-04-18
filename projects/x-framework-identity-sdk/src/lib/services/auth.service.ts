import {
  notValue,
  fromJson,
  XValidators,
  XExceptionIDs,
  throwException,
  isNullOrUndefined,
  isNullOrEmptyString,
} from 'x-framework-core';
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
import { XUserAccountInfo } from '../typings/x-account.typings';
import { XApiConfiguration } from '../config/x-api-service.config';
import { map, concatMap, filter, catchError } from 'rxjs/operators';
import { XAccountBaseService } from '../partial/x-account.base.service';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
import { XLoginResponseDto, XLoginRequestDto } from '../models/x-login.dto';
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
  //
  //#region RequestDiscoveryDocument ...
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
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    // to determine the Content-Type header
    const consumes: string[] = [];
    const endPointPath = `${this.baseEndPointRoute}`;

    //
    // return result ...
    return this.httpClient.get<XDiscoveryDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RequestReadToken ...
  /**
   * Request Read Access Token for API Actions
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestReadToken(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string>;
  public requestReadToken(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string>>;
  public requestReadToken(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string>>;
  public requestReadToken(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    // to determine the Content-Type header
    const consumes: string[] = [];
    const endPointPath = `${this.baseEndPointRoute}/RequestReadToken`;

    //
    // return result ...
    return this.httpClient.get<XDiscoveryDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RequestWriteToken ...
  /**
   * Request Write Access Token for API Actions
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestWriteToken(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string>;
  public requestWriteToken(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string>>;
  public requestWriteToken(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string>>;
  public requestWriteToken(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    // to determine the Content-Type header
    const consumes: string[] = [];
    const endPointPath = `${this.baseEndPointRoute}/RequestWriteToken`;

    //
    // return result ...
    return this.httpClient.get<XDiscoveryDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region ReNewToken ...
  /**
   * ReNew Expired Token
   *
   * @param body an instance of XLoginRequest class which holds UserName and Password
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public reNewToken(
    body: XLoginResponseDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XLoginResponseDto>;
  public reNewToken(
    body: XLoginResponseDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XLoginResponseDto>>;
  public reNewToken(
    body: XLoginResponseDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XLoginResponseDto>>;
  public reNewToken(
    body: XLoginResponseDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    if (
      isNullOrUndefined(body) ||
      isNullOrEmptyString(body.accessToken) ||
      isNullOrEmptyString(body.refreshToken)
    ) {
      throwException(XExceptionIDs.InvalidArgs);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/ReNewToken`;

    //
    // return result ...
    return this.httpClient.post<XLoginResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RefreshToken ...
  /**
   * ReNew Expired Token
   *
   * @param body an instance of XLoginRequest class which holds UserName and Password
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public refreshToken(
    body: XLoginResponseDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XLoginResponseDto>;
  public refreshToken(
    body: XLoginResponseDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XLoginResponseDto>>;
  public refreshToken(
    body: XLoginResponseDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XLoginResponseDto>>;
  public refreshToken(
    body: XLoginResponseDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    if (
      isNullOrUndefined(body) ||
      isNullOrEmptyString(body.accessToken) ||
      isNullOrEmptyString(body.refreshToken)
    ) {
      throwException(XExceptionIDs.InvalidArgs);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/RefreshToken`;

    //
    // return result ...
    return this.httpClient.post<XLoginResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region ValidateRevision ...
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
    //
    if (isNullOrEmptyString(revision)) {
      throwException(XExceptionIDs.InvalidArgs);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/Validate`;

    //
    // return result ...
    return this.httpClient.post<boolean>(
      endPointPath,
      { revision },
      {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe,
        reportProgress,
      }
    );
  }
  //#endregion

  //
  //#region Authenticate ...
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
  ): Observable<XLoginResponseDto>;
  public authenticate(
    body: XLoginRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XLoginResponseDto>>;
  public authenticate(
    body: XLoginRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XLoginResponseDto>>;
  public authenticate(
    body: XLoginRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    if (
      isNullOrUndefined(body) ||
      isNullOrEmptyString(body.password) ||
      isNullOrEmptyString(body.userSelectBy)
    ) {
      throwException(XExceptionIDs.InvalidArgs);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/Authenticate`;

    //
    // return result ...
    return this.applyLoginResponseActions(
      body.userSelectBy,
      this.httpClient.post<XLoginResponseDto>(endPointPath, body, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe,
        reportProgress,
      })
    );
  }
  //#endregion

  //
  //#region Logout ...
  /**
   * Logout User ...
   */
  public logout(returnUrl?: string): Promise<void> {
    return new Promise<void>(async (res) => {
      //
      const isLoggedIn = await this.isLoggedIn();
      if (!isLoggedIn) {
        throwException(XExceptionIDs.NotAllowed);
      }

      //
      const defUserId = await this.getDefaultUserIdentifier();
      XValidators.validateNotEmpty(defUserId);

      //
      const defUser = await this.getDefaultUser();
      XValidators.validateNotNull(defUser);

      //
      await this.removeDefaultUser(true);

      //
      if (!isNullOrEmptyString(returnUrl)) {
        this.router.navigateByUrl(returnUrl);
      }

      //
      res();
    });
  }
  //#endregion
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
    observable: Observable<HttpEvent<XLoginResponseDto>>
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
      }),
      concatMap((userInfo) => {
        //
        return this.accountService.accountsFriendshipInfo(userSelectBy).pipe(
          concatMap((friendshipInfo) => {
            //
            // Add Friendship ...
            userInfo.profile.friendshipInfo = friendshipInfo;

            //
            return this.applyUpdateUserAccountInfo(userInfo);
          })
        );
      }),
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
