import { XBaseDto } from '../base/x-base.dto';

export enum XFriendshipState {
  None,
  Pending,
  Accepted,
  Rejected,
  Blocked
}

export type XFriendshipStates = keyof typeof XFriendshipState;

export interface XFriendshipFollowerDto extends XBaseDto {
  state: XFriendshipState;
  userId: string;
  destId: string;
}

export interface XFriendshipFollowingDto extends XBaseDto {
  state: XFriendshipState;
  userId: string;
  destId: string;
}

export interface XFriendshipInfoDto {
  userId: string;
  isFollower: boolean;
  isFollowing: boolean;
  followerState: XFriendshipState;
  followingState: XFriendshipState;
  followers: number;
  followings: number;
}
