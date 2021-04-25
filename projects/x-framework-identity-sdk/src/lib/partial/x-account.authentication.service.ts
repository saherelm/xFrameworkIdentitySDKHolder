import {
  XHeaders,
  fromJson,
  XValidators,
  XExceptionIDs,
  throwException,
  isNullOrUndefined,
  isNullOrEmptyString,
} from 'x-framework-core';
import {
  XTokenResponse,
  XLoginRequestDto,
  XLoginResponseDto,
} from '../models/x-login.dto';
import {
  XAccountEndPoint,
  XAccountEndPointParam,
} from '../typings/x-endpoint.typings';
import {
  XActionRequestDto,
  XActionResponseDto,
} from './../models/x-registration-dto';
import { Observable, from, of } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { XDiscoveryDto } from '../models/x-discovery.dto';
import { XApiScope } from '../constants/x-api-scope.enum';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XUserAccountInfo } from '../typings/x-account.typings';
import { XAccountProfileService } from './x-account.profile.service';

export abstract class XAccountAuthenticationService extends XAccountProfileService {
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.DiscoveryDocument);

    //
    // return result ...
    return this.httpClient.get<XDiscoveryDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
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
  ): Observable<XTokenResponse>;
  public requestScopeAccessToken(
    scope: XApiScope,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XTokenResponse>>;
  public requestScopeAccessToken(
    scope: XApiScope,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XTokenResponse>>;
  public requestScopeAccessToken(
    scope: XApiScope,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addCustomHeader(headers, XHeaders.Scope, scope);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.RequestScopeAccessToken);

    //
    // return result ...
    return this.httpClient.post<XTokenResponse>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
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
  ): Observable<XTokenResponse>;
  public authenticate(
    body: XLoginRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XTokenResponse>>;
  public authenticate(
    body: XLoginRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XTokenResponse>>;
  public authenticate(
    body: XLoginRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotNull(body);
    XValidators.validateNotEmpty(body.password, body.userSelectBy);

    //
    if (this.stateSnapshot && this.stateSnapshot.isLoggedIn) {
      throwException(XExceptionIDs.MustLogout);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.Authenticate);

    //
    // return result ...
    return this.httpClient.post<XTokenResponse>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
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
    // Validate Args ...
    XValidators.validateNotNull(body, body.device);
    XValidators.validateNotEmpty(
      body.password,
      body.userSelectBy,
      body.language
    );

    //
    if (this.stateSnapshot && this.stateSnapshot.isLoggedIn) {
      throwException(XExceptionIDs.MustLogout);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.Login);

    //
    // return result ...
    return this.httpClient
      .post<XLoginResponseDto>(endPointPath, body, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe,
        reportProgress,
      })
      .pipe(
        concatMap((res) => {
          //
          // Convert Login Response ...
          const mResponse = fromJson<XLoginResponseDto>(res);

          //
          // Prepare XUserAccountInfo instance ...
          const mUserInfo: XUserAccountInfo = {
            ...mResponse,
            userSelectBy: body.userSelectBy,
          };

          //
          // Update User Account Info ...
          return of(
            this.addOrUpdateUserAccount(mUserInfo.userSelectBy, mUserInfo, true)
          ).pipe(map((_) => mUserInfo));
        }),
        //
        // set User Account in  API Config ...
        concatMap((res) => {
          return of(this.apiConfig.setUserAccount(res)).pipe(map((_) => res));
        })
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
  ): Observable<XTokenResponse>;
  public refreshTokens(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XTokenResponse>>;
  public refreshTokens(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XTokenResponse>>;
  public refreshTokens(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);
    headers = this.addAuthentication(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.RefreshTokens);

    //
    // return result ...
    return this.httpClient.post<XTokenResponse>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Change a User's Password
   *
   * @param body an instance of XActionRequestDto class which provider requirement for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public changePassword(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public changePassword(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public changePassword(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public changePassword(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotNull(body, body.device);
    XValidators.validateNotEmpty(
      body.lang,
      body.password,
      body.newPassword,
      body.returnUrl
    );

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.ChangePassword);

    //
    // return result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  // /**
  //  * ReNew Expired Token
  //  *
  //  * @param body an instance of XLoginRequest class which holds UserName and Password
  //  * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
  //  * @param reportProgress flag to report request and response progress.
  //  */
  // public accountsReNewToken(
  //   body: XLoginResponseDto,
  //   observe?: 'body',
  //   reportProgress?: boolean
  // ): Observable<XLoginResponseDto>;
  // public accountsReNewToken(
  //   body: XLoginResponseDto,
  //   observe?: 'response',
  //   reportProgress?: boolean
  // ): Observable<HttpResponse<XLoginResponseDto>>;
  // public accountsReNewToken(
  //   body: XLoginResponseDto,
  //   observe?: 'events',
  //   reportProgress?: boolean
  // ): Observable<HttpEvent<XLoginResponseDto>>;
  // public accountsReNewToken(
  //   body: XLoginResponseDto,
  //   observe: any = 'body',
  //   reportProgress: boolean = false
  // ): Observable<any> {
  //   //
  //   if (
  //     isNullOrUndefined(body) ||
  //     isNullOrEmptyString(body.accessToken) ||
  //     isNullOrEmptyString(body.refreshToken)
  //   ) {
  //     throwException(XExceptionIDs.InvalidArgs);
  //   }

  //   //
  //   // Instantiiate Headers from Default Headers ...
  //   let headers = this.defaultHeaders;
  //   headers = this.addAcceptJson(headers);
  //   headers = this.addContentType(headers);

  //   //
  //   const endPointPath = `${this.baseEndPointRoute}/ReNewToken`;

  //   //
  //   // return result ...
  //   return this.httpClient
  //     .post<XLoginResponseDto>(endPointPath, body, {
  //       withCredentials: this.apiConfig.withCredentials,
  //       headers,
  //       observe,
  //       reportProgress,
  //     })
  //     .pipe(
  //       map((res) => fromJson<XLoginResponseDto>(res)),
  //       concatMap((res) => {
  //         return from(this.updateUserTokens(body, res)).pipe(map((_) => res));
  //       }),
  //       concatMap((res) => {
  //         return from(this.getUserByToken(body)).pipe(
  //           map((userInfo) => {
  //             return {
  //               ...userInfo,
  //               ...res,
  //             };
  //           })
  //         );
  //       }),
  //       concatMap((userInfo) => {
  //         return this.accountsProfile(userInfo.userSelectBy).pipe(
  //           map((mProfile) => {
  //             return {
  //               ...userInfo,
  //               profile: mProfile,
  //               thumbnail: mProfile.profileImage,
  //             };
  //           })
  //         );
  //       }),
  //       map((userInfo) => {
  //         //
  //         this.updateUserAccount(userInfo.userSelectBy, userInfo);

  //         //
  //         return {
  //           accessToken: userInfo.accessToken,
  //           refreshToken: userInfo.refreshToken,
  //           expiresAt: userInfo.expiresAt,
  //         } as XLoginResponseDto;
  //       })
  //     );
  // }

  // /**
  //  * ReNew Expired Token
  //  *
  //  * @param body an instance of XLoginRequest class which holds UserName and Password
  //  * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
  //  * @param reportProgress flag to report request and response progress.
  //  */
  // public accountsRefreshToken(
  //   body: XLoginResponseDto,
  //   observe?: 'body',
  //   reportProgress?: boolean
  // ): Observable<XLoginResponseDto>;
  // public accountsRefreshToken(
  //   body: XLoginResponseDto,
  //   observe?: 'response',
  //   reportProgress?: boolean
  // ): Observable<HttpResponse<XLoginResponseDto>>;
  // public accountsRefreshToken(
  //   body: XLoginResponseDto,
  //   observe?: 'events',
  //   reportProgress?: boolean
  // ): Observable<HttpEvent<XLoginResponseDto>>;
  // public accountsRefreshToken(
  //   body: XLoginResponseDto,
  //   observe: any = 'body',
  //   reportProgress: boolean = false
  // ): Observable<any> {
  //   //
  //   if (
  //     isNullOrUndefined(body) ||
  //     isNullOrEmptyString(body.accessToken) ||
  //     isNullOrEmptyString(body.refreshToken)
  //   ) {
  //     throwException(XExceptionIDs.InvalidArgs);
  //   }

  //   //
  //   // Instantiiate Headers from Default Headers ...
  //   let headers = this.defaultHeaders;
  //   headers = this.addAcceptJson(headers);
  //   headers = this.addContentType(headers);

  //   //
  //   const endPointPath = `${this.baseEndPointRoute}/RefreshToken`;

  //   //
  //   // return result ...
  //   return this.httpClient
  //     .post<XLoginResponseDto>(endPointPath, body, {
  //       withCredentials: this.apiConfig.withCredentials,
  //       headers,
  //       observe,
  //       reportProgress,
  //     })
  //     .pipe(map((res) => fromJson<XLoginResponseDto>(res)));
  // }

  // /**
  //  * Validate Revision Checksum
  //  *
  //  * @param revision token renew Revision
  //  * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
  //  * @param reportProgress flag to report request and response progress.
  //  */
  // public accountsValidateRevision(
  //   revision: string,
  //   observe?: 'body',
  //   reportProgress?: boolean
  // ): Observable<boolean>;
  // public accountsValidateRevision(
  //   revision: string,
  //   observe?: 'response',
  //   reportProgress?: boolean
  // ): Observable<HttpResponse<boolean>>;
  // public accountsValidateRevision(
  //   revision: string,
  //   observe?: 'events',
  //   reportProgress?: boolean
  // ): Observable<HttpEvent<boolean>>;
  // public accountsValidateRevision(
  //   revision: string,
  //   observe: any = 'body',
  //   reportProgress: boolean = false
  // ): Observable<any> {
  //   //
  //   if (isNullOrEmptyString(revision)) {
  //     throwException(XExceptionIDs.InvalidArgs);
  //   }

  //   //
  //   // Instantiiate Headers from Default Headers ...
  //   let headers = this.defaultHeaders;
  //   headers = this.addAuthentication(headers);
  //   headers = this.addAcceptJson(headers);
  //   headers = this.addContentType(headers);

  //   //
  //   const endPointPath = `${this.baseEndPointRoute}/Validate`;

  //   //
  //   // return result ...
  //   return this.httpClient.post<boolean>(
  //     endPointPath,
  //     { revision },
  //     {
  //       withCredentials: this.apiConfig.withCredentials,
  //       headers,
  //       observe,
  //       reportProgress,
  //     }
  //   );
  // }

  /**
   * Logout User ...
   */
  public async accountLogout(): Promise<void> {
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
    const returnUrl = this.router.url;
    this.router.navigateByUrl(
      `account/login?${XHeaders.ReturnUrl}=${returnUrl}`
    );
  }
}
