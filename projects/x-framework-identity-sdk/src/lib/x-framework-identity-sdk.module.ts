import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { AgentGuard } from './guards/agent.guard';
import { EliteGuard } from './guards/elite.guard';
import { ActuaryGuard } from './guards/actuary.guard';
import { XAccountService } from './x-account.service';
import { AuthService } from './services/auth.service';
import { NotAuthGuard } from './guards/not-auth.guard';
import { ReporterGuard } from './guards/reporter.guard';
import { XFrameworkCoreModule } from 'x-framework-core';
import { ApiValidators } from './validators/api-validators';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { XFrameworkServicesModule } from 'x-framework-services';
import { ChiefActuaryGuard } from './guards/chief-actuary.guard';
import { AdminOrAgentGuard } from './guards/admin-or-agent.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptorService } from './services/api-http-interceptor.service';
import { AdminOrAgentOrChiefActuaryGuard } from './guards/admin-or-agent-or-chief-actuary.guard';

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    XFrameworkCoreModule,
    XFrameworkServicesModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    XFrameworkCoreModule,
    XFrameworkServicesModule,
  ],
})
export class XFrameworkIdentitySdkModule {
  static forRoot(): ModuleWithProviders<XFrameworkIdentitySdkModule> {
    return {
      ngModule: XFrameworkIdentitySdkModule,
      providers: [
        //
        AuthGuard,
        NotAuthGuard,
        AdminOrAgentOrChiefActuaryGuard,
        AdminOrAgentGuard,
        AdminGuard,
        AgentGuard,
        ChiefActuaryGuard,
        ActuaryGuard,
        ReporterGuard,
        EliteGuard,
        UserGuard,

        //
        AuthService,

        //
        XAccountService,

        //
        // Register Http Interceptor ...
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiHttpInterceptorService,
          multi: true,
        },

        //
        ApiValidators,
      ],
    };
  }
}
