import { IBotOrderHistory } from "@src/@types/bot";

const botHistoryResults = (botOrderHistory: IBotOrderHistory[]) => {
  let longs = 0;
  let shorts = 0;
  let successShort = 0;
  let successLong = 0;
  let successRate = 0;
  let longSuccessRate = 0;
  let shortSuccessRate = 0;
  let profit =
    botOrderHistory[botOrderHistory.length - 1].initialBalance -
    (botOrderHistory[0].initialBalance + botOrderHistory[0].profit);
  botOrderHistory.forEach((order, index) => {
    if (order.direction === "short") {
      shorts += 1;
      if (order.profit > 0) {
        successShort += 1;
      }
    }
    if (order.direction === "long") {
      longs += 1;
      if (order.profit > 0) {
        successLong += 1;
      }
    }
  });

  // overall success rate
  successRate = (successShort + successLong) / botOrderHistory.length;

  // long success rate
  longSuccessRate = successLong / longs;

  // short success rate
  shortSuccessRate = successShort / shorts;

  return {
    longs,
    shorts,
    successLong,
    successShort,
    longSuccessRate,
    shortSuccessRate,
    successRate,
    profit,
  };
};

export { botHistoryResults };
