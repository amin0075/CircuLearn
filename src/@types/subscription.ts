export enum SubscriptionEnum {
  None = 0,
  Lite = 1,
  Premium = 2,
  Ultimate = 3,
}

export type IInvoiceStatus =
  | "waiting"
  | "processing"
  | "sending"
  | "finished"
  | "failed"
  | "rejected";

export interface ISubscription {
  id: string;
  name: SubscriptionEnum;
  description: string;
  available: boolean;
  needsAdminVerify: boolean;
  price: number;
  afterDiscountPrice: number;
  daysTimeLength: number;
}

export interface ISubscriptionInvoice {
  description: string;
  priceAmount: number;
  invoiceUrl: string;
  invoiceStatus: IInvoiceStatus;
  payCurreny: string;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubscriptionDetail {
  subscriptionType: SubscriptionEnum;
  expireDate: string;
}
