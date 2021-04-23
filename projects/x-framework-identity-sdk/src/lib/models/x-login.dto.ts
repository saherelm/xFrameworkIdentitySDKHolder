import { XLocale } from 'x-framework-core';
import { XUserProfileDto } from './x-user.dto';
import { XDeviceInfo } from './x-device-info.dto';
import { XBaseResponseDto, XBaseRequestDto } from '../base/x-base.dto';

export interface XLoginRequestDto extends XBaseRequestDto {
  userSelectBy: string;
  password: string;
  device: XDeviceInfo;
  language: XLocale;
}

export interface XLoginResponseDto extends XBaseResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  profile: XUserProfileDto;
}