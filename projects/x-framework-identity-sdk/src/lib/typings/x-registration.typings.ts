export enum RegistrationStep {
  Terms = 'terms',
  Info = 'info',
  MobileConfirmation = 'mobile_confirmation',
  EmailConfirmation = 'email_confirmation',
  Avatar = 'avatar',
  Finish = 'finish'
}

export type RegistrationStepIdentifier = RegistrationStep | string;
