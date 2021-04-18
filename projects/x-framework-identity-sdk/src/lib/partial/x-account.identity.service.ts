import { Observable } from 'rxjs';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XAccountFriendshipService } from './x-account.friendship.service';

export class XAccountIdentityService extends XAccountFriendshipService {
  /**
   * Test Admin Authorization Policy
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public identityAdminAccess(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public identityAdminAccess(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public identityAdminAccess(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public identityAdminAccess(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.basePath}/identity/Admin`;

    //
    // Prepare Result ...
    return this.httpClient.get<Blob>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Test Agent Authorization Policy
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public identityAgentAccess(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public identityAgentAccess(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public identityAgentAccess(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public identityAgentAccess(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.basePath}/identity/Agent`;

    //
    // Prepare Result ...
    return this.httpClient.get<Blob>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Test User Authorization Policy
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public identityUserAccess(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public identityUserAccess(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public identityUserAccess(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public identityUserAccess(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.basePath}/identity/User`;

    //
    // Prepare Result ...
    return this.httpClient.get<Blob>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Test EnabledUser Authorization Policy
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public identityEnabledUser(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public identityEnabledUser(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public identityEnabledUser(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public identityEnabledUser(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.basePath}/identity/EnabledUser`;

    //
    // Prepare Result ...
    return this.httpClient.get<Blob>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Test Read Authorization Policy
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public identityReadAccess(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public identityReadAccess(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public identityReadAccess(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public identityReadAccess(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.basePath}/identity/Read`;

    //
    // Prepare Result ...
    return this.httpClient.get<Blob>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Test Write Authorization Policy
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public identityWriteAccess(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public identityWriteAccess(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public identityWriteAccess(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public identityWriteAccess(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    // Prepare Url ...
    const endPointPath = `${this.basePath}/identity/Write`;

    //
    // Prepare Result ...
    return this.httpClient.get<Blob>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  // /**
  //  * Retrieve UserInfo instance based on User Claims
  //  *
  //  * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
  //  * @param reportProgress flag to report request and response progress.
  //  */
  // public identityUserInfo(
  //   observe?: 'body',
  //   reportProgress?: boolean
  // ): Observable<XUserInfo>;
  // public identityUserInfo(
  //   observe?: 'response',
  //   reportProgress?: boolean
  // ): Observable<HttpResponse<XUserInfo>>;
  // public identityUserInfo(
  //   observe?: 'events',
  //   reportProgress?: boolean
  // ): Observable<HttpEvent<XUserInfo>>;
  // public identityUserInfo(
  //   observe: any = 'body',
  //   reportProgress: boolean = false
  // ): Observable<any> {
  //   //
  //   // Instantiiate Headers from Default Headers ...
  //   let headers = this.defaultHeaders;
  //   headers = this.addAuthentication(headers);
  //   headers = this.addAcceptJson(headers);

  //   //
  //   // Prepare Url ...
  //   const endPointPath = `${this.baseEndPointRoute}/`;

  //   //
  //   // Prepare Result ...
  //   return this.httpClient.get<XUserInfo>(endPointPath, {
  //     withCredentials: this.configuration.withCredentials,
  //     headers,
  //     observe,
  //     reportProgress
  //   });
  // }
}
