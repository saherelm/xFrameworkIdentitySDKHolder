import {
  XParam,
  XLocale,
  XHeaders,
  XLoggable,
  XContentType,
  XExceptionIDs,
  throwException,
  isNullOrUndefined,
  isNullOrEmptyString,
  XOneOrManyType,
  XKeyValue,
  hasChild,
} from 'x-framework-core';
import { Inject } from '@angular/core';
import {
  X_API_CONFIG,
  X_FRAMEWORK_IDENTITY_SDK_CONFIG,
} from '../tokens/x-injectable-tokens';
import { XQueryDto } from '../models/x-query.dto';
import { XLoginResponseDto } from '../models/x-login.dto';
import { XEndPoints } from '../typings/x-endpoint.typings';
import { XHttpUrlEncodingCodec } from '../providers/x-url.encoder';
import { XApiConfiguration } from '../config/x-api-service.config';
import { getAuthorizationHeaderValue } from '../constants/x-header.enum';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { XFrameworkIdentitySDKConfig } from '../config/x-framework-identity-sdk.config';
import { setParams } from '../tools/x-endpoint.tools';

export abstract class XBaseApiService extends XLoggable {
  //
  public readonly basePath: string;
  public readonly version: string;
  public readonly baseEndPointRoute: string;
  public defaultHeaders = new HttpHeaders();
  public apiConfig = new XApiConfiguration();

  constructor(
    public readonly endPoint: XEndPoints,
    protected httpClient: HttpClient,
    @Inject(X_FRAMEWORK_IDENTITY_SDK_CONFIG)
    config: XFrameworkIdentitySDKConfig,
    @Inject(X_API_CONFIG) apiConfig: XApiConfiguration
  ) {
    //
    super(config);

    //
    if (apiConfig) {
      //
      this.version = isNullOrEmptyString(apiConfig.apiVersion)
        ? null
        : apiConfig.apiVersion.replace('/', '');

      //
      const bApiPath = apiConfig.baseApiPath || config.baseUrl;
      if (isNullOrEmptyString(bApiPath)) {
        throwException(XExceptionIDs.InvalidConfiguration);
      }

      //
      this.basePath = bApiPath.endsWith('/')
        ? bApiPath.substring(0, bApiPath.length - 1)
        : bApiPath;

      //
      this.apiConfig = apiConfig;
    }

    //
    this.baseEndPointRoute = isNullOrEmptyString(this.version)
      ? `${this.basePath}/${this.endPoint}`
      : `${this.basePath}/${this.version}/${this.endPoint}`;

    //
    if (
      isNullOrUndefined(this.basePath) ||
      isNullOrUndefined(this.baseEndPointRoute)
    ) {
      throwException(XExceptionIDs.InvalidConfiguration);
    }

    //
    // Setting XPowered in Default Headers ...
    this.defaultHeaders = this.defaultHeaders.set(
      XHeaders.XPoweredBy,
      apiConfig.poweredByValue
    );
  }

  //
  //#region Actions ...

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  public canConsumeForm(consumes: string[]): boolean {
    //
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }

