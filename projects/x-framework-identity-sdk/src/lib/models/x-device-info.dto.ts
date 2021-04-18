export interface XDeviceInfo {
  os: string;
  osVersion: string;
  browser: string;
  userAgent: string;
  deviceType: XDeviceTypes;
  userId?: number;

  identifier?: string;
  token?: string;
}

export enum XDeviceTypes {
  Unknown,
  Mobile,
  Tablet,
  Desktop
}
