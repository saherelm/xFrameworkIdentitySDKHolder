import { Observable } from 'rxjs';
import {
  XActionRequestDto,
  XActionResponseDto,
} from '../models/x-registration-dto';
import { XHeaders, XValidators } from 'x-framework-core';
import { XHttpUrlEncodingCodec } from '../providers/x-url.encoder';
import { HttpResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { XAccountCanRegisterService } from './x-account.can-register.service';

export abstract class XAccountRegistrationService extends XAccountCanRegisterService {
  /**
   * Request Terms and Conditions
   *
   * @param language an string value which represent result language
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsGetTermsAndConditions(
    language?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string>;
  public accountsGetTermsAndConditions(
    language?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string>>;
  public accountsGetTermsAndConditions(
    language?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string>>;
  public accountsGetTermsAndConditions(
    language?: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    let queryParameters = new HttpParams({
      encoder: new XHttpUrlEncodingCodec(),
    });

    //
    if (language !== undefined && language !== null) {
      queryParameters = queryParameters.set(XHeaders.Language, language as any);
    }

    //
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/terms`;

    //
    // return result ...
    return this.httpClient.get<string>(endPointPath, {
      params: queryParameters,
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Invite a User to Register on Dashboard
   *
   * @param body action request object
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsInviteUser(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public accountsInviteUser(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public accountsInviteUser(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public accountsInviteUser(
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
    // Prepare Endpoint Path ...
    const endPointPath = `${this.baseEndPointRoute}/InviteUser`;

    //
    // return result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Recieve some Basic Informations and Start Registration Proccess if they Valid   Registration Proccess Starts with Invoking this Action
   *
   * @param body action request object
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRequestRegistration(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public accountsRequestRegistration(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public accountsRequestRegistration(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public accountsRequestRegistration(
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
    const endPointPath = `${this.baseEndPointRoute}/RequestRegistration`;

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
   * Add User Account Informations
   *
   * @param body action request object
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsAddAccountInfo(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public accountsAddAccountInfo(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public accountsAddAccountInfo(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public accountsAddAccountInfo(
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
    const endPointPath = `${this.baseEndPointRoute}/AddAccountInfo`;

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
   * Finish Registrationn Proccess
   *
   * @param body action request object
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFinishRegistration(
    body: XActionRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public accountsFinishRegistration(
    body: XActionRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public accountsFinishRegistration(
    body: XActionRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public accountsFinishRegistration(
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
    const endPointPath = `${this.baseEndPointRoute}/FinishRegistration`;

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
   * Upload and Attach a Profile Image for User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsAttachProfileImage(
    body: File,
    actionToken: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XActionResponseDto>;
  public accountsAttachProfileImage(
    body: File,
    actionToken: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XActionResponseDto>>;
  public accountsAttachProfileImage(
    body: File,
    actionToken: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XActionResponseDto>>;
  public accountsAttachProfileImage(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/AttachProfileImage`;

    //
    // Prepare Result ...
    return this.httpClient.post<XActionResponseDto>(endPointPath, formData, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