    //
    return false;
  }

  /**
   * adding Authentication & Authorization headers
   */
  public addAuthentication(
    headers: HttpHeaders,
    tokens?: XLoginResponseDto
  ): HttpHeaders {
    //
    // if doesn't Provide Tokens, read and apply from Configurations ...
    if (!tokens) {
      //
      // Handle Authentication (access_token) required
      if (this.apiConfig.apiKeys.Authorization) {
        headers = headers.set(
          XHeaders.Authorization,
          this.apiConfig.apiKeys.Authorization
        );
      }
    }

    //
    // if Provide Tokens read and apply from it ...
    if (tokens) {
      //
      headers = headers.set(
        XHeaders.Authorization,
        getAuthorizationHeaderValue(tokens.accessToken)
      );
    }

    //
    return headers;
  }

  /**
   * add custom header to request
   *
   * @param headers headers object
   * @param key custom header key
   * @param value custom header value
   */
  public addCustomHeader(
    headers: HttpHeaders,
    key: XParam | XHeaders | string,
    value: any
  ): HttpHeaders {
    //
    headers = headers.set(key, value);

    //
    return headers;
  }

  /**
   * add default accept selected to headers
   */
  public addAcceptJson(headers: HttpHeaders): HttpHeaders {
    //
    // to determine the Accept header
    const httpHeaderAccepts: string[] = [XContentType.AppJson];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.apiConfig.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set(XHeaders.Accept, httpHeaderAcceptSelected);
    }

    //
    return headers;
  }

  /**
   * adding application/octet-stream Accept in header ...
   *
   * @param headers the exists contents of header
   */
  public addAcceptOctetStream(headers: HttpHeaders): HttpHeaders {
    //
    // to determine the Accept header
    const httpHeaderAccepts: string[] = [XContentType.AppOctetStream];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.apiConfig.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set(XHeaders.Accept, httpHeaderAcceptSelected);
    }

    //
    return headers;
  }

  /**
   * add language to headers ...
   *
   * @param headers the source headers ...
   * @param language the specific language name ...
   */
  public addLanguageHeader(
    headers: HttpHeaders,
    language: XLocale | string
  ): HttpHeaders {
    //
    if (isNullOrEmptyString(language)) {
      return headers;
    }

    //
    return this.addCustomHeader(headers, XParam.Language, language);
  }

  /**
   * add ContentType  to headers
   */
  public addContentType(
    headers: HttpHeaders,
    consumes?: string[]
  ): HttpHeaders {
    //
    // to determine the Content-Type header
    if (!consumes) {
      consumes = [];
    }
    consumes = [...consumes, XContentType.AppJson];
    const httpContentTypeSelected:
      | string
      | undefined = this.apiConfig.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set(XHeaders.ContentType, httpContentTypeSelected);
    }

    //
    return headers;
  }

  /**
   * generate proper http params based on XQuery ...
   *
   * @param query the Qury Options ...
   */
  public generateXQueryHttpParams(query?: XQueryDto): HttpParams {
    //
    let queryParameters = new HttpParams({
      encoder: new XHttpUrlEncodingCodec(),
    });

    //
    if (query) {
      //
      if (!isNullOrEmptyString(query.filter)) {
        queryParameters = queryParameters.set(
          XParam.Filter,
          query.filter as string
        );
      }

      //
      if (!isNullOrUndefined(query.containsDetail)) {
        queryParameters = queryParameters.set(
          XParam.ContainsDetail,
          query.containsDetail.toString()
        );
      }

      //
      if (!isNullOrUndefined(query.enableTracking)) {
        queryParameters = queryParameters.set(
          XParam.EnableTracking,
          query.enableTracking.toString()
        );
      }

      //
      if (!isNullOrEmptyString(query.sortBy)) {
        queryParameters = queryParameters.set(
          XParam.SortBy,
          query.sortBy as string
        );
      }

      //
      if (!isNullOrUndefined(query.isAscending)) {
        queryParameters = queryParameters.set(
          XParam.IsAscending,
          query.isAscending.toString()
        );
      }

      //
      if (!isNullOrUndefined(query.page)) {
        queryParameters = queryParameters.set(
          XParam.Page,
          query.page.toString()
        );
      }

      //
      if (!isNullOrUndefined(query.pageSize)) {
        queryParameters = queryParameters.set(
          XParam.PageSize,
          query.pageSize.toString()
        );
      }
    }

    //
    return queryParameters;
  }

  /**
   * add specific language param to an existings params collection ...
   *
   * @param params the exists params ...
   * @param languae the specific language value ...
   */
  public addLanguageQueryParam(
    params?: HttpParams,
    languae?: XLocale | string
  ): HttpParams {
    //
    if (!params) {
      //
      params = new HttpParams({
        encoder: new XHttpUrlEncodingCodec(),
      });
    }

    //
    if (isNullOrEmptyString(languae)) {
      return params;
    }

    //
    params = params.set(XParam.Language, languae);

    //
    return params;
  }

  /**
   * generate containsDetail Http Param ...
   *
   * @param containsDetail the param value ...
   */
  public generateContainsDetailHttpParam(containsDetail: boolean): HttpParams {
    //
    let queryParameters = new HttpParams({
      encoder: new XHttpUrlEncodingCodec(),
    });
    if (containsDetail) {
      queryParameters = queryParameters.set(
        XParam.ContainsDetail,
        containsDetail.toString()
      );
    }

    //
    return queryParameters;
  }

  /**
   * generate and retrieve language http param ...
   *
   * @param language the specific language
   */
  public generateLanguageHttpParam(language: XLocale | string): HttpParams {
    //
    let result = new HttpParams({
      encoder: new XHttpUrlEncodingCodec(),
    });

    //
    if (!isNullOrEmptyString(language)) {
      result = result.set(XParam.Language, language);
    }

    //
    return result;
  }

  /**
   * retrieve specific Action Route
   * @param action the specified Action endpoint
   * @returns complete action route contains route params
   */
  public getActionRoute<T, TParams>(
    action: T,
    params?: XOneOrManyType<XKeyValue<TParams, string>>
  ) {
    //
    if (isNullOrEmptyString(String(action))) {
      return this.baseEndPointRoute;
    }

    //
    let result = `${this.baseEndPointRoute}/${String(action)}`;
    if (!hasChild(params)) {
      return result;
    }

    //
    result = setParams(result, params);
    return result;
  }
  //#endregion
}
