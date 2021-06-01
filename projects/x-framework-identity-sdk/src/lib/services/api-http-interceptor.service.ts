import {
  XHeaders,
  toObservable,
  XBaseService,
  XExceptionIDs,
  getErrorException,
  isNullOrUndefined,
} from 'x-framework-core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpEventType,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { XManagerService } from 'x-framework-services';
import { XLoginResponseDto } from '../models/x-login.dto';
import { finalize, catchError, concatMap, map } from 'rxjs/operators';
import { X_FRAMEWORK_IDENTITY_SDK_CONFIG } from '../tokens/x-injectable-tokens';
import { XFrameworkIdentitySDKConfig } from '../config/x-framework-identity-sdk.config';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpInterceptorService
  extends XBaseService
  implements HttpInterceptor
{
  //
  private isRefreshing = false;

  //
  constructor(
    private authService: AuthService,
    @Inject(X_FRAMEWORK_IDENTITY_SDK_CONFIG)
    config: XFrameworkIdentitySDKConfig,
    private managerService: XManagerService
  ) {
    super(config);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleInterceptRequest(req, next);
  }

  private handleInterceptRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //
    // Adding Identifier ...
    req = this.applyHeadersToRequest(req);

    //
    // TODO: Check this ...
    // Apply RefreshToken Handler ...
    const handledRefreshToken = !this.isRefreshing
      ? this.applyRefreshTokenHandler(next.handle(req), req, next)
      : next.handle(req);
    // const handledRefreshToken = next.handle(req);

    //
    // Apply Response Headers Handler ...
    const handledResponseHeaders =
      this.applyResponseHandler(handledRefreshToken);

    //
    // Apply Error Handler ...
    const handledErrors = this.applyErrorHandler(handledResponseHeaders);

    //
    // Apply Finally Handler ...
    const handledFinally = this.applyFinally(handledErrors);

    //
    // Final Level ...
    const result = handledFinally;

    //
    return result;
  }

  //
  //#region Actions / Handlers ...
  private applyHeadersToRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        XRegisteredTo: `${this.config.poweredValue}`,
      },
    });
  }

  private applyFinally(
    current: Observable<HttpEvent<any>>
  ): Observable<HttpEvent<any>> {
    //
    return current.pipe(
      finalize(() => {
        //
        // Collection of instructions after finish or error ...
        this.isRefreshing = false;
        this.managerService.loading = false;
      })
    );
  }

  private applyRefreshTokenHandler(
    current: Observable<HttpEvent<any>>,
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //
    return current.pipe(
      catchError((error) => {
        //
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.logError('401 => ', error);

          //
          const isExpired$ = toObservable(this.authService.isExpired());

          //
          return isExpired$.pipe(
            concatMap((isExpired) => {
              if (isExpired) {
                return this.handleRefreshToken(req, next);
              } else {
                return throwError(error);
              }
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }

  private applyResponseHandler(
    current: Observable<HttpEvent<any>>
  ): Observable<HttpEvent<any>> {
    //
    return current.pipe(
      map((event: HttpEvent<any>) => {
        // this.handleResponseHeaders(event);
        return event;
      })
    );
  }

  private applyErrorHandler(
    current: Observable<HttpEvent<any>>
  ): Observable<HttpEvent<any>> {
    return current.pipe(
      catchError((error: HttpErrorResponse) => {
        //
        this.managerService.loading = false;
        const mException = getErrorException(
          !isNullOrUndefined(error.error) ? error.error : error
        );

        //
        this.managerService.error = mException;

        //
        this.logError('HttpInterceptor: ', error, mException);

        //
        return throwError(mException);
      })
    );
  }

  private handleRefreshToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      //
      return this.authService.state$.pipe(
        concatMap((accountState) => {
          return this.authService.refreshTokens().pipe(
            map((loginResponse) => {
              return {
                accountState,
                loginResponse,
              };
            })
          );
        }),
        concatMap((accountInfo) => {
          //
          this.logWarn('Login Refresh Response: ', accountInfo.loginResponse);

          //
          let headers = this.authService.defaultHeaders;
          headers = this.authService.addAuthentication(
            headers,
            accountInfo.loginResponse
          );
          headers = Object.assign(req.headers, headers);

          //
          req = req.clone({
            headers,
          });

          //
          // Update User Account ...
          const updateAccount$ = toObservable(
            this.authService.updateUserTokens(
              accountInfo.accountState,
              accountInfo.loginResponse
            )
          );

          //
          return updateAccount$.pipe(
            concatMap(() => {
              return next
                .handle(req)
                .pipe(finalize(() => (this.isRefreshing = false)));
            })
          );
        })
      );
    }
  }

  private async handleResponseHeaders(event: HttpEvent<any>): Promise<void> {
    //
    if (event.type === HttpEventType.Response) {
      //
      const headers = event.headers;

      //
      const isContainsNewAuthentication =
        headers.has(XHeaders.Authorization) &&
        headers.has(XHeaders.RefreshToken) &&
        headers.has(XHeaders.ExpiresAt) &&
        headers.has(XHeaders.RevisionChecksum);

      //
      if (isContainsNewAuthentication) {
        //
        const oldTokens = await this.authService.getDefaultUserTokens();

        //
        const accessToken = headers
          .get(XHeaders.Authorization)
          .replace(XHeaders.AuthorizationPrefix, '');
        const refreshToken = headers.get(XHeaders.RefreshToken);
        const expiresAt = +headers.get(XHeaders.ExpiresAt);
        const revisionChecksum = headers.get(XHeaders.RevisionChecksum);

        //
        const profile = oldTokens.profile;

        //
        const newTokens: XLoginResponseDto = {
          accessToken,
          refreshToken,
          expiresAt,
          profile,
        };

        //
        const isValid = this.authService.validateLoginResponseRevision(
          newTokens,
          revisionChecksum
        );

        //
        if (isValid) {
          await this.authService.updateUserTokens(oldTokens, newTokens);
        } else {
          //
          this.managerService.notificationService.presentErrorNotification({
            exception: XExceptionIDs.InvalidToken,
            dissmissable: true,
          });

          //
          await this.authService.logout();
        }
      }
    }
  }
  //#endregion
}
