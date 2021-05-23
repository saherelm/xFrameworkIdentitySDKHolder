/*
 * Public API Surface of x-framework-identity-sdk
 */

//
// Config ...
export * from './lib/config/x-api-service.config';
export * from './lib/config/x-framework-identity-sdk.config';

//
// Models ...
export * from './lib/models/x-user.dto';
export * from './lib/models/x-login.dto';
export * from './lib/models/x-query.dto';
export * from './lib/models/x-string.dto';
export * from './lib/models/x-discovery.dto';
export * from './lib/models/x-friendship.dto';
export * from './lib/models/x-device-info.dto';
export * from './lib/models/x-registration-dto';

//
// Guards ...
export * from './lib/guards/admin.guard';
export * from './lib/guards/agent.guard';
export * from './lib/guards/chief-actuary.guard';
export * from './lib/guards/actuary.guard';
export * from './lib/guards/reporter.guard';
export * from './lib/guards/elite.guard';
export * from './lib/guards/user.guard';
//
export * from './lib/guards/auth.guard';
export * from './lib/guards/not-auth.guard';
export * from './lib/guards/admin-or-agent.guard';
export * from './lib/guards/admin-or-agent-or-chief-actuary.guard';

//
// Services ...
export * from './lib/x-account.service';
export * from './lib/services/auth.service';
export * from './lib/services/api-http-interceptor.service';

//
// Constants ...
export * from './lib/constants/x-account.keys';
export * from './lib/constants/x-header.enum';
export * from './lib/constants/x-api-scope.enum';

//
// Validators ...
export * from './lib/validators/api-validators';

//
// Typings ...
export * from './lib/typings/x-role.typings';
export * from './lib/typings/x-account.typings';
export * from './lib/typings/x-endpoint.typings';
export * from './lib/typings/x-registration.typings';

//
// Providers ...
export * from './lib/providers/x-url.encoder';

//
// Tools ...
export * from './lib/tools/x-role.tools';
export * from './lib/tools/x-endpoint.tools';

//
// Token ...
export * from './lib/tokens/x-injectable-tokens';

//
// Module ...
export * from './lib/x-framework-identity-sdk.module';
