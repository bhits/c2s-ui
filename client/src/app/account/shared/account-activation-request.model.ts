export class AccountActivationRequest {
  emailToken: string;
  verificationCode: string;
  birthDate: Date;
  password: string;
  confirmPassword: string;
  username: string;
}
