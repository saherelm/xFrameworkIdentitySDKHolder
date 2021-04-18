export enum XApiHeader {
  ExpiresAt = 'expires_at',
  RefreshToken = 'refresh_token',
  Authorization = 'Authorization',
  AuthorizationPrefix = 'Bearer ',
}

export function getAuthorizationHeaderValue(token: string): string {
  return `${XApiHeader.AuthorizationPrefix}${token}`;
}
