// tslint:disable-next-line:no-empty-interface
export interface XBaseDto {}

export interface XBaseNumberIDDto {
  id: number;
}

// tslint:disable-next-line: no-empty-interface
export interface XBaseRequestDto {}

export interface XBaseRangeRequestDto<T> extends XBaseRequestDto {
  items: Array<T>;
}

// tslint:disable-next-line:no-empty-interface
export interface XBaseResponseDto {}
