import {
  XHeaders,
  fromJson,
  XValidators,
  XExceptionIDs,
  throwException,
  isNullOrEmptyString,
} from 'x-framework-core';
import {
  XTokenResponseDto,
  XLoginRequestDto,
  XLoginResponseDto,
} from '../models/x-login.dto';
import { Observable, of } from 'rxjs';
import {
  XAccountEndPoint,
  XAccountEndPointParam,
} from '../typings/x-endpoint.typings';
import { map, concatMap } from 'rxjs/operators';
import { XDiscoveryDto } from '../models/x-discovery.dto';
import { XApiScope } from '../constants/x-api-scope.enum';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XAccountBaseService } from './x-account.base.service';
import { XUserAccountInfo } from '../typings/x-account.typings';

export abstract class XAccountAuthenticationService extends XAccountBaseService {
  //
  //#region DiscoveryDocument ...
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
  //#endregion

  //
  //#region ScopeAccessToken ...
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
    return this.httpClient.post<XTokenResponseDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
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
    return this.httpClient.post<XTokenResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Login ...
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
  //#endregion

  //
  //#region RefreshTokens ...
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
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    const tokens = this.retrieveTokens();
    headers = this.addAuthentication(headers, tokens);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.RefreshTokens);

    //
    // return result ...
    return this.httpClient.post<XTokenResponseDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Validate ...
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
    XValidators.validateNotEmpty(revision);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.Validate);

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
  //#region Logout ...
  /**
   * Logout User ...
   */
  public async logout(returnUrl?: string) {
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
  }
  //#endregion
}
