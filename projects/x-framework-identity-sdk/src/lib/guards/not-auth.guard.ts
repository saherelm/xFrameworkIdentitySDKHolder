import {
  Route,
  UrlTree,
  CanLoad,
  UrlSegment,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { XManagerService } from 'x-framework-services';
import { XLoggable, XExceptionIDs, isNullOrUndefined } from 'x-framework-core';
import { X_FRAMEWORK_IDENTITY_SDK_CONFIG } from '../tokens/x-injectable-tokens';
import { XFrameworkIdentitySDKConfig } from '../config/x-framework-identity-sdk.config';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard
  extends XLoggable
  implements CanActivate, CanActivateChild, CanLoad
{
  //
  constructor(
    private authService: AuthService,
    private managerService: XManagerService,
    @Inject(X_FRAMEWORK_IDENTITY_SDK_CONFIG)
    public config: XFrameworkIdentitySDKConfig
  ) {
    super(config);
  }

  //
  //#region Actions ...
  //
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.handleGuard();
  }

  //
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    //
    return this.handleGuard();
  }

  //
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.handleGuard();
  }
  //#endregion

  //
  //#region Private Action ...
  private handleGuard(): Observable<boolean> {
    return this.authService.state$.pipe(
      filter((state) => !isNullOrUndefined(state)),
      map((state) => !state.isLoggedIn),
      tap((isPassed) => {
        //
        if (!isPassed) {
          this.handleGuardReject();
        }
      })
    );
  }

  //
  private handleGuardReject(): void {
    //
    this.managerService.notificationService.presentErrorNotification({
      exception: XExceptionIDs.MustLogout,
      dissmissable: true,
    });

    //
    this.managerService.navigateByPageReplace(this.config.Pages.Startup);
  }
  //#endregion
}
