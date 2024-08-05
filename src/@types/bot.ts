export interface IBotOrderHistory {
  startTime: string;
  endTime: string;
  symbol: string;
  baseAsset: string;
  quantity: number;
  profit: number;
  direction: string;
  leverage: number;
  initialBalance: number;
}
