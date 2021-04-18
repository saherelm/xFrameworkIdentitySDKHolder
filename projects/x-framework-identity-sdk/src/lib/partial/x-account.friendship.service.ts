import { Observable } from 'rxjs';
import {
  XFriendshipState,
  XFriendshipInfoDto,
  XFriendshipFollowerDto,
  XFriendshipFollowingDto,
} from '../models/x-friendship.dto';
import { XValidators } from 'x-framework-core';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { XAccountAuthenticationService } from './x-account.authentication.service';

export abstract class XAccountFriendshipService extends XAccountAuthenticationService {
  /**
   * Accept a Following Request
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsAcceptRequest(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowerDto>;
  public accountsAcceptRequest(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowerDto>>;
  public accountsAcceptRequest(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowerDto>>;
  public accountsAcceptRequest(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/AcceptRequest`;

    //
    // return response ...
    return this.httpClient.post<XFriendshipFollowerDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get All Followers List Includes Blocked, Requested and etc  of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsAllFollowers(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<XFriendshipFollowerDto>>;
  public accountsAllFollowers(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<XFriendshipFollowerDto>>>;
  public accountsAllFollowers(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<XFriendshipFollowerDto>>>;
  public accountsAllFollowers(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/AllFollowers`;

    //
    // return response ...
    return this.httpClient.get<Array<XFriendshipFollowerDto>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get All Following List Includes Blocked, Requested and etc  of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsAllFollowings(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<XFriendshipFollowingDto>>;
  public accountsAllFollowings(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<XFriendshipFollowingDto>>>;
  public accountsAllFollowings(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<XFriendshipFollowingDto>>>;
  public accountsAllFollowings(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/AllFollowings`;

    //
    // return response ...
    return this.httpClient.get<Array<XFriendshipFollowerDto>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Block a Follower
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsBlock(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowingDto>;
  public accountsBlock(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowingDto>>;
  public accountsBlock(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowingDto>>;
  public accountsBlock(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/Block`;

    //
    // return response ...
    return this.httpClient.post<XFriendshipFollowingDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Cancel Following
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsCancel(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsCancel(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsCancel(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsCancel(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/Cancel`;

    //
    // return response ...
    return this.httpClient.post<boolean>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Follow a User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollow(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowingDto>;
  public accountsFollow(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowingDto>>;
  public accountsFollow(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowingDto>>;
  public accountsFollow(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/Follow`;

    //
    // return response ...
    return this.httpClient.post<XFriendshipFollowingDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get Specific Follower
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollower(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowerDto>;
  public accountsFollower(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowerDto>>;
  public accountsFollower(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowerDto>>;
  public accountsFollower(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/Follower`;

    //
    // return response ...
    return this.httpClient.get<XFriendshipFollowerDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get Follower State of a User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollowerState(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipState>;
  public accountsFollowerState(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipState>>;
  public accountsFollowerState(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipState>>;
  public accountsFollowerState(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/FollowerState`;

    //
    // return response ...
    return this.httpClient.get<XFriendshipState>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get Followers List Of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollowers(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<XFriendshipFollowerDto>>;
  public accountsFollowers(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<XFriendshipFollowerDto>>>;
  public accountsFollowers(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<XFriendshipFollowerDto>>>;
  public accountsFollowers(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/Followers`;

    //
    // return result ...
    return this.httpClient.get<Array<XFriendshipFollowerDto>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Return Followers UserName&#x27;s List of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollowersList(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<string>>;
  public accountsFollowersList(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<string>>>;
  public accountsFollowersList(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<string>>>;
  public accountsFollowersList(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/FollowersList`;

    //
    // return result ...
    return this.httpClient.get<Array<string>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get Specific Following Model
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollowing(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowingDto>;
  public accountsFollowing(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowingDto>>;
  public accountsFollowing(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowingDto>>;
  public accountsFollowing(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/Following`;

    //
    // return result ...
    return this.httpClient.get<XFriendshipFollowingDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get Following State Relation between Specific User  and Current User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollowingState(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipState>;
  public accountsFollowingState(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipState>>;
  public accountsFollowingState(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipState>>;
  public accountsFollowingState(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/FollowingState`;

    //
    // return result ...
    return this.httpClient.get<XFriendshipState>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get Followings of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollowings(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<XFriendshipFollowingDto>>;
  public accountsFollowings(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<XFriendshipFollowingDto>>>;
  public accountsFollowings(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<XFriendshipFollowingDto>>>;
  public accountsFollowings(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/Followings`;

    //
    // return result ...
    return this.httpClient.get<Array<XFriendshipFollowingDto>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Return Following UserName's List of Current User
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFollowingsList(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Array<string>>;
  public accountsFollowingsList(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Array<string>>>;
  public accountsFollowingsList(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Array<string>>>;
  public accountsFollowingsList(
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAuthentication(headers);
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = `${this.baseEndPointRoute}/FollowingsList`;

    //
    // return result ...
    return this.httpClient.get<Array<string>>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Check a User IsFollower of Requested User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsIsFollower(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsIsFollower(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsIsFollower(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsIsFollower(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/IsFollower`;

    //
    // Return result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Check a User is in Followings of Current User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsIsFollowing(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<boolean>;
  public accountsIsFollowing(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<boolean>>;
  public accountsIsFollowing(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<boolean>>;
  public accountsIsFollowing(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/IsFollowing`;

    //
    // Result ...
    return this.httpClient.get<boolean>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Reject a Following Request
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsRejectRequest(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowerDto>;
  public accountsRejectRequest(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowerDto>>;
  public accountsRejectRequest(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowerDto>>;
  public accountsRejectRequest(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/RejectRequest`;

    //
    // Result ...
    return this.httpClient.post<XFriendshipFollowerDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Unblock a Blocked User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsUnBlock(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipFollowingDto>;
  public accountsUnBlock(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipFollowingDto>>;
  public accountsUnBlock(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipFollowingDto>>;
  public accountsUnBlock(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/UnBlock`;

    //
    // Resut ...
    return this.httpClient.post<XFriendshipFollowingDto>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Unfollow a Follower
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsUnFollowFollower(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public accountsUnFollowFollower(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public accountsUnFollowFollower(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public accountsUnFollowFollower(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/UnFollowFollower`;

    //
    // Result ...
    return this.httpClient.post<Blob>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Unfollow Following
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsUnFollowFollowing(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Blob>;
  public accountsUnFollowFollowing(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Blob>>;
  public accountsUnFollowFollowing(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Blob>>;
  public accountsUnFollowFollowing(
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
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/UnFollowFollowing`;

    //
    // return result ...
    return this.httpClient.post<Blob>(endPointPath, null, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }

  /**
   * Get Friendship Info Model between Specific User and Current User
   *
   * @param destUser selected dest User
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public accountsFriendshipInfo(
    destUser: string,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<XFriendshipInfoDto>;
  public accountsFriendshipInfo(
    destUser: string,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<XFriendshipInfoDto>>;
  public accountsFriendshipInfo(
    destUser: string,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<XFriendshipInfoDto>>;
  public accountsFriendshipInfo(
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
    // Prepare Url ...
    const endPointPath = `${this.baseEndPointRoute}/${encodeURIComponent(
      String(destUser)
    )}/FriendshipInfo`;

    //
    // Prepare Result ...
    return this.httpClient.get<XFriendshipInfoDto>(endPointPath, {
      withCredentials: this.apiConfig.withCredentials,
      headers,
      observe,
      reportProgress,
    });
  }
}
