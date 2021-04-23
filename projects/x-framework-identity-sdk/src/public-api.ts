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
export * from './lib/models/x-discovery.dto';
export * from './lib/models/x-friendship.dto';
export * from './lib/models/x-device-info.dto';
export * from './lib/models/x-registration-dto';

//
// Guards ...
export * from './lib/guards/auth.guard';
export * from './lib/guards/admin.guard';
export * from './lib/guards/agent.guard';
export * from './lib/guards/not-auth.guard';
export * from './lib/guards/admin-or-agent.guard';
export * from './lib/guards/business-owner.guard';
export * from './lib/guards/admin-or-agent-or-business-owner.guard';

//
// Services ...
export * from './lib/x-account.service';
export * from './lib/services/auth.service';
export * from './lib/services/api-http-interceptor.service';

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

//
// Token ...
export * from './lib/tokens/x-injectable-tokens';

//
// Module ...
export * from './lib/x-framework-identity-sdk.module';