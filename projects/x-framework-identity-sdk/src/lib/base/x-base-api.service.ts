import {
  XParam,
  XLocale,
  XHeaders,
  hasChild,
  XLoggable,
  XKeyValue,
  XContentType,
  XExceptionIDs,
  XOneOrManyType,
  throwException,
  isNullOrUndefined,
  isNullOrEmptyString,
  toXString,
} from 'x-framework-core';
import { Inject } from '@angular/core';
import {
  X_API_CONFIG,
  X_FRAMEWORK_IDENTITY_SDK_CONFIG,
} from '../tokens/x-injectable-tokens';
import { XQueryDto } from '../models/x-query.dto';
import { setParams } from '../tools/x-endpoint.tools';
import { XEndPoints } from '../typings/x-endpoint.typings';
import { XHttpUrlEncodingCodec } from '../providers/x-url.encoder';
import { XApiConfiguration } from '../config/x-api-service.config';
import { getAuthorizationHeaderValue } from '../constants/x-header.enum';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { XLoginResponseDto, XTokenResponseDto } from '../models/x-login.dto';
import { XFrameworkIdentitySDKConfig } from '../config/x-framework-identity-sdk.config';
import { XPageRequestDto } from '../models/x-page.dto';

export abstract class XBaseApiService extends XLoggable {
  //
  public readonly basePath: string;
  public readonly version: string;
  public readonly baseEndPointRoute: string;
  public defaultHeaders = new HttpHeaders();
  public apiConfig = new XApiConfiguration();

  constructor(
    public readonly endPoint: XEndPoints,
    public readonly applyApiIdentifier: boolean = false,
    public readonly applyApiVersion: boolean = false,
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
      this.version = '';
      if (applyApiVersion) {
        this.version = isNullOrEmptyString(apiConfig.apiVersion)
          ? null
          : apiConfig.apiVersion.replace('/', '');
      }

      //
      let bApiPath = apiConfig.baseApiPath || config.baseUrl;
      if (isNullOrEmptyString(bApiPath)) {
        throwException(XExceptionIDs.InvalidConfiguration);
      }

      //
      bApiPath = bApiPath.endsWith('/')
        ? bApiPath.substring(0, bApiPath.length - 1)
        : bApiPath;

      //
      // Check Api Identifier ...
      if (applyApiIdentifier) {
        const apiIdentifier = config.apiIdentifier || apiConfig.apiIdentifier;
        if (!isNullOrEmptyString(apiIdentifier)) {
          bApiPath = `${bApiPath}/${apiIdentifier}`;
        }
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
    tokens?: XTokenResponseDto
  ): HttpHeaders;
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
      // Access Token ...
      if (!isNullOrEmptyString(tokens.accessToken)) {
        headers = headers.set(
          XHeaders.Authorization,
          getAuthorizationHeaderValue(tokens.accessToken)
        );
      }

      //
      // Refresh Token ...
      if (!isNullOrEmptyString(tokens.refreshToken)) {
        headers = headers.set(XHeaders.RefreshToken, tokens.refreshToken);
      }

      //
      // Expired At ...
      if (!isNullOrUndefined(tokens.expiresAt)) {
        headers = headers.set(XHeaders.ExpiresAt, tokens.expiresAt.toString());
      }
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
    const httpHeaderAcceptSelected: string | undefined =
      this.apiConfig.selectHeaderAccept(httpHeaderAccepts);
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
    const httpHeaderAcceptSelected: string | undefined =
      this.apiConfig.selectHeaderAccept(httpHeaderAccepts);
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
    const httpContentTypeSelected: string | undefined =
      this.apiConfig.selectHeaderContentType(consumes);
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
    let result = new HttpParams({
      encoder: new XHttpUrlEncodingCodec(),
    });

    //
    if (query) {
      //
      // Filter ...
      if (!isNullOrEmptyString(query.filter)) {
        result = result.set(XParam.Filter, query.filter as string);
      }

      //
      // ContainsDetail ...
      if (!isNullOrUndefined(query.containsDetail)) {
        result = result.set(
          XParam.ContainsDetail,
          toXString(query.containsDetail)
        );
      }

      //
      // EnableTracking ...
      if (!isNullOrUndefined(query.enableTracking)) {
        result = result.set(
          XParam.EnableTracking,
          toXString(query.enableTracking)
        );
      }

      //
      // SortBy ...
      if (!isNullOrEmptyString(query.sortBy)) {
        result = result.set(XParam.SortBy, toXString(query.sortBy));
      }

      //
      // IsAscending ...
      if (!isNullOrUndefined(query.isAscending)) {
        result = result.set(XParam.IsAscending, toXString(query.isAscending));
      }

      //
      // Page ...
      if (!isNullOrUndefined(query.page)) {
        result = result.set(XParam.Page, toXString(query.page));
      }

      //
      // PageSize ...
      if (!isNullOrUndefined(query.pageSize)) {
        result = result.set(XParam.PageSize, toXString(query.pageSize));
      }
    }

    //
    return result;
  }

  /**
   * generate proper http params based on RequestPage ...
   *
   * @param request the RequestPage Options ...
   */
  public generateXRequestPageHttpParams(request?: XPageRequestDto): HttpParams {
    //
    let queryParameters = new HttpParams({
      encoder: new XHttpUrlEncodingCodec(),
    });

    //
    if (request) {
      //
      // First ...
      if (!isNullOrUndefined(request.first)) {
        queryParameters = queryParameters.set(
          XParam.First,
          toXString(request.first)
        );
      }

      //
      // Last ...
      if (!isNullOrUndefined(request.last)) {
        queryParameters = queryParameters.set(
          XParam.Last,
          toXString(request.last)
        );
      }

      //
      // After ...
      if (!isNullOrEmptyString(request.after)) {
        queryParameters = queryParameters.set(
          XParam.After,
          toXString(request.after)
        );
      }

      //
      // Before ...
      if (!isNullOrEmptyString(request.before)) {
        queryParameters = queryParameters.set(
          XParam.Before,
          toXString(request.before)
        );
      }

      //
      // SortBy ...
      if (!isNullOrEmptyString(request.sortBy)) {
        queryParameters = queryParameters.set(
          XParam.SortBy,
          toXString(request.sortBy)
        );
      }

      //
      // DescendingSort ...
      if (!!request.descendingSort) {
        queryParameters = queryParameters.set(
          XParam.DescendingSort,
          toXString(request.descendingSort)
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
   * @param language the specific language value ...
   */
  public addLanguageQueryParam(
    params?: HttpParams,
    language?: XLocale | string
  ): HttpParams {
    //
    if (!params) {
      //
      params = new HttpParams({
        encoder: new XHttpUrlEncodingCodec(),
      });
    }

    //
    if (isNullOrEmptyString(language)) {
      return params;
    }

    //
    params = params.set(XParam.Language, language);

    //
    return params;
  }

  /**
   * attach containsDetail to Query String ...
   *
   * @param params exists param ..
   * @param containsDetail the value ...
   * @returns an instance of HttpParams ...
   */
  public addContainsDetailQueryParam(
    params?: HttpParams,
    containsDetail?: boolean
  ): HttpParams {
    //
    if (!params) {
      //
      params = new HttpParams({
        encoder: new XHttpUrlEncodingCodec(),
      });
    }

    //
    if (!!containsDetail) {
      params = params.set(XParam.ContainsDetail, toXString(containsDetail));
    }

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
    result = setParams<TParams>(result, params);
    return result;
  }
  //#endregion
}
