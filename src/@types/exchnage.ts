export enum IExchangeEnum {
  Kucoin = 0,
  Coinex = 1,
  Binance = 2,
}

export interface IExchangeAPIDetail {
  exchange: IExchangeEnum;
  apiKey: string;
}
