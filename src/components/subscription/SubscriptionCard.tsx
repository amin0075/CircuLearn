// react
import React, { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// i18next

// icons
import { Accept, USDT } from "@src/assets/icons";

// types
import {
  ISubscription,
  ISubscriptionDetail,
  SubscriptionEnum,
} from "@src/@types/subscription";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import Paper from "@src/components/Paper";
import Badge from "../Badge";
import { useThemeStore } from "@src/zustand_stores/Theme";

interface IProps {
  children?: ReactNode;
  data: ISubscription;
  subscriptionType: SubscriptionEnum;
  setLiteConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  liteConfirmed: boolean;
  setDetail: React.Dispatch<React.SetStateAction<ISubscriptionDetail>>;
}

const SubscriptionCard: React.FC<IProps> = ({
  data,
  subscriptionType,
  liteConfirmed,
  setLiteConfirmed,
  setDetail,
}) => {
  const router = useRouter();

  const { darkMode } = useThemeStore((state) => state);

  const buttonLetter = () => {
    switch (subscriptionType) {
      case SubscriptionEnum.None:
        return "buy now";
      case SubscriptionEnum.Lite:
        return "upgrade now";
      case SubscriptionEnum.Premium:
        return "renew now";
      case SubscriptionEnum.Ultimate:
        return "you are a friend, no need to buy";
      default:
        return "buy now";
    }
  };

  const handleClick = () => {
    if (data.name === SubscriptionEnum.Lite) {
      setLiteConfirmed(true);
    } else {
      setDetail({
        expireDate: "2023-01-30T22:24:54.672Z",
        subscriptionType: 2,
      });
    }
  };

  return (
    <Paper className="p-5 flex flex-col gap-5 w-[284px]">
      <Badge
        mode={darkMode ? "contained" : "bordered"}
        className="dark:bg-backgroundDark self-center px-4"
      >
        <Typography
          variant="caption"
          fontweight="bold"
          textTransform="uppercase"
        >
          {SubscriptionEnum[data.name]}
        </Typography>
      </Badge>
      <div className="flex gap-2 w-full justify-center">
        <div className="flex items-center gap-1">
          {data.price > 0 && <USDT className="w-6 h-6" />}
          <Typography
            variant="h2"
            fontweight="medium"
            className={`${data.afterDiscountPrice > 0 ? "line-through" : ""}`}
          >
            {data.price > 0 ? data.price : "Free"}
          </Typography>
        </div>
        {data.afterDiscountPrice > 0 ? (
          <div className="flex items-center gap-1 self-start">
            <USDT className="w-3 h-3" />
            <Typography
              variant="h4"
              fontweight="medium"
              textTransform="uppercase"
            >
              {data.afterDiscountPrice}
            </Typography>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* description list */}
      {data.description.split(",").map((el, index) => (
        <div
          className="flex items-center gap-3 dark:text-white text-black"
          key={index}
        >
          <Accept className="w-6 h-6" />
          <Typography variant="body2" color="gray">
            {el}
          </Typography>
        </div>
      ))}
      <span className="py-0 flex-1" />
      <Button
        onClick={handleClick}
        disabled={
          !data.available ||
          subscriptionType === SubscriptionEnum.Ultimate ||
          (data.name === SubscriptionEnum.Lite && liteConfirmed)
        }
        variant="contained"
        className="py-3"
        isPrimaryColor
      >
        <Typography
          variant="caption2"
          textTransform="uppercase"
          fontweight="bold"
          className="text-white dark:text-white"
        >
          {data.available ? buttonLetter() : "not available"}
        </Typography>
      </Button>
    </Paper>
  );
};

export default SubscriptionCard;
