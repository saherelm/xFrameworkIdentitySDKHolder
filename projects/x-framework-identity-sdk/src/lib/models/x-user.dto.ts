import {
  XBaseRequestDto,
  XBaseResponseDto,
  XBaseNumberIDDto,
} from '../base/x-base.dto';
import { isSameObject } from 'x-framework-core';
import { XFriendshipInfoDto } from './x-friendship.dto';
import { XAvailableRoles } from '../typings/x-role.typings';

export enum XGender {
  Male,
  Female,
}

export interface XUserProfileDto extends XBaseResponseDto {
  //
  userId: string;
  userName: string;

  email?: string;
  emailConfirmed?: boolean;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  dateOfBirth?: Date;

  creationDate?: Date;

  firstName?: string;
  lastName?: string;
  lastLogin?: Date;
  profileImage?: string;
  gender?: XGender;
  friendshipInfo?: XFriendshipInfoDto;
  roles?: Array<string>;
  profileImages?: Array<XProfileImageDto>;

  isEnable?: boolean;
  isBanned?: boolean;
}

export const defaultUserProfileDto: XUserProfileDto = {
  //
  userId: '',
  userName: '',

  //
  email: '',
  emailConfirmed: false,

  //
  phoneNumber: '',
  phoneNumberConfirmed: false,

  //
  dateOfBirth: undefined,
  creationDate: undefined,

  //
  firstName: '',
  lastName: '',

  //
  lastLogin: undefined,
  profileImage: '',

  //
  gender: XGender.Male,

  //
  roles: [],
  profileImages: [],

  //
  friendshipInfo: undefined,

  //
  isEnable: false,
  isBanned: false,
};

export function prepareUserProfileDtoFields(
  model: XUserProfileDto
): XUserProfileDto {
  //
  if (!model) {
    model = {
      ...defaultUserProfileDto,
    };
  }

  //
  model = {
    ...defaultUserProfileDto,

    //
    userId: model.userId || defaultUserProfileDto.userId,
    userName: model.userName || defaultUserProfileDto.userName,

    //
    firstName: model.firstName || defaultUserProfileDto.firstName,
    lastName: model.lastName || defaultUserProfileDto.lastName,

    //
    gender: model.gender || defaultUserProfileDto.gender,

    //
    email: model.email || defaultUserProfileDto.email,
    emailConfirmed:
      model.emailConfirmed || defaultUserProfileDto.emailConfirmed,

    //
    phoneNumber: model.phoneNumber || defaultUserProfileDto.phoneNumber,
    phoneNumberConfirmed:
      model.phoneNumberConfirmed || defaultUserProfileDto.phoneNumberConfirmed,

    //
    dateOfBirth: model.dateOfBirth || defaultUserProfileDto.dateOfBirth,
    creationDate: model.creationDate || defaultUserProfileDto.creationDate,
    lastLogin: model.lastLogin || defaultUserProfileDto.lastLogin,

    //
    profileImage: model.profileImage || defaultUserProfileDto.profileImage,
    friendshipInfo:
      model.friendshipInfo || defaultUserProfileDto.friendshipInfo,
    roles: model.roles || defaultUserProfileDto.roles,
    profileImages: model.profileImages || defaultUserProfileDto.profileImages,

    //
    isEnable: model.isEnable || defaultUserProfileDto.isEnable,
    isBanned: model.isBanned || defaultUserProfileDto.isBanned,
  };

  //
  return model;
}

export function isDefaultUserProfileDto(model: XUserProfileDto): boolean {
  return isSameObject(
    prepareUserProfileDtoFields(model),
    defaultUserProfileDto
  );
}

export interface XProfileImageDto extends XBaseResponseDto {
  id: number;
  name: string;
  path: string;
  thumb: string;
  thumbPath: string;
  creationDate: Date;
}

export interface XUserNameIdResponseDto extends XBaseResponseDto {
  id: string;
  userName: string;
}

export interface XUserNameIdRequestDto extends XBaseRequestDto {
  ids: string[];
}

export interface XProfileUpdateRequestDto extends XBaseRequestDto {
  userId?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
}

export interface XChangeRoleRequest extends XBaseRequestDto {
  userId: string;
  newRole: XAvailableRoles;
  bussinessRoleInfo: XBusinessOwner;
}

export interface XBusinessOwner extends XBaseNumberIDDto {
  userId: string;
}