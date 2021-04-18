import { Observable, of } from 'rxjs';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XAccountBaseService } from './x-account.base.service';
import { XHeaders, XValidators, XCountryCode } from 'x-framework-core';

export abstract class XAccountCanRegisterService extends XAccountBaseService {
  /**
   * Check a Email Address is Available For Registration or not
   *
   * @param email an string value which represent desired email address
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsCanRegisterEmail(
    email?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsCanRegisterEmail(
    email?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsCanRegisterEmail(
    email?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsCanRegisterEmail(
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
    headers = headers.set(XHeaders.Email, String(email));

    //
    const endPointPath = `${this.baseEndPointRoute}/CanRegisterEmail`;

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
   * Check a Mobile Number is Available For Registration or not
   *
   * @param mobileNumber an string value which represent desired mobile number
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsCanRegisterMobileNumber(
    mobileNumber?: string,
    defaultCountryCode?: XCountryCode,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsCanRegisterMobileNumber(
    mobileNumber?: string,
    defaultCountryCode?: XCountryCode,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsCanRegisterMobileNumber(
    mobileNumber?: string,
    defaultCountryCode?: XCountryCode,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsCanRegisterMobileNumber(
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
    headers = headers.set(XHeaders.MobileNumber, String(mobileNumber));

    //
    const endPointPath = `${this.baseEndPointRoute}/CanRegisterMobileNumber`;

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
   * Check a UserName is Available For Registration or not
   *
   * @param userName an string value which represent desired username
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsCanRegisterUserName(
    userName?: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsCanRegisterUserName(
    userName?: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsCanRegisterUserName(
    userName?: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsCanRegisterUserName(
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
    headers = headers.set(XHeaders.UserName, String(userName));

    //
    const endPointPath = `${this.baseEndPointRoute}/CanRegisterUserName`;

    //
    // return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
