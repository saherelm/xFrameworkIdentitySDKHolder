import {
  tap,
  concatMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import {
  ValidatorFn,
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import {
  applyLocale,
  XResourceIDs,
  XCountryCode,
  hasUniqueChar,
  stringFormatter,
  isNullOrEmptyString,
  normalizePhoneNumber,
} from 'x-framework-core';
import { Subject, of, Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { XAccountService } from '../x-account.service';
import { XLocalizationService } from 'x-framework-services';
import { X_FRAMEWORK_IDENTITY_SDK_CONFIG } from '../tokens/x-injectable-tokens';
import { XFrameworkIdentitySDKConfig } from '../config/x-framework-identity-sdk.config';

export interface XPasswordValidationErrorObject {
  //
  requireDigit?: boolean;
  requireDigitErr?: boolean;

  //
  requiredLength?: number;
  requiredLengthErr?: boolean;

  //
  requiredUniqueChars?: number;
  requiredUniqueCharsErr?: boolean;

  //
  requireLowercase?: boolean;
  requireLowercaseErr?: boolean;

  //
  requireNonAlphanumeric?: boolean;
  requireNonAlphanumericErr?: boolean;

  //
  requireUppercase?: boolean;
  requireUppercaseErr?: boolean;
}

export interface XPasswordValidatorError {
  xPasswordValidator: XPasswordValidationErrorObject | null;
}

@Injectable({
  providedIn: 'root',
})
export class ApiValidators {
  //
  //#region Props ...
  //
  private userNameErrorObject = {
    userNameValidator: true,
  };

  //
  private emailErrorObject = {
    emailValidator: true,
  };

  //
  private mobileErrorObject = {
    mobileValidator: true,
  };

  //
  private passwordErrorObject: XPasswordValidatorError = {
    xPasswordValidator: {
      //
      requireDigit: true,
      requireDigitErr: false,

      //
      requiredLength: 0,
      requiredLengthErr: false,

      //
      requiredUniqueChars: 0,
      requiredUniqueCharsErr: false,

      //
      requireLowercase: true,
      requireLowercaseErr: false,

      //
      requireNonAlphanumeric: true,
      requireNonAlphanumericErr: false,

      //
      requireUppercase: true,
      requireUppercaseErr: false,
    },
  };

  //
  public loading$ = new Subject<boolean>();
  //#endregion

  //
  //#region Constructor ...
  constructor(
    @Inject(X_FRAMEWORK_IDENTITY_SDK_CONFIG)
    private config: XFrameworkIdentitySDKConfig,
    private accountService: XAccountService,
    private localizationService: XLocalizationService
  ) {}
  //#endregion

  //
  //#region Validators ...
  passwordValidator(): ValidatorFn {
    //
    const validatorFn = (control: AbstractControl): ValidationErrors | null => {
      //
      // Check Password Configs ...
      if (!this.config || !this.config.passwordPolicies) {
        return null;
      }

      //
      const pswPolicies = this.config.passwordPolicies;

      //
      const errObj: XPasswordValidatorError = {
        ...this.passwordErrorObject,
        xPasswordValidator: {
          ...this.passwordErrorObject.xPasswordValidator,
          ...pswPolicies,
        },
      };

      //
      const value = control && control.value ? (control.value as string) : null;

      //
      // Required Length ...
      if (pswPolicies.requiredLength) {
        //
        const isLengthPassed =
          value && value.length >= pswPolicies.requiredLength;

        //
        if (!isLengthPassed) {
          //
          errObj.xPasswordValidator.requiredLengthErr = true;

          //
          return errObj;
        }
      }

      //
      // Required Digit ...
      if (pswPolicies.requireDigit) {
        //
        const containsDigitRegExp = new RegExp('(?=.*[0-9])');
        const isRequiredDigitPassed = containsDigitRegExp.test(value);

        //
        if (!isRequiredDigitPassed) {
          //
          errObj.xPasswordValidator.requireDigitErr = true;

          //
          return errObj;
        }
      }

      //
      // Required LowerCase ...
      if (pswPolicies.requireLowercase) {
        //
        const containsLowerCaseRegExp = new RegExp('(?=.*[a-z])');
        const isRequiredLowercasePassed = containsLowerCaseRegExp.test(value);

        //
        if (!isRequiredLowercasePassed) {
          //
          errObj.xPasswordValidator.requireLowercaseErr = true;

          //
          return errObj;
        }
      }

      //
      // Required UpperCase ...
      if (pswPolicies.requireUppercase) {
        //
        const containsUpperCaseRegExp = new RegExp('(?=.*[A-Z])');
        const isRequiredUppercasePassed = containsUpperCaseRegExp.test(value);

        //
        if (!isRequiredUppercasePassed) {
          //
          errObj.xPasswordValidator.requireUppercaseErr = true;

          //
          return errObj;
        }
      }

      //
      // Required NonAlphabet/Special Char ...
      if (pswPolicies.requireNonAlphanumeric) {
        //
        const containsSpecialCharsRegExp = new RegExp('(?=.*[!@#$%^&*])');
        const isRequiredSpecialCharsPassed = containsSpecialCharsRegExp.test(
          value
        );

        //
        if (!isRequiredSpecialCharsPassed) {
          //
          errObj.xPasswordValidator.requireNonAlphanumericErr = true;

          //
          return errObj;
        }
      }

      //
      // Required Unique Char ...
      if (pswPolicies.requiredUniqueChars) {
        //
        const isRequiredUniqueCharPassed = hasUniqueChar(value);

        //
        if (!isRequiredUniqueCharPassed) {
          //
          errObj.xPasswordValidator.requiredUniqueCharsErr = true;

          //
          return errObj;
        }
      }

      //
      return null;
    };

    //
    return validatorFn;
  }

  emailValidator(): AsyncValidatorFn {
    //
    const validatorFn = (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      //
      const value = control && control.value ? (control.value as string) : null;

      //
      return of(null).pipe(
        tap((_) => this.loading$.next(true)),
        debounceTime(this.config.debounceTime),
        distinctUntilChanged(),
        concatMap((_) => this.accountService.accountsCanRegisterEmail(value)),
        concatMap((canRegister) =>
          canRegister ? of(null) : of(this.emailErrorObject)
        ),
        tap((_) => this.loading$.next(false))
      );
    };

    //
    return validatorFn;
  }

  mobileNumberValidator(defaultCountryCode?: XCountryCode): AsyncValidatorFn {
    //
    const validatorFn = (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      //
      const value = control && control.value ? (control.value as string) : null;
      const normalValue = normalizePhoneNumber(value, defaultCountryCode);

      //
      return of(null).pipe(
        tap((_) => this.loading$.next(true)),
        debounceTime(this.config.debounceTime),
        distinctUntilChanged(),
        concatMap((_) =>
          this.accountService.accountsCanRegisterMobileNumber(
            normalValue.toString()
          )
        ),
        concatMap((canRegister) =>
          canRegister ? of(null) : of(this.mobileErrorObject)
        ),
        tap((_) => this.loading$.next(false))
      );
    };

    //
    return validatorFn;
  }

  userNameValidator(): AsyncValidatorFn {
    //
    const validatorFn = (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      //
      const value = control && control.value ? (control.value as string) : null;

      //
      return of(null).pipe(
        tap((_) => this.loading$.next(true)),
        debounceTime(this.config.debounceTime),
        distinctUntilChanged(),
        concatMap((_) =>
          this.accountService.accountsCanRegisterUserName(value)
        ),
        concatMap((canRegister) =>
          canRegister ? of(null) : of(this.userNameErrorObject)
        ),
        tap((_) => this.loading$.next(false))
      );
    };

    //
    return validatorFn;
  }
  //#endregion

  //
  //#region Data Providers ...
  /**
   * generate error message for password validation ...
   *
   * @param error the XPasswordValidationError instance ...
   */
  generatePasswordValidationError(error: XPasswordValidationErrorObject) {
    //
    if (!error) {
      return;
    }

    //
    let errorMessage = '';

    //
    // Handle Required Length ...
    if (error.requiredLength > 0 && error.requiredLengthErr) {
      //
      errorMessage += !isNullOrEmptyString(errorMessage) ? '\n' : '';
      errorMessage += `${this.getRequiredLengthError(error.requiredLength)}`;
    }

    //
    // Handle Required UniqueChars ...
    else if (error.requiredUniqueChars > 0 && error.requiredUniqueCharsErr) {
      //
      errorMessage += !isNullOrEmptyString(errorMessage) ? '\n' : '';
      errorMessage += `${this.getRequiredUniqueChanrsError(
        error.requiredUniqueChars
      )}`;
    }

    //
    // Handle Required Digits ...
    else if (error.requireDigit && error.requireDigitErr) {
      //
      errorMessage += !isNullOrEmptyString(errorMessage) ? '\n' : '';
      errorMessage += `${this.getRequiredDigitsError()}`;
    }

    //
    // Handle Required LowerCase ...
    else if (error.requireLowercase && error.requireLowercaseErr) {
      //
      errorMessage += !isNullOrEmptyString(errorMessage) ? '\n' : '';
      errorMessage += `${this.getRequiredLowercaseError()}`;
    }

    //
    // Handle Required UpperCase ...
    else if (error.requireUppercase && error.requireUppercaseErr) {
      //
      errorMessage += !isNullOrEmptyString(errorMessage) ? '\n' : '';
      errorMessage += `${this.getRequiredUppercaseError()}`;
    }

    //
    // Handle Required NonAlphanumeric ...
    else if (error.requireNonAlphanumeric && error.requireNonAlphanumericErr) {
      //
      errorMessage += !isNullOrEmptyString(errorMessage) ? '\n' : '';
      errorMessage += `${this.getRequiredNonAlphanumericError()}`;
    }

    //
    return errorMessage;
  }
  //#endregion

  //
  //#region Private ...
  private getRequiredLengthError(length: number) {
    //
    const error = this.localizationService.getValue(
      XResourceIDs.required_length
    );

    //
    return applyLocale(
      stringFormatter(error, length),
      this.localizationService.locale
    );
  }

  private getRequiredUniqueChanrsError(length: number) {
    //
    const error = this.localizationService.getValue(
      XResourceIDs.required_unique_chars
    );

    //
    return applyLocale(
      stringFormatter(error, length),
      this.localizationService.locale
    );
  }

  private getRequiredDigitsError() {
    return this.localizationService.getValue(XResourceIDs.require_digit);
  }

  private getRequiredLowercaseError() {
    return this.localizationService.getValue(XResourceIDs.require_lowercase);
  }

  private getRequiredUppercaseError() {
    return this.localizationService.getValue(XResourceIDs.require_uppercase);
  }

  private getRequiredNonAlphanumericError() {
    return this.localizationService.getValue(
      XResourceIDs.require_non_alphanumeric
    );
  }
  //#endregion
}
