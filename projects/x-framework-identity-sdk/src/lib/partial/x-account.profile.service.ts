import { Observable } from 'rxjs';
import {
  XUserProfileDto,
  XUserNameIdRequestDto,
  XUserNameIdResponseDto,
  XProfileUpdateRequestDto,
} from '../models/x-user.dto';
import {
  XActionRequestDto,
  XActionResponseDto,
} from '../models/x-registration-dto';
import { XHeaders, XValidators } from 'x-framework-core';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XQueryDto, XQueryResultDto } from '../models/x-query.dto';
import { XAccountRegistrationService } from './x-account.registration.service';

export abstract class XAccountProfileService extends XAccountRegistrationService {
  /**
   * Get Profile Object of Specific User
   *
   * @param userSelectBy selected user identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsProfile(
    userSelectBy: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public accountsProfile(
    userSelectByParam: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public accountsProfile(
    userSelectByParam: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public accountsProfile(
    userSelectByParam: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotEmpty(userSelectByParam);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(userSelectByParam)
    )}/Profile`;

    //
    // Prepare Result ...
    return this.httpClient.get<XUserProfileDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get Profile Object of Specific User
   *
   * @param userSelectBy selected user identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsProfileUpdate(
    userSelectBy: string,
    body: XProfileUpdateRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public accountsProfileUpdate(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public accountsProfileUpdate(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public accountsProfileUpdate(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotEmpty(userSelectByParam);
    XValidators.validateNotNull(body);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(userSelectByParam)
    )}/ProfileUpdate`;

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get UserName's Related to a Collection of user id's
   *
   * @param model selected user identifiers
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsUserNameIds(
    model: XUserNameIdRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserNameIdResponseDto>;
  public accountsUserNameIds(
    model: XUserNameIdRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserNameIdResponseDto>>;
  public accountsUserNameIds(
    model: XUserNameIdRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserNameIdResponseDto>>;
  public accountsUserNameIds(
    model: XUserNameIdRequestDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(model);
    XValidators.validateHasChilds(model.ids);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/UserNameIds`;

    //
    // Prepare Result ...
    return this.httpClient.post<XUserNameIdResponseDto[]>(endPointPath, model, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Add a New Profile Image
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsAddProfileImage(
    body: File,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public accountsAddProfileImage(
    body: File,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public accountsAddProfileImage(
    body: File,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public accountsAddProfileImage(
    body: File,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

    //
    const formData: FormData = new FormData();
    formData.append(XHeaders.File, body, body.name);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/AddProfileImage`;

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, formData, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Add a Collection of Profile Images
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsAddProfileImages(
    body: File[],
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public accountsAddProfileImages(
    body: File[],
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public accountsAddProfileImages(
    body: File[],
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public accountsAddProfileImages(
    body: File[],
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateHasChilds(body);

    //
    const formData: FormData = new FormData();
    body.forEach((f) => {
      formData.append(XHeaders.Files, f, f.name);
    });

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/AddProfileImages`;

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, formData, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Remove Profile Images
   *
   * @param ids profile image id's which need's to remove
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRemoveProfileImage(
    ids: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public accountsRemoveProfileImage(
    ids: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public accountsRemoveProfileImage(
    ids: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public accountsRemoveProfileImage(
    ids: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotEmpty(ids);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Url ...
    const endPointPath = `${
      this.baseEndPointRoute
    }/RemoveProfileImage/${encodeURIComponent(String(ids))}`;

    //
    // Prepare Result ...
    return this.httpClient.delete<XUserProfileDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Request For Email Address Change/ Confirm
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRequestConfirmEmail(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public accountsRequestConfirmEmail(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public accountsRequestConfirmEmail(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public accountsRequestConfirmEmail(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/RequestConfirmEmail`;

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Request For Mobile Number Change/ Confirm
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRequestConfirmMobile(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public accountsRequestConfirmMobile(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public accountsRequestConfirmMobile(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public accountsRequestConfirmMobile(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/RequestConfirmMobile`;

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Request Registration Confirm
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRequestConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public accountsRequestConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public accountsRequestConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public accountsRequestConfirmRegistration(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/RequestConfirmRegistration`;

    //
    // Prepare Result ...
    return this.httpClient.post<Blob>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Request Reset Password Action
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRequestResetPassword(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public accountsRequestResetPassword(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public accountsRequestResetPassword(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public accountsRequestResetPassword(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/RequestResetPassword`;

    //
    // Prepare Result ...
    return this.httpClient.post<Blob>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   *  Check User is Confirmed Mobile or not
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsIsConfirmedMobile(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsIsConfirmedMobile(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsIsConfirmedMobile(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsIsConfirmedMobile(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/IsConfirmedMobile`;

    //
    // return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   *  Check User is Confirmed Email or not
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsIsConfirmedEmail(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsIsConfirmedEmail(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsIsConfirmedEmail(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsIsConfirmedEmail(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/IsConfirmedEmail`;

    //
    // return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Confirm Mobile Number
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsConfirmMobile(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public accountsConfirmMobile(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public accountsConfirmMobile(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public accountsConfirmMobile(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/ConfirmMobileNumber`;

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Confirm Email Address
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsConfirmEmail(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public accountsConfirmEmail(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public accountsConfirmEmail(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public accountsConfirmEmail(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/ConfirmEmailAddress`;

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Confirm Registration ...
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public accountsConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public accountsConfirmRegistration(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public accountsConfirmRegistration(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/ConfirmRegistration`;

    //
    // Prepare Result ...
    return this.httpClient.post<Blob>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Change a User&#x27;s Password ...
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsChangePassword(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<void>;
  public accountsChangePassword(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<void>>;
  public accountsChangePassword(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<void>>;
  public accountsChangePassword(
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
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/ChangePassword`;

    //
    // Prepare Result ...
    return this.httpClient.post<void>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Reset Password
   *
   * @param body request for action
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsResetPassword(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public accountsResetPassword(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public accountsResetPassword(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public accountsResetPassword(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/ResetPassword`;

    //
    // Prepare Result ...
    return this.httpClient.post<Blob>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * set Specified Profile Image as Avatar
   *
   * @param id profile image id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsSetAsAvatar(
    id: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public accountsSetAsAvatar(
    id: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public accountsSetAsAvatar(
    id: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public accountsSetAsAvatar(
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      id.toString()
    )}/SetAsAvatar`;

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * query user profiles
   *
   * @param query an instance of XQuery interface which provide projectio data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsGetUsers(
    query?: XQueryDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XQueryResultDto<XUserProfileDto>>;
  public accountsGetUsers(
    query?: XQueryDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XQueryResultDto<XUserProfileDto>>>;
  public accountsGetUsers(
    query?: XQueryDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XQueryResultDto<XUserProfileDto>>>;
  public accountsGetUsers(
    query?: XQueryDto,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    const queryParameters = this.generateXQueryHttpParams(query);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);
    headers = this.addContentType(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/GetUsers`;

    //
    // Prepare Result ...
    return this.httpClient.get<XQueryResultDto<XUserProfileDto>>(endPointPath, {
      params: queryParameters,
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
