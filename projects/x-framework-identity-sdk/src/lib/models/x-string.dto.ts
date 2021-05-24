import {
  XLocale,
  isSameObject,
  isNullOrUndefined,
  isNullOrEmptyString,
} from 'x-framework-core';
import { XBaseNumberIDDto, XBaseRequestDto } from 'x-framework-core';

export interface XStringDto extends XBaseNumberIDDto {
  language: XLocale | string;
  resourceTitle: string;
  translatedValue: string;
}

export interface XUpdateStringsRequestDto extends XBaseRequestDto {
  resources: Array<XStringDto>;
}

export const defaultStringDto: XStringDto = {
  id: 0,
  language: '',
  resourceTitle: '',
  translatedValue: '',
};

export function prepareStringDtoFields(model: XStringDto) {
  //
  if (!model) {
    model = {
      ...defaultStringDto,
    };
  }

  //
  if (isNullOrUndefined(model.id)) {
    model.id = defaultStringDto.id;
  }

  //
  if (isNullOrEmptyString(model.language)) {
    model.language = defaultStringDto.language;
  }

  //
  if (isNullOrEmptyString(model.resourceTitle)) {
    model.resourceTitle = defaultStringDto.resourceTitle;
  }

  //
  if (isNullOrEmptyString(model.translatedValue)) {
    model.translatedValue = defaultStringDto.translatedValue;
  }

  //
  return model;
}

export function isDefaultStringDto(model: XStringDto) {
  return isSameObject(prepareStringDtoFields(model), defaultStringDto);
}
