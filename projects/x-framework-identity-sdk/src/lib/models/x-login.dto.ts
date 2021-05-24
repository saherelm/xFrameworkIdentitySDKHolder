import { XLocale } from 'x-framework-core';
import { XUserProfileDto } from './x-user.dto';
import { XDeviceInfo } from './x-device-info.dto';
import { XBaseResponseDto, XBaseRequestDto } from 'x-framework-core';

export interface XLoginRequestDto extends XBaseRequestDto {
  userSelectBy: string;
  password: string;
  device?: XDeviceInfo;
  language?: XLocale;
}

export interface XTokenResponseDto extends XBaseResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface XLoginResponseDto extends XTokenResponseDto {
  profile: XUserProfileDto;
}
