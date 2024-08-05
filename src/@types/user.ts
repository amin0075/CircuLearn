export enum UserRoleEnum {
  admin = 0,
  marketing = 1,
  user = 2,
}

export interface IUser {
  name: string;
  phoneNumber: string;
  email: string;
  country: string;
  whatsapp: string | null;
  telegram: string | null;
  referralCode: string;
  referrer: string;
  role: UserRoleEnum;
  image?: string;
}
