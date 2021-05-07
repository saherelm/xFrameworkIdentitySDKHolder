import { Observable } from 'rxjs';
import {
  XAccountEndPoint,
  XAccountEndPointParam,
} from '../typings/x-endpoint.typings';
import { XUserNameIdRequestDto } from '../models/x-user.dto';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { XAccountRegistrationService } from './x-account.registration.service';

export class XAccountAdminService extends XAccountRegistrationService {
  //
  //#region Ban ...
  /**
   * ban users access to resources
   *
   * @param body the collection of user id's
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public ban(
    body: XUserNameIdRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string[]>;
  public ban(
    body: XUserNameIdRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string[]>>;
  public ban(
    body: XUserNameIdRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string[]>>;
  public ban(
    body: XUserNameIdRequestDto,
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.Ban);

    //
    // Prepare Result ...
    return this.httpClient.post<string[]>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region UnBan ...
  /**
   * unban users access to resources
   *
   * @param body the collection of user id's
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public unBan(
    body: XUserNameIdRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string[]>;
  public unBan(
    body: XUserNameIdRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string[]>>;
  public unBan(
    body: XUserNameIdRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string[]>>;
  public unBan(
    body: XUserNameIdRequestDto,
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.UnBan);

    //
    // Prepare Result ...
    return this.httpClient.post<string[]>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region IsBanned ...
  /**
   * check a User is Banned or not
   *
   * @param destUser the user id's which going to check Banned or not
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public isBanned(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public isBanned(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public isBanned(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public isBanned(
    destUser: string,
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.IsBanned, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // Prepare Result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion
}
