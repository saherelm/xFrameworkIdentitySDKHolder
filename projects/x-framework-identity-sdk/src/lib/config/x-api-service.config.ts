import {
  XApiHeader,
  getAuthorizationHeaderValue
} from '../constants/x-header.enum';
import { isNullOrUndefined } from 'x-framework-core';
import { XUserAccountInfo } from '../typings/x-account.typings';

export interface XApiConfigurationParameters {
  apiKeys?: { [key: string]: string };
  username?: string;
  password?: string;
  accessToken?: string | (() => string);
  baseApiPath?: string;
  apiVersion?: string;
  apiIdentifier?: string;
  withCredentials?: boolean;
  poweredByValue?: string;
  revisionSecretKey?: string;
  pushServiceRoute?: string;
  pushManagerReconnectDelay?: number;
}

export class XApiConfiguration {
  apiKeys?: { [key: string]: string };
  username?: string;
  password?: string;
  accessToken?: string | (() => string);
  baseApiPath?: string;
  apiVersion?: string;
  apiIdentifier?: string;
  withCredentials?: boolean;
  poweredByValue?: string;
  revisionSecretKey?: string;
  pushServiceRoute?: string;
  pushManagerReconnectDelay?: number;

  constructor(configurationParameters: XApiConfigurationParameters = {}) {
    this.apiKeys = configurationParameters.apiKeys;
    this.username = configurationParameters.username;
    this.password = configurationParameters.password;
    this.accessToken = configurationParameters.accessToken;
    this.baseApiPath = configurationParameters.baseApiPath;
    this.apiVersion = configurationParameters.apiVersion;
    this.apiIdentifier = configurationParameters.apiIdentifier;
    this.withCredentials = configurationParameters.withCredentials;
    this.poweredByValue = configurationParameters.poweredByValue;
    this.revisionSecretKey = configurationParameters.revisionSecretKey;

    this.pushServiceRoute = configurationParameters.pushServiceRoute;
    this.pushManagerReconnectDelay =
      configurationParameters.pushManagerReconnectDelay;
  }

  /**
   * Select the correct content-type to use for a request.
   * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
   * If no content type is found return the first found type if the contentTypes is not empty
   * @param contentTypes - the array of content types that are available for selection
   * @returns the selected content-type or <code>undefined</code> if no selection could be made.
   */
  public selectHeaderContentType(contentTypes: string[]): string | undefined {
    if (contentTypes.length === 0) {
      return undefined;
    }

    const type = contentTypes.find(x => this.isJsonMime(x));
    if (type === undefined) {
      return contentTypes[0];
    }
    return type;
  }

  /**
   * Select the correct accept content-type to use for a request.
   * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
   * If no content type is found return the first found type if the contentTypes is not empty
   * @param accepts - the array of content types that are available for selection.
   * @returns the selected content-type or <code>undefined</code> if no selection could be made.
   */
  public selectHeaderAccept(accepts: string[]): string | undefined {
    if (accepts.length === 0) {
      return undefined;
    }

    const type = accepts.find(x => this.isJsonMime(x));
    if (type === undefined) {
      return accepts[0];
    }
    return type;
  }

  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp(
      '^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$',
      'i'
    );
    return (
      mime != null &&
      (jsonMime.test(mime) ||
        mime.toLowerCase() === 'application/json-patch+json')
    );
  }

  /**
   * when a User LoggedIn, the User Info must passed to this object
   * for using to add authentication in services ...
   *
   * @param userAccount loggedIn user info
   */
  public async setUserAccount(userAccount: XUserAccountInfo): Promise<void> {
    //
    // Fill Empty Values to user Account if it' null ...
    // this is used for clearing stored data on logout event ...
    if (isNullOrUndefined(userAccount)) {
      userAccount = {
        userSelectBy: '',
        accessToken: '',
        refreshToken: '',
        expiresAt: -1,
        profile: null
      };
    }

    //
    this.accessToken = userAccount.accessToken;
    this.username = userAccount.userSelectBy;

    //
    if (!this.apiKeys) {
      this.apiKeys = {};
    }

    //
    this.apiKeys[XApiHeader.ExpiresAt] = userAccount.expiresAt
      ? userAccount.expiresAt.toString()
      : '-1';
    this.apiKeys[XApiHeader.RefreshToken] = userAccount.refreshToken;
    this.apiKeys[XApiHeader.Authorization] = getAuthorizationHeaderValue(
      userAccount.accessToken
    );
  }
}

export const COLLECTION_FORMATS = {
  csv: ',',
  tsv: '   ',
  ssv: ' ',
  pipes: '|'
};
