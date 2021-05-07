import { Observable } from 'rxjs';
import {
  XFriendshipState,
  XFriendshipInfoDto,
  XFriendshipFollowerDto,
  XFriendshipFollowingDto,
} from '../models/x-friendship.dto';
import {
  XAccountEndPoint,
  XAccountEndPointParam,
} from '../typings/x-endpoint.typings';
import { XValidators } from 'x-framework-core';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { XAccountProfileService } from './x-account.profile.service';

export abstract class XAccountFriendshipService extends XAccountProfileService {
  //
  //#region Follow ...
  /**
   * Follow a User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public follow(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowingDto>;
  public follow(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowingDto>>;
  public follow(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowingDto>>;
  public follow(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.Follow, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return response ...
    return this.httpClient.post<XFriendshipFollowingDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Cancel ...
  /**
   * Cancel Following
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public cancel(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public cancel(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public cancel(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public cancel(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.Cancel, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return response ...
    return this.httpClient.post<boolean>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region UnFollowFollower ...
  /**
   * Unfollow a Follower
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public unFollowFollower(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<void>;
  public unFollowFollower(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<void>>;
  public unFollowFollower(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<void>>;
  public unFollowFollower(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.UnFollowFollower, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // Result ...
    return this.httpClient.post<void>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region UnFollowFollowing ...
  /**
   * Unfollow Following
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public unFollowFollowing(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<void>;
  public unFollowFollowing(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<void>>;
  public unFollowFollowing(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<void>>;
  public unFollowFollowing(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.UnFollowFollowing, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return result ...
    return this.httpClient.post<void>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Block ...
  /**
   * Block a Follower
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public block(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowingDto>;
  public block(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowingDto>>;
  public block(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowingDto>>;
  public block(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.Block, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return response ...
    return this.httpClient.post<XFriendshipFollowingDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region UnBlock ...
  /**
   * Unblock a Blocked User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public unBlock(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowingDto>;
  public unBlock(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowingDto>>;
  public unBlock(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowingDto>>;
  public unBlock(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.UnBlock, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // Resut ...
    return this.httpClient.post<XFriendshipFollowingDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region AcceptRequest ...
  /**
   * Accept a Following Request
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accept(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowerDto>;
  public accept(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowerDto>>;
  public accept(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowerDto>>;
  public accept(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.AcceptRequest, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return response ...
    return this.httpClient.post<XFriendshipFollowerDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region RejectRequest ...
  /**
   * Reject a Following Request
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public reject(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowerDto>;
  public reject(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowerDto>>;
  public reject(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowerDto>>;
  public reject(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.RejectRequest, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // Result ...
    return this.httpClient.post<XFriendshipFollowerDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region IsFollower ...
  /**
   * Check a User IsFollower of Requested User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public isFollower(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public isFollower(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public isFollower(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public isFollower(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.IsFollower, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // Return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region FollowerState ...
  /**
   * Get Follower State of a User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public followerState(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipState>;
  public followerState(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipState>>;
  public followerState(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipState>>;
  public followerState(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.FollowerState, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return response ...
    return this.httpClient.get<XFriendshipState>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Follower ...
  /**
   * Get Specific Follower
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public follower(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowerDto>;
  public follower(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowerDto>>;
  public follower(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowerDto>>;
  public follower(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.Follower, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return response ...
    return this.httpClient.get<XFriendshipFollowerDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Followers ...
  /**
   * Get Followers List Of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public followers(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<XFriendshipFollowerDto>>;
  public followers(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<XFriendshipFollowerDto>>>;
  public followers(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<XFriendshipFollowerDto>>>;
  public followers(
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
    >(XAccountEndPoint.Followers);

    //
    // return result ...
    return this.httpClient.get<Array<XFriendshipFollowerDto>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region AllFollowers ...
  /**
   * Get All Followers List Includes Blocked, Requested and etc  of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public allFollowers(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<XFriendshipFollowerDto>>;
  public allFollowers(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<XFriendshipFollowerDto>>>;
  public allFollowers(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<XFriendshipFollowerDto>>>;
  public allFollowers(
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
    >(XAccountEndPoint.AllFollowers);

    //
    // return response ...
    return this.httpClient.get<Array<XFriendshipFollowerDto>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region IsFollowing ...
  /**
   * Check a User is in Followings of Current User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public isFollowing(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public isFollowing(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public isFollowing(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public isFollowing(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.IsFollowing, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // Result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region FollowingState ...
  /**
   * Get Following State Relation between Specific User  and Current User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public followingState(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipState>;
  public followingState(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipState>>;
  public followingState(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipState>>;
  public followingState(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.FollowingState, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return result ...
    return this.httpClient.get<XFriendshipState>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Following ...
  /**
   * Get Specific Following Model
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public following(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowingDto>;
  public following(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowingDto>>;
  public following(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowingDto>>;
  public following(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.Following, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // return result ...
    return this.httpClient.get<XFriendshipFollowingDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region Followings ...
  /**
   * Get Followings of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public followings(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<XFriendshipFollowingDto>>;
  public followings(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<XFriendshipFollowingDto>>>;
  public followings(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<XFriendshipFollowingDto>>>;
  public followings(
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
    >(XAccountEndPoint.Followings);

    //
    // return result ...
    return this.httpClient.get<Array<XFriendshipFollowingDto>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region AllFollowings ...
  /**
   * Get All Following List Includes Blocked, Requested and etc  of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public allFollowings(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<XFriendshipFollowingDto>>;
  public allFollowings(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<XFriendshipFollowingDto>>>;
  public allFollowings(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<XFriendshipFollowingDto>>>;
  public allFollowings(
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
    >(XAccountEndPoint.AllFollowings);

    //
    // return response ...
    return this.httpClient.get<Array<XFriendshipFollowingDto>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region FollowingsList ...
  /**
   * Return Following UserName's List of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public followingsList(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<string>>;
  public followingsList(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<string>>>;
  public followingsList(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<string>>>;
  public followingsList(
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
    >(XAccountEndPoint.FollowingsList);

    //
    // return result ...
    return this.httpClient.get<Array<string>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region FollowersList ...
  /**
   * Return Followers UserName&#x27;s List of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public followersList(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<string>>;
  public followersList(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<string>>>;
  public followersList(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<string>>>;
  public followersList(
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
    >(XAccountEndPoint.FollowersList);

    //
    // return result ...
    return this.httpClient.get<Array<string>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion

  //
  //#region FriendshipInfo ...
  /**
   * Get Friendship Info Model between Specific User and Current User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public friendshipInfo(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipInfoDto>;
  public friendshipInfo(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipInfoDto>>;
  public friendshipInfo(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipInfoDto>>;
  public friendshipInfo(
    destUser: string,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Validate Args ...
    XValidators.validateNotEmpty(destUser);

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
    >(XAccountEndPoint.FriendshipInfo, {
      key: XAccountEndPointParam.XUserSelectByParam,
      value: destUser,
    });

    //
    // Prepare Result ...
    return this.httpClient.get<XFriendshipInfoDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
  //#endregion
}
