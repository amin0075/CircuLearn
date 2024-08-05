import { IExchangeEnum } from "./exchnage";
import { SubscriptionEnum } from "./subscription";

export interface IReferredShare {
  name: string;
  description: string;
  productName: string;
  outcomeAmount: number;
  updatedAt: string;
  referrerShare: string;
  discountAmount: number;
}

export interface IReferralAccounts {
  name: string;
  country: string;
  exhange: IExchangeEnum;
  subType: SubscriptionEnum;
  expireTime: string;
  registerDate: string;
}
