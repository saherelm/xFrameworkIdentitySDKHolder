import { XBaseDto } from 'x-framework-core';

/**
 * Models the response from an OpenID Connect discovery endpoint
 */
export interface XDiscoveryDto extends XBaseDto {
  /**
   * Gets the raw response.
   */
  raw?: string;
  /**
   * Gets the response as a JObject.
   */
  json?: any;
  /**
   * Gets a value indicating whether an error occurred.
   */
  isError?: boolean;
  /**
   * Gets the status code.
   */
  statusCode?: any;
  /**
   * Gets the error.
   */
  error?: string;
  /**
   * Gets or sets the type of the error.
   */
  errorType?: any;
  /**
   * Gets the exception.
   */
  exception?: any;
  /**
   * Gets or sets the JSON web key set.
   */
  keySet?: any;
  issuer?: string;
  authorizeEndpoint?: string;
  tokenEndpoint?: string;
  userInfoEndpoint?: string;
  introspectionEndpoint?: string;
  revocationEndpoint?: string;
  deviceAuthorizationEndpoint?: string;
  jwksUri?: string;
  endSessionEndpoint?: string;
  checkSessionIframe?: string;
  registrationEndpoint?: string;
  frontChannelLogoutSupported?: boolean;
  frontChannelLogoutSessionSupported?: boolean;
  grantTypesSupported?: Array<string>;
  codeChallengeMethodsSupported?: Array<string>;
  scopesSupported?: Array<string>;
  subjectTypesSupported?: Array<string>;
  responseModesSupported?: Array<string>;
  responseTypesSupported?: Array<string>;
  claimsSupported?: Array<string>;
  tokenEndpointAuthenticationMethodsSupported?: Array<string>;
}
