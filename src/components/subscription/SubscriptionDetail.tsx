// react
import React, { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// i18next

// luxon
import { DateTime } from "luxon";

// icons
import { Accept, USDT, AdminProduct } from "@src/assets/icons";

// utils
import { diffDays } from "@src/utils/REGEX";

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
  subscriptionDetail: ISubscriptionDetail;
}

const SubscriptionDetail: React.FC<IProps> = ({ subscriptionDetail }) => {
  const router = useRouter();

  const { darkMode } = useThemeStore((state) => state);
  const daysLeft =
    diffDays(new Date(subscriptionDetail.expireDate), new Date()) - 1;

  return (
    <Paper
      bgImage="/images/sub-manage-bg.png"
      backgroundMode="image"
      className="p-5 flex flex-col gap-5 w-full max-w-full md:max-w-[400px] items-center mx-auto text-center"
    >
      <div className="flex flex-col gap-1 text-white items-center">
        <AdminProduct className="w-7 h-7" />
        <Typography
          variant="body2"
          textTransform="capitalize"
          className="text-white dark:text-white"
        >
          {subscriptionDetail.subscriptionType === SubscriptionEnum.None
            ? "You don't have a subscription, please see our plans below."
            : `subscription type: ${
                SubscriptionEnum[subscriptionDetail.subscriptionType]
              }`}
        </Typography>
      </div>
      {subscriptionDetail.subscriptionType !== SubscriptionEnum.None && (
        <Typography textTransform="capitalize" variant="caption">
          Expiration Date:{" "}
          {subscriptionDetail.subscriptionType === SubscriptionEnum.Ultimate
            ? "Unlimited"
            : DateTime.fromJSDate(
                new Date(subscriptionDetail.expireDate)
              ).toFormat("dd LLL',' HH':'mm a")}
        </Typography>
      )}
      {daysLeft > 0 &&
      subscriptionDetail.subscriptionType !== SubscriptionEnum.None ? (
        subscriptionDetail.subscriptionType === SubscriptionEnum.Ultimate ? (
          <Typography textTransform="uppercase" variant="body2">
            forever friend!
          </Typography>
        ) : (
          <Typography textTransform="uppercase" variant="body2">
            {daysLeft} day<span>{daysLeft !== 1 ? "s" : ""}</span> left
          </Typography>
        )
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default SubscriptionDetail;
