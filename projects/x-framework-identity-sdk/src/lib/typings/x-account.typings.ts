import { XLoginResponseDto } from '../models/x-login.dto';

export interface XUserAccountInfo extends XLoginResponseDto {
  userSelectBy: string;
}

export interface XUserAccountInfoIndex {
  [userSelectBy: string]: XUserAccountInfo;
}

export interface XAccountState extends XUserAccountInfo {
  isLoggedIn: boolean;
}
