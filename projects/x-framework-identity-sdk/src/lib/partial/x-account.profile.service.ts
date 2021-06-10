import {
  XavatarDto,
  XUserProfileDto,
  XUserNameIdRequestDto,
  XUserNameIdResponseDto,
  XProfileUpdateRequestDto,
} from '../models/x-user.dto';
import { Observable } from 'rxjs';
import {
  XAccountEndPoint,
  XAccountEndPointParam,
} from '../typings/x-endpoint.typings';
import { XHeader, XValidators } from 'x-framework-core';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XQueryDto, XQueryResultDto } from '../models/x-query.dto';
import { XAccountAuthenticationService } from './x-account.authentication.service';

export abstract class XAccountProfileService extends XAccountAuthenticationService {
  //
  //#region GetNames ...
  /**
   * Get UserName's Related to a Collection of user identifiers
   *
   * @param ids selected user identifiers
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getNames(
    ids: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<string[]>;
  public getNames(
    ids: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<string[]>>;
  public getNames(
    ids: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<string[]>>;
  public getNames(
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

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.GetNames, {
      key: XAccountEndPointParam.XIds,
      value: ids,
    });

    //
    // Prepare Result ...
    return this.httpClient.get<string[]>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region GetNameIds ...
  /**
   * Get UserName's Related to a Collection of user id's
   *
   * @param model selected user identifiers
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getNameIds(
    model: XUserNameIdRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserNameIdResponseDto[]>;
  public getNameIds(
    model: XUserNameIdRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserNameIdResponseDto[]>>;
  public getNameIds(
    model: XUserNameIdRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserNameIdResponseDto[]>>;
  public getNameIds(
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.GetNameIds);

    //
    // Prepare Result ...
    return this.httpClient.post<XUserNameIdResponseDto[]>(endPointPath, model, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Profile ...
  /**
   * Get Profile Object of Specific User
   *
   * @param userSelectBy selected user identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getProfile(
    userSelectBy: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public getProfile(
    userSelectByParam: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public getProfile(
    userSelectByParam: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public getProfile(
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.Profile, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: userSelectByParam,
    });

    //
    // Prepare Result ...
    return this.httpClient.get<XUserProfileDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region QueryProfiles ...
  /**
   * query user profiles
   *
   * @param query an instance of XQuery interface which provide projectio data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public queryProfiles(
    query?: XQueryDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XQueryResultDto<XUserProfileDto>>;
  public queryProfiles(
    query?: XQueryDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XQueryResultDto<XUserProfileDto>>>;
  public queryProfiles(
    query?: XQueryDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XQueryResultDto<XUserProfileDto>>>;
  public queryProfiles(
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.QueryProfiles);

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
  //#endregion

  //
  //#region QueryAvatars ...
  /**
   * query specific users avatars ...
   *
   * @param userSelectByParam user identifier
   * @param query an instance of XQuery interface which provide projectio data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public queryAvatars(
    userSelectByParam?: string,
    query?: XQueryDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XQueryResultDto<XavatarDto>>;
  public queryAvatars(
    userSelectByParam?: string,
    query?: XQueryDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XQueryResultDto<XavatarDto>>>;
  public queryAvatars(
    userSelectByParam?: string,
    query?: XQueryDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XQueryResultDto<XavatarDto>>>;
  public queryAvatars(
    userSelectByParam?: string,
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.QueryAvatars, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: userSelectByParam,
    });

    //
    // Prepare Result ...
    return this.httpClient.get<XQueryResultDto<XavatarDto>>(endPointPath, {
      params: queryParameters,
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region ProfileUpdate ...
  /**
   * Update Specific User's Profile
   *
   * @param userSelectByParam selected user identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateProfile(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public updateProfile(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public updateProfile(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public updateProfile(
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.ProfileUpdate, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: userSelectByParam,
    });

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region FullProfileUpdate ...
  /**
   * Update Specific User's Profile
   *
   * @param userSelectByParam selected user identifier
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public fullUpdateProfile(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public fullUpdateProfile(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public fullUpdateProfile(
    userSelectByParam: string,
    body: XProfileUpdateRequestDto,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public fullUpdateProfile(
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.FullProfileUpdate, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: userSelectByParam,
    });

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, body, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region AddAvatar ...
  /**
   * Add a New Profile Image
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addAvatar(
    body: File,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public addAvatar(
    body: File,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public addAvatar(
    body: File,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public addAvatar(
    body: File,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate ARgs ...
    XValidators.validateNotNull(body);

    //
    const formData: FormData = new FormData();
    formData.append(XHeader.File, body, body.name);

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.AddAvatar);

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, formData, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  //#endregion

  //
  //#region AddAvatars ...
  /**
   * Add a Collection of Profile Images
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public addAvatars(
    body: File[],
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public addAvatars(
    body: File[],
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public addAvatars(
    body: File[],
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public addAvatars(
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
      formData.append(XHeader.Files, f, f.name);
    });

    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);

    //
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.AddAvatars);

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, formData, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region SetAvatar ...
  /**
   * set Specified Profile Image as Avatar
   *
   * @param id profile image id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public setAvatar(
    id: number,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public setAvatar(
    id: number,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public setAvatar(
    id: number,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public setAvatar(
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotNull(id);

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
    >(XAccountEndPoint.SetAvatar, {
      key: XAccountEndPointParam.XId,
      value: id.toString(),
    });

    //
    // Prepare Result ...
    return this.httpClient.post<XUserProfileDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RemoveAvatars ...
  /**
   * Remove Profile Images
   *
   * @param ids profile image id's which need's to remove
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public removeAvatars(
    ids: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XUserProfileDto>;
  public removeAvatars(
    ids: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XUserProfileDto>>;
  public removeAvatars(
    ids: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XUserProfileDto>>;
  public removeAvatars(
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
    // Prepare Endpoint
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.RemoveAvatars, {
      key: XAccountEndPointParam.XIds,
      value: ids,
    });

    //
    // Prepare Result ...
    return this.httpClient.delete<XUserProfileDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion
}
