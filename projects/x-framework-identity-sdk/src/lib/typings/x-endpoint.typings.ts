import { toObject } from 'x-framework-core';

export enum XEndPoint {
  Account,
}

export type XEndPoints = keyof typeof XEndPoint;

/**
 * prepare all Route Params which used in Account Services Endpoints ...
 */
export enum XAccountEndPointParam {
  XId = '{xId}',
  XIds = '{xIds}',
  XEmail = '{xEmail}',
  XUserName = '{xUserName}',
  XMobileNumber = '{xMobileNumber}',
  XUserSelectByParam = '{xUserSelectByParam}',
}

export type XAccountEndPointParams = keyof typeof XAccountEndPointParam;

export enum XAccountEndPoint {
  //
  //#region Test ...
  Hi = 'Test/Hi',
  PassReadAccess = 'Test/PassReadAccess',
  PassWriteAccess = 'Test/PassWriteAccess',
  PassAdminAccess = 'Test/PassAdminAccess',
  PassManageAccess = 'Test/PassManageAccess',
  PassRequireXPowered = 'Test/PassRequireXPowered',
  HiClaims = 'Test/HiClaims',
  HiUser = 'Test/HiUser',
  HiEnabledUser = 'Test/HiEnabledUser',
  HiElite = 'Test/HiElite',
  HiEnabledElite = 'Test/HiEnabledElite',
  HiReporter = 'Test/HiReporter',
  HiEnabledReporter = 'Test/HiEnabledReporter',
  HiActuary = 'Test/HiActuary',
  HiEnabledActuary = 'Test/HiEnabledActuary',
  HiChiefActuary = 'Test/HiChiefActuary',
  HiEnabledChiefActuary = 'Test/HiEnabledChiefActuary',
  HiAdmin = 'Test/HiAdmin',
  HiEnabledAdmin = 'Test/HiEnabledAdmin',
  //#endregion

  //
  //#region Admin ...
  Ban = 'Ban',
  UnBan = 'UnBan',
  IsBanned = 'IsBanned/{xUserSelectByParam}',
  //#endregion

  //
  //#region Authentication ...
  DiscoveryDocument = 'DiscoveryDocument',
  Login = 'Login',
  Authenticate = 'Authenticate',
  RefreshTokens = 'RefreshTokens',
  //#endregion

  //
  //#region Registration ...
  IsConfirmedEmail = 'IsConfirmedEmail',
  IsConfirmedMobile = 'IsConfirmedMobile',
  CanRegisterUserName = 'CanRegisterUserName/{xUserName}',
  CanRegisterMobileNumber = 'CanRegisterMobileNumber/{xMobileNumber}',
  CanRegisterEmail = 'CanRegisterEmail/{xEmail}',
  RequestConfirmEmail = 'RequestConfirmEmail',
  RequestConfirmMobile = 'RequestConfirmMobile',
  RequestResetPassword = 'RequestResetPassword',
  RequestConfirmRegistration = 'RequestConfirmRegistration',
  ChangePassword = 'ChangePassword',
  ResetPassword = 'ResetPassword',
  ConfirmRegistration = 'ConfirmRegistration',
  ConfirmEmailAddress = 'ConfirmEmailAddress',
  ConfirmMobileNumber = 'ConfirmMobileNumber',
  InviteUser = 'InviteUser',
  RequestRegistration = 'RequestRegistration',
  AddAccountInfo = 'AddAccountInfo',
  AttachProfileImage = 'AttachProfileImage',
  FinishRegistration = 'FinishRegistration',
  //#endregion

  //
  //#region Friendship ...
  FriendshipInfo = 'Friendship/{xUserSelectByParam}/FriendshipInfo',
  Follow = 'Friendship/{xUserSelectByParam}/Follow',
  Cancel = 'Friendship/{xUserSelectByParam}/Cancel',
  UnFollowFollower = 'Friendship/{xUserSelectByParam}/UnFollowFollower',
  UnFollowFollowing = 'Friendship/{xUserSelectByParam}/UnFollowFollowing',
  Block = 'Friendship/{xUserSelectByParam}/Block',
  UnBlock = 'Friendship/{xUserSelectByParam}/UnBlock',
  AcceptRequest = 'Friendship/{xUserSelectByParam}/AcceptRequest',
  RejectRequest = 'Friendship/{xUserSelectByParam}/RejectRequest',
  IsFollower = 'Friendship/{xUserSelectByParam}/IsFollower',
  Follower = 'Friendship/{xUserSelectByParam}/Follower',
  FollowerState = 'Friendship/{xUserSelectByParam}/FollowerState',
  Followers = 'Friendship/Followers',
  AllFollowers = 'Friendship/AllFollowers',
  FollowersList = 'Friendship/FollowersList',
  IsFollowing = 'Friendship/{xUserSelectByParam}/IsFollowing',
  Following = 'Friendship/{xUserSelectByParam}/Following',
  FollowingState = 'Friendship/{xUserSelectByParam}/FollowingState',
  Followings = 'Friendship/Followings',
  AllFollowings = 'Friendship/AllFollowings',
  FollowingsLis = 'Friendship/FollowingsLis',
  //#endregion

  //
  //#region Profile ...
  GetNames = 'Profile/{xIds}/GetNames',
  GetNameIds = 'Profile/GetNameIds',
  Profile = 'Profile/{xUserSelectByParam}',
  QueryProfiles = 'Profile/Query',
  QueryAvatars = 'Profile/Avatars/Query',
  ProfileUpdate = 'Profile/Update/{xUserSelectByParam}',
  FullProfileUpdate = 'Profile/{xUserSelectByParam}',
  AddAvatar = 'Profile/Avatar',
  AddAvatars = 'Profile/Avatars',
  SetAvatar = 'Profile/Avatars/{xId}/Set',
  RemoveAvatars = 'Profile/Avatars/{xIds}',
  //#endregion
}

export type XAccountEndPoints = keyof typeof XAccountEndPoint;
