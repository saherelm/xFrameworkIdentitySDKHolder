import {
  keys,
  getKeys,
  hasChild,
  fromJson,
  getArrayOf,
  XValidators,
  XExceptionIDs,
  throwException,
  toNormalString,
  isNullOrUndefined,
  isNullOrEmptyString,
} from 'x-framework-core';
import { map } from 'rxjs/operators';
import {
  XAccountState,
  XUserAccountInfo,
  XUserAccountInfoIndex,
} from '../typings/x-account.typings';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  X_API_CONFIG,
  X_FRAMEWORK_IDENTITY_SDK_CONFIG,
} from '../tokens/x-injectable-tokens';
import {
  XAccountEndPoint,
  XAccountEndPointParam,
} from './../typings/x-endpoint.typings';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { XManagerService } from 'x-framework-services';
import { XUserProfileDto } from '../models/x-user.dto';
import { XBaseApiService } from '../base/x-base-api.service';
import { XAccountStorageKeys } from '../constants/x-account.keys';
import { XApiConfiguration } from '../config/x-api-service.config';
import { validateUserAccountInfo } from '../helpers/x-account.helper';
import { XLoginResponseDto, XTokenResponseDto } from '../models/x-login.dto';
import { XFrameworkIdentitySDKConfig } from '../config/x-framework-identity-sdk.config';

export abstract class XAccountBaseService extends XBaseApiService {
  //
  stateSnapshot: XAccountState;
  state$ = new BehaviorSubject<XAccountState>(null);

  //
  //#region Constructor ...
  constructor(
    protected router: Router,
    protected httpClient: HttpClient,
    @Inject(X_FRAMEWORK_IDENTITY_SDK_CONFIG)
    config: XFrameworkIdentitySDKConfig,
    @Inject(X_API_CONFIG) configuration: XApiConfiguration,
    protected managerService: XManagerService
  ) {
    //
    super('Account', httpClient, config, configuration);

    //
    // handle initial state
    this.currentState().then((state) => {
      this.state$.next(state);
    });
  }
  //#endregion

  //
  //#region Service Actions ...
  /**
   *
   * @returns string message ...
   */
  public hi(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.Hi);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   *
   * @returns string message ...
   */
  public passRequireXPowered(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.PassRequireXPowered);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * API Read Scope
   * @returns string message ...
   */
  public passReadAccess(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.PassReadAccess);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * API Write Scope
   * @returns string message ...
   */
  public passWriteAccess(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.PassWriteAccess);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * API Admin Scope
   * @returns string message ...
   */
  public passAdminAccess(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.PassAdminAccess);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * API Manage Scop
   * @returns string message ...
   */
  public passManageAccess(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.PassManageAccess);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Action which returns a List of Authenticated User Claims
   * @returns string message which represent current user's claims ...
   */
  public hiClaims(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiClaims);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiUser(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiUser);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiEnabledUser(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiEnabledUser);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiElite(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiElite);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiEnabledElite(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiEnabledElite);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiReporter(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiReporter);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiEnabledReporter(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiEnabledReporter);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiActuary(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiActuary);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiEnabledActuary(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiEnabledActuary);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiChiefActuary(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiChiefActuary);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiEnabledChiefActuary(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiEnabledChiefActuary);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiAdmin(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiAdmin);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }

  /**
   * a simple Hello User for Checking Authentication and Policy
   * @returns string message which contains authenticated user name ...
   */
  public hiEnabledAdmin(): Observable<string> {
    //
    // Instantiiate Headers from Default Headers ...
    let headers = this.defaultHeaders;
    headers = this.addAcceptJson(headers);
    headers = this.addAuthentication(headers);

    //
    const endPointPath = this.getActionRoute<
      XAccountEndPoint,
      XAccountEndPointParam
    >(XAccountEndPoint.HiEnabledAdmin);

    //
    // return result ...
    return this.httpClient
      .get<string>(endPointPath, {
        withCredentials: this.apiConfig.withCredentials,
        headers,
        observe: 'body',
        reportProgress: false,
      })
      .pipe(map((res) => fromJson<string>(res)));
  }
  //#endregion

  //
  //#region Account Handler ...
  /**
   * retrieve current user tokens ...
   *
   * @returns an instance of XTokenResponse
   */
  public retrieveTokens(): XTokenResponseDto {
    //
    if (isNullOrUndefined(this.stateSnapshot)) {
      return null;
    }

    //
    const result: XTokenResponseDto = {
      accessToken: this.stateSnapshot.accessToken,
      refreshToken: this.stateSnapshot.refreshToken,
      expiresAt: this.stateSnapshot.expiresAt,
    };

    //
    return result;
  }

  /**
   * reNew Account State ...
   */
  public async reNewState(state?: XAccountState): Promise<void> {
    //
    const currState = await this.currentState();
    this.state$.next({
      ...currState,
      ...state,
    });
  }

  /**
   * retrieve current Account State ...
   */
  public async currentState(): Promise<XAccountState> {
    //
    let isLoggedIn = false;
    let defaultUser = await this.getDefaultUser();
    if (!defaultUser) {
      //
      // Making Default State
      defaultUser = {
        userSelectBy: '',
        accessToken: '',
        refreshToken: '',
        expiresAt: -1,
        profile: null,
      };
    } else {
      isLoggedIn = true;
    }

    //
    const mCurrentState = {
      isLoggedIn,
      ...defaultUser,
    } as XAccountState;
    this.stateSnapshot = mCurrentState;

    //
    return mCurrentState;
  }

  /**
   * Validate Token Responses with recieved revision ...
   *
   * @param model the model which going to validate
   * @param revision the recieved revision
   */
  public validateLoginResponseRevision(
    model: XLoginResponseDto,
    revision: string
  ): boolean {
    //
    const source =
      model.accessToken +
      this.apiConfig.revisionSecretKey +
      model.refreshToken +
      this.apiConfig.revisionSecretKey +
      model.expiresAt.toString();

    //
    return !isNullOrUndefined(model) &&
      !isNullOrEmptyString(revision) &&
      !isNullOrEmptyString(model.accessToken) &&
      !isNullOrEmptyString(model.refreshToken) &&
      model.expiresAt > -1
      ? this.managerService.securityService.toMd5(source) === revision
      : false;
  }

  //
  //#region IsLoggedIn ...
  public async isLoggedIn(): Promise<boolean> {
    //
    const defId = await this.getDefaultUserIdentifier();

    //
    return !isNullOrEmptyString(defId);
  }

  public async isExpired(): Promise<boolean> {
    //
    const defaultUser = await this.getDefaultUser();
    if (!defaultUser) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    let expiredAt = defaultUser.expiresAt;
    const currentDate = new Date().getTime();

    //
    // Fix different length ...
    const expiredAtStr = expiredAt.toString();
    const currentDateStr = currentDate.toString();
    const lengthDiff = currentDateStr.length - expiredAtStr.length;
    if (lengthDiff > 0) {
      expiredAt = expiredAt * Math.pow(10, lengthDiff);
    }

    //
    return currentDate >= expiredAt;
  }
  //#endregion

  //
  //#region Account Info Handlers ...
  /**
   * check a User Accounts Exists or not ...
   *
   * @param userSelectBy user identifier
   */
  public async hasUserAccount(userSelectBy: string): Promise<boolean> {
    //
    XValidators.validateNotEmpty(userSelectBy);

    //
    userSelectBy = toNormalString(userSelectBy);

    //
    const accounts = await this.getAccounts();
    if (!accounts) {
      return false;
    }

    //
    const userIdentifiers = keys(accounts);
    if (!hasChild(userIdentifiers)) {
      return false;
    }

    //
    const result =
      userIdentifiers.findIndex((i) => toNormalString(i) === userSelectBy) > -1;

    //
    return result;
  }

  /**
   * retrieve specific user account
   *
   * @param userSelectBy user identifier
   */
  public async getUserAccount(userSelectBy: string): Promise<XUserAccountInfo> {
    //
    XValidators.validateNotEmpty(userSelectBy);

    //
    userSelectBy = toNormalString(userSelectBy);

    //
    const isExists = await this.hasUserAccount(userSelectBy);
    if (!isExists) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    const accounts = await this.getAccountsAsArray();
    if (!hasChild(accounts)) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    const result = accounts.find(
      (a) => toNormalString(a.userSelectBy) === userSelectBy
    );

    //
    return result;
  }

  /**
   * Retrieve user info by it's token's ...
   *
   * @param info the user tokens info
   */
  public async getUserByToken(
    info: XLoginResponseDto
  ): Promise<XUserAccountInfo> {
    //
    const accounts = await this.getAccountsAsArray();
    if (!hasChild(accounts)) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    const account = accounts.find(
      (a) =>
        a.accessToken === info.accessToken &&
        a.refreshToken === info.refreshToken &&
        a.expiresAt === info.expiresAt
    );
    if (!accounts) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    return account;
  }

  /**
   * add new user account ...
   *
   * @param userSelectBy user identifier
   * @param accountInfo user logged in account info
   */
  public async addUserAccount(
    userSelectBy: string,
    accountInfo: XUserAccountInfo,
    setAsDefault?: boolean
  ): Promise<void> {
    //
    XValidators.validateNotEmpty(userSelectBy);
    validateUserAccountInfo(accountInfo);

    //
    const isExists = await this.hasUserAccount(userSelectBy);
    if (isExists) {
      throwException(XExceptionIDs.Duplicate);
    }

    //
    const numOfAccounts = await this.countAccounts();
    if (numOfAccounts === 0) {
      setAsDefault = true;
    }

    //
    const accounts = await this.getAccounts();
    accounts[userSelectBy] = accountInfo;
    await this.updateAccounts(accounts);

    //
    if (setAsDefault) {
      await this.setDefaultUser(userSelectBy);
    }

    //
    await this.reNewState();
  }

  /**
   * update exists user account info ...
   *
   * @param userSelectBy user identifier
   * @param accountInfo user logged in account info
   */
  public async updateUserAccount(
    userSelectBy: string,
    accountInfo: XUserAccountInfo,
    setAsDefault?: boolean
  ): Promise<void> {
    //
    XValidators.validateNotEmpty(userSelectBy);
    validateUserAccountInfo(accountInfo);

    //
    const isExists = await this.hasUserAccount(userSelectBy);
    if (!isExists) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    const accounts = await this.getAccounts();
    accounts[userSelectBy] = accountInfo;
    await this.updateAccounts(accounts);

    //
    if (setAsDefault) {
      await this.setDefaultUser(userSelectBy);
    }

    //
    await this.reNewState();
  }

  public async updateUserProfile(profile: XUserProfileDto): Promise<void> {
    //
    XValidators.validateNotNull(profile);

    //
    const defaultUser = await this.getDefaultUser();
    if (
      !defaultUser ||
      (defaultUser && !defaultUser.profile) ||
      (defaultUser &&
        defaultUser.profile &&
        defaultUser.profile.userId !== profile.userId)
    ) {
      return;
    }

    //
    defaultUser.profile = profile;
    await this.addOrUpdateUserAccount(defaultUser.userSelectBy, defaultUser);
  }

  /**
   * add new/ update exists user account ...
   *
   * @param userSelectBy user identifier
   * @param accountInfo user logged in account info
   */
  public async addOrUpdateUserAccount(
    userSelectBy: string,
    accountInfo: XUserAccountInfo,
    setAsDefault?: boolean
  ): Promise<void> {
    //
    XValidators.validateNotEmpty(userSelectBy);
    validateUserAccountInfo(accountInfo);

    //
    const isExists = await this.hasUserAccount(userSelectBy);
    if (!isExists) {
      await this.addUserAccount(userSelectBy, accountInfo, setAsDefault);
    } else {
      await this.updateUserAccount(userSelectBy, accountInfo, setAsDefault);
    }

    //
    await this.reNewState();
  }

  /**
   * Update User's Refreshed Token ...
   *
   * @param oldInfo user's old token's info ...
   * @param newInfo new user's token info which returned after token refreshing ...
   */
  public async updateUserTokens(
    oldInfo: XLoginResponseDto,
    newInfo: XTokenResponseDto
  ): Promise<void>;
  public async updateUserTokens(
    oldInfo: XLoginResponseDto,
    newInfo: XLoginResponseDto
  ): Promise<void> {
    //
    const count = await this.countAccounts();
    if (count === 0) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    const accounts = await this.getAccountsAsArray();

    //
    const account = accounts.find(
      (a) =>
        a.accessToken === oldInfo.accessToken &&
        a.refreshToken === oldInfo.refreshToken &&
        a.expiresAt === oldInfo.expiresAt
    );
    if (!account) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    account.accessToken = newInfo.accessToken;
    account.refreshToken = newInfo.refreshToken;
    account.expiresAt = newInfo.expiresAt;

    //
    await this.updateUserAccount(account.userSelectBy, account);
    await this.reNewState();
  }

  /**
   * remove exists user account ...
   *
   * @param userSelectBy user identifier
   */
  public async removeUserAccount(userSelectBy: string): Promise<void> {
    //
    XValidators.validateNotEmpty(userSelectBy);

    //
    userSelectBy = toNormalString(userSelectBy);

    //
    const isExists = await this.hasUserAccount(userSelectBy);
    if (!isExists) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    const accounts = await this.getAccountsAsArray();
    const updatedAccounts = accounts.filter(
      (a) => toNormalString(a.userSelectBy) !== userSelectBy
    );

    //
    const isDefaultUser = await this.isDefaultUser(userSelectBy);
    if (isDefaultUser) {
      await this.removeDefaultUser();
      await this.reNewState();
    }

    //
    const updateAcountIndex: XUserAccountInfoIndex = {};
    updatedAccounts.forEach((a) => {
      updateAcountIndex[a.userSelectBy] = a;
    });

    //
    await this.updateAccounts(updateAcountIndex);
  }

  /**
   * Check a User Identifier is Defualt User or not
   */
  public async isDefaultUser(userSelectBy: string): Promise<boolean> {
    //
    XValidators.validateNotEmpty(userSelectBy);

    //
    userSelectBy = toNormalString(userSelectBy);

    //
    const defId = await this.getDefaultUserIdentifier();
    if (isNullOrEmptyString(defId)) {
      return false;
    }

    //
    const result = toNormalString(defId) === userSelectBy;

    //
    return result;
  }

  /**
   * read default user account identifier ...
   */
  public async getDefaultUserIdentifier(): Promise<string> {
    //
    const result = this.managerService.secureStorageService.readOfType<string>(
      XAccountStorageKeys.DefaultUser,
      false
    );

    //
    return result;
  }

  /**
   * retrieve default user account info
   */
  public async getDefaultUser(): Promise<XUserAccountInfo> {
    //
    const defaultUserIdentifier = await this.getDefaultUserIdentifier();
    if (isNullOrEmptyString(defaultUserIdentifier)) {
      return null;
    }

    //
    const result = await this.getUserAccount(defaultUserIdentifier);

    //
    return result;
  }

  public async getDefaultUserTokens(): Promise<XLoginResponseDto> {
    //
    const defaultUser = await this.getDefaultUser();
    if (!defaultUser) {
      throwException(XExceptionIDs.NotFound);
    } else {
      //
      const result: XLoginResponseDto = {
        accessToken: defaultUser.accessToken,
        refreshToken: defaultUser.refreshToken,
        expiresAt: defaultUser.expiresAt,
        profile: defaultUser.profile,
      };

      //
      return result;
    }
  }

  /**
   * set a user as default user ...
   *
   * @param userSelectBy user identifier
   */
  public async setDefaultUser(userSelectBy: string): Promise<void> {
    //
    XValidators.validateNotEmpty(userSelectBy);

    //
    const isExists = await this.hasUserAccount(userSelectBy);
    if (!isExists) {
      throwException(XExceptionIDs.NotFound);
    }

    //
    this.managerService.secureStorageService.write(
      XAccountStorageKeys.DefaultUser,
      userSelectBy,
      true
    );

    //
    await this.reNewState();
  }

  /**
   * Remove default user account
   */
  public async removeDefaultUser(forceRemoveUser?: boolean): Promise<void> {
    //
    const defId = await this.getDefaultUserIdentifier();
    if (isNullOrEmptyString(defId)) {
      return;
    }

    //
    this.managerService.secureStorageService.remove(
      XAccountStorageKeys.DefaultUser,
      false
    );

    //
    if (forceRemoveUser) {
      const isExists = await this.hasUserAccount(defId);
      if (isExists) {
        await this.removeUserAccount(defId);
      }
    }

    //
    const accounts = await this.getAccountsAsArray();
    if (hasChild(accounts)) {
      await this.setDefaultUser(accounts[0].userSelectBy);
    }

    //
    await this.reNewState();
  }

  /**
   * count all exists accounts
   */
  public async countAccounts(): Promise<number> {
    //
    const accounts = await this.getAccountsAsArray();

    //
    let result = 0;
    if (!hasChild(accounts)) {
      return result;
    }

    //
    result = accounts.length;
    return result;
  }

  /**
   * retrieve all exists accounts
   */
  public async getAccounts(): Promise<XUserAccountInfoIndex> {
    //
    const result =
      this.managerService.secureStorageService.readOfType<XUserAccountInfoIndex>(
        XAccountStorageKeys.UserInfos,
        false
      ) || {};

    //
    return result;
  }

  /**
   * update user Accounts ...
   *
   * @param model updated Accounts
   */
  public async updateAccounts(model: XUserAccountInfoIndex): Promise<void> {
    //
    XValidators.validateNotNull(model);

    //
    await this.removeAccounts();

    //
    this.managerService.secureStorageService.write(
      XAccountStorageKeys.UserInfos,
      model,
      true
    );
  }

  /**
   * get user accounts info as Array
   */
  public async getAccountsAsArray(): Promise<XUserAccountInfo[]> {
    //
    const accounts = await this.getAccounts();
    const result = getArrayOf(accounts) || [];

    //
    return result;
  }

  /**
   * Remove All user Accounts
   */
  public async removeAccounts(forceReNewState?: boolean): Promise<void> {
    //
    this.managerService.secureStorageService.remove(
      XAccountStorageKeys.UserInfos,
      false
    );

    //
    if (forceReNewState) {
      await this.reNewState();
    }
  }

  /**
   * reset All Account Infos
   */
  public async resetAccounts(): Promise<void> {
    //
    const storageKeys = getKeys(XAccountStorageKeys);

    //
    storageKeys.forEach((k) => {
      this.managerService.secureStorageService.remove(k, false);
    });

    //
    await this.reNewState();
  }
  //#endregion
  //#endregion
}
