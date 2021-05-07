import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {
  XActionRequestDto,
  XActionResponseDto,
} from '../models/x-registration-dto';
import {
  XAccountEndPoint,
  XAccountEndPointParam,
} from '../typings/x-endpoint.typings';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { XCountryCode, XHeaders, XValidators } from 'x-framework-core';
import { XAccountFriendshipService } from './x-account.friendship.service';

export abstract class XAccountRegistrationService extends XAccountFriendshipService {
  //
  //#region IsConfirmedEmail ...
  /**
   *  Check User is Confirmed Email or not
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public isConfirmedEmail(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public isConfirmedEmail(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public isConfirmedEmail(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public isConfirmedEmail(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.IsConfirmedEmail);

    //
    // return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region IsConfirmedMobile ...
  /**
   *  Check User is Confirmed Mobile or not
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public isConfirmedMobile(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public isConfirmedMobile(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public isConfirmedMobile(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public isConfirmedMobile(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.IsConfirmedMobile);

    //
    // return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region CanRegisterUserName ...
  /**
   * Check a UserName is Available For Registration or not
   *
   * @param userName an string value which represent desired username
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public canRegisterUserName(
    userName?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public canRegisterUserName(
    userName?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public canRegisterUserName(
    userName?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public canRegisterUserName(
    userName?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    try {
      XValidators.validateNotEmpty(userName);
    } catch {
      return of(false);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.CanRegisterUserName, {
      key: XAccountEndPointParam.XUserName,
      value: userName,
    });

    //
    // return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region CanRegisterMobileNumber ...
  /**
   * Check a Mobile Number is Available For Registration or not
   *
   * @param mobileNumber an string value which represent desired mobile number
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public canRegisterMobileNumber(
    mobileNumber?: string,
    defaultCountryCode?: XCountryCode,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public canRegisterMobileNumber(
    mobileNumber?: string,
    defaultCountryCode?: XCountryCode,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public canRegisterMobileNumber(
    mobileNumber?: string,
    defaultCountryCode?: XCountryCode,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public canRegisterMobileNumber(
    mobileNumber?: string,
    defaultCountryCode?: XCountryCode,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    try {
      XValidators.validateNotEmpty(mobileNumber);
      XValidators.validatePhoneNumber(
        mobileNumber,
        defaultCountryCode || this.config.defaultCountryCode
      );
    } catch {
      return of(false);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.CanRegisterMobileNumber, {
      key: XAccountEndPointParam.XMobileNumber,
      value: mobileNumber,
    });

    //
    // return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region CanRegisterEmail ...
  /**
   * Check a Email Address is Available For Registration or not
   *
   * @param email an string value which represent desired email address
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public canRegisterEmail(
    email?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public canRegisterEmail(
    email?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public canRegisterEmail(
    email?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public canRegisterEmail(
    email?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    try {
      XValidators.validateNotEmpty(email);
      XValidators.validateEmailAddress(email);
    } catch {
      return of(false);
    }

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.CanRegisterEmail, {
      key: XAccountEndPointParam.XEmail,
      value: email,
    });

    //
    // return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RequestConfirmEmail ...
  /**
   * Request For Email Address Change/ Confirm
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestConfirmEmail(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public requestConfirmEmail(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public requestConfirmEmail(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public requestConfirmEmail(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.RequestConfirmEmail);

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RequestConfirmMobile ...
  /**
   * Request For Mobile Number Change/ Confirm
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestConfirmMobile(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public requestConfirmMobile(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public requestConfirmMobile(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public requestConfirmMobile(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.RequestConfirmMobile);

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RequestResetPassword ...
  /**
   * Request Reset Password Action
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestResetPassword(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public requestResetPassword(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public requestResetPassword(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public requestResetPassword(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.RequestResetPassword);

    //
    // Prepare Result ...
    return this.httpClient.post<Blob>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RequestConfirmRegistration ...
  /**
   * Request Registration Confirm
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public requestConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public requestConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public requestConfirmRegistration(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.RequestConfirmRegistration);

    //
    // Prepare Result ...
    return this.httpClient.post<Blob>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region ConfirmRegistration ...
  /**
   * Confirm Registration ...
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public confirmRegistration(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public confirmRegistration(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public confirmRegistration(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public confirmRegistration(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.ConfirmRegistration);

    //
    // Prepare Result ...
    return this.httpClient.post<Blob>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region ConfirmEmailAddress ...
  /**
   * Confirm Email Address
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public confirmEmail(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public confirmEmail(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public confirmEmail(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public confirmEmail(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.ConfirmEmailAddress);

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region ConfirmMobileNumber ...
  /**
   * Confirm Mobile Number
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public confirmMobile(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public confirmMobile(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public confirmMobile(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public confirmMobile(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.ConfirmMobileNumber);

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region InviteUser ...
  /**
   * Invite a User to Register on Dashboard
   *
   * @param body action request object
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public invite(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public invite(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public invite(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public invite(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    XValidators.validateNotNull(body);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.InviteUser);

    //
    // return result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RequestRegistration ...
  /**
   * Recieve some Basic Informations and Start Registration Proccess if they Valid   Registration Proccess Starts with Invoking this Action
   *
   * @param body action request object
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public requestRegistration(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public requestRegistration(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public requestRegistration(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public requestRegistration(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.RequestRegistration);

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region AddAccountInfo ...
  /**
   * Add User Account Informations
   *
   * @param body action request object
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addAccountInfo(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public addAccountInfo(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public addAccountInfo(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public addAccountInfo(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.AddAccountInfo);

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region AttachProfileImage ...
  /**
   * Upload and Attach a Profile Image for User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public attachProfileImage(
    body: File,
    actionToken: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public attachProfileImage(
    body: File,
    actionToken: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public attachProfileImage(
    body: File,
    actionToken: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public attachProfileImage(
    body: File,
    actionToken: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);
    XValidators.validateNotEmpty(actionToken);

    //
    const formData: FormData = new FormData();
    formData.append(XHeaders.File, body, body.name);
    formData.append(XHeaders.ActionToken, actionToken);

    //
    // Instantiiate Headers from Default Headers ...
    const headers = this.defaultHeaders;

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.AttachProfileImage);

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, formData, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region FinishRegistration ...
  /**
   * Finish Registrationn Proccess
   *
   * @param body action request object
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public finishRegistration(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public finishRegistration(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public finishRegistration(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public finishRegistration(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.FinishRegistration);

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region ChangePassword ...
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
  //#endregion

  //
  //#region ResetPassword ...
  /**
   * Reset Password
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public resetPassword(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public resetPassword(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public resetPassword(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public resetPassword(
    body: XActionRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

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
    >(XAccountEndPoint.ResetPassword);

    //
    // Prepare Result ...
    return this.httpClient.post<Blob>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion
}
