import { Observable } from 'rxjs';
import { XUserNameIdRequestDto } from '../models/x-user.dto';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XAccountIdentityService } from './x-account.identity.service';

export class XAccountAdminService extends XAccountIdentityService {
  /**
   * ban users access to resources
   *
   * @param body the collection of user id's
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsBan(
    body: XUserNameIdRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string[]>;
  public accountsBan(
    body: XUserNameIdRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string[]>>;
  public accountsBan(
    body: XUserNameIdRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string[]>>;
  public accountsBan(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/Ban`;

    //
    // Prepare Result ...
    return this.httpClient.post<string[]>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress
    });
  }

  /**
   * unban users access to resources
   *
   * @param body the collection of user id's
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsUnBan(
    body: XUserNameIdRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string[]>;
  public accountsUnBan(
    body: XUserNameIdRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string[]>>;
  public accountsUnBan(
    body: XUserNameIdRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string[]>>;
  public accountsUnBan(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/UnBan`;

    //
    // Prepare Result ...
    return this.httpClient.post<string[]>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress
    });
  }

  /**
   * check a User is Banned or not
   *
   * @param destUser the user id's which going to check Banned or not
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsIsBanned(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsIsBanned(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsIsBanned(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsIsBanned(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/IsBanned`;

    //
    // Prepare Result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress
    });
  }
}
