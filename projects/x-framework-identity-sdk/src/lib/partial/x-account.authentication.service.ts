import {
  XHeaders,
  fromJson,
  XValidators,
  XExceptionIDs,
  throwException,
  isNullOrUndefined,
  isNullOrEmptyString,
} from 'x-framework-core';
import { Observable, from, of } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { XDiscoveryDto } from '../models/x-discovery.dto';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XUserAccountInfo } from '../typings/x-account.typings';
import { XAccountProfileService } from './x-account.profile.service';
import { XLoginResponseDto, XLoginRequestDto } from '../models/x-login.dto';

export abstract class XAccountAuthenticationService extends XAccountProfileService {
  /**
   * Retrieve Discovery Document
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRequestDiscoveryDocument(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XDiscoveryDto>;
  public accountsRequestDiscoveryDocument(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XDiscoveryDto>>;
  public accountsRequestDiscoveryDocument(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XDiscoveryDto>>;
  public accountsRequestDiscoveryDocument(
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

  /**
   * Request Read Access Token for API Actions
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRequestReadToken(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string>;
  public accountsRequestReadToken(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string>>;
  public accountsRequestReadToken(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string>>;
  public accountsRequestReadToken(
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

  /**
   * Request Write Access Token for API Actions
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRequestWriteToken(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string>;
  public accountsRequestWriteToken(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string>>;
  public accountsRequestWriteToken(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string>>;
  public accountsRequestWriteToken(
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

  /**
   * ReNew Expired Token
   *
   * @param body an instance of XLoginRequest class which holds UserName and Password
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsReNewToken(
    body: XLoginResponseDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XLoginResponseDto>;
  public accountsReNewToken(
    body: XLoginResponseDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XLoginResponseDto>>;
  public accountsReNewToken(
    body: XLoginResponseDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XLoginResponseDto>>;
  public accountsReNewToken(
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
    return this.httpClient
      .post<XLoginResponseDto>(endPointPath, body, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe,
        reportProgress,
      })
      .pipe(
        map((res) => fromJson<XLoginResponseDto>(res)),
        concatMap((res) => {
          return from(this.updateUserTokens(body, res)).pipe(map((_) => res));
        }),
        concatMap((res) => {
          return from(this.getUserByToken(body)).pipe(
            map((userInfo) => {
              return {
                ...userInfo,
                ...res,
              };
            })
          );
        }),
        concatMap((userInfo) => {
          return this.accountsProfile(userInfo.userSelectBy).pipe(
            map((mProfile) => {
              return {
                ...userInfo,
                profile: mProfile,
                thumbnail: mProfile.profileImage,
              };
            })
          );
        }),
        map((userInfo) => {
          //
          this.updateUserAccount(userInfo.userSelectBy, userInfo);

          //
          return {
            accessToken: userInfo.accessToken,
            refreshToken: userInfo.refreshToken,
            expiresAt: userInfo.expiresAt,
          } as XLoginResponseDto;
        })
      );
  }

  /**
   * ReNew Expired Token
   *
   * @param body an instance of XLoginRequest class which holds UserName and Password
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRefreshToken(
    body: XLoginResponseDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XLoginResponseDto>;
  public accountsRefreshToken(
    body: XLoginResponseDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XLoginResponseDto>>;
  public accountsRefreshToken(
    body: XLoginResponseDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XLoginResponseDto>>;
  public accountsRefreshToken(
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
    return this.httpClient
      .post<XLoginResponseDto>(endPointPath, body, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe,
        reportProgress,
      })
      .pipe(map((res) => fromJson<XLoginResponseDto>(res)));
  }

  /**
   * Validate Revision Checksum
   *
   * @param revision token renew Revision
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsValidateRevision(
    revision: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsValidateRevision(
    revision: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsValidateRevision(
    revision: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsValidateRevision(
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

  /**
   * Authenticate a User
   *
   * @param body an instance of XLoginRequest class which holds UserName and Password
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsAuthenticate(
    body: XLoginRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XLoginResponseDto>;
  public accountsAuthenticate(
    body: XLoginRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XLoginResponseDto>>;
  public accountsAuthenticate(
    body: XLoginRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XLoginResponseDto>>;
  public accountsAuthenticate(
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
    if (this.stateSnapshot.isLoggedIn) {
      throwException(XExceptionIDs.MustLogout);
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
