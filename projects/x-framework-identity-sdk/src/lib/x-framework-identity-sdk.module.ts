import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AgentGuard } from './guards/agent.guard';
import { XAccountService } from './x-account.service';
import { AuthService } from './services/auth.service';
import { NotAuthGuard } from './guards/not-auth.guard';
import { XFrameworkCoreModule } from 'x-framework-core';
import { ApiValidators } from './validators/api-validators';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { XFrameworkServicesModule } from 'x-framework-services';
import { AdminOrAgentGuard } from './guards/admin-or-agent.guard';
import { BusinessOwnerGuard } from './guards/business-owner.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptorService } from './services/api-http-interceptor.service';
import { AdminOrAgentOrBusinessOwnerGuard } from './guards/admin-or-agent-or-business-owner.guard';

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
        AdminGuard,
        AgentGuard,
        AuthService,
        NotAuthGuard,
        AdminOrAgentGuard,
        BusinessOwnerGuard,
        AdminOrAgentOrBusinessOwnerGuard,

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
