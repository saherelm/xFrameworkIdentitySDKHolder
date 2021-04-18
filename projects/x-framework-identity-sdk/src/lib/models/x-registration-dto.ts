import { XDeviceInfo } from './x-device-info.dto';
import { XBaseRequestDto, XBaseResponseDto } from '../base/x-base.dto';

export interface XActionRequestDto extends XBaseRequestDto {
  acceptTerms?: boolean;
  termsAndConditions?: string;
  lang?: string;
  actionToken?: string;
  device?: XDeviceInfo;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  userId?: string;
  userName?: string;
  email?: string;
  mobileNumber?: string;
  password?: string;
  newPassword?: string;
  emailVerificationCode?: string;
  mobileVerificationCode?: string;
  thumbnail?: string;
  returnUrl?: string;
  avatar?: File;
}

export interface XActionResponseDto extends XBaseResponseDto {
  token?: string;
  expiration?: Date;
}
