// react
import React, { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// i18next

// types
import { ISubscriptionInvoice } from "@src/@types/subscription";

// utils
import { invoiceStatusColor } from "@src/utils/colorUtils";

// icons
import { Arrow, USDT, ArrowLeft, Refresh, Accept } from "@src/assets/icons";

// luxon
import { DateTime } from "luxon";

// next-usequerystate
import { useQueryState } from "next-usequerystate";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import Paper from "../Paper";
import Table from "@src/components/Table";
import IconButton from "../IconButton";
import Select from "../Select";
import TablePagination from "@src/components/global/TablePagination";
import Badge from "@src/components/Badge";
import Tooltip from "@src/components/Tooltip";

interface IProps {
  children?: ReactNode;
  data: ISubscriptionInvoice[];
  showPagination?: boolean;
}

interface IHead {
  dataName: keyof ISubscriptionInvoice;
  minWidth?: number | string;
  title: string;
}

const head: IHead[] = [
  { title: "price amount", dataName: "priceAmount", minWidth: "min-w-[100px]" },
  { title: "description", dataName: "description", minWidth: "min-w-[180px]" },
  { title: "pay currency", dataName: "payCurreny", minWidth: "min-w-[80px]" },
  {
    title: "status",
    dataName: "invoiceStatus",
    minWidth: "min-w-[120px]",
  },
  { title: "created at", dataName: "createdAt", minWidth: "min-w-[180px]" },
  {
    title: "updated at",
    dataName: "updatedAt",
    minWidth: "min-w-[180px]",
  },
  {
    title: "payment id",
    dataName: "paymentId",
    minWidth: "min-w-[120px]",
  },
];

const SubscriptionInvoicesTable: React.FC<IProps> = ({
  data,
  showPagination = true,
}) => {
  const router = useRouter();

  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof ISubscriptionInvoice>("updatedAt");

  const handleChangeSort = (orderName: keyof ISubscriptionInvoice) => {
    if (orderName === orderBy) {
      setOrder((prevState) => {
        if (prevState === "asc") return "desc";
        return "asc";
      });
    } else {
      setOrder("asc");
      setOrderBy(orderName);
    }
  };

  return (
    <Paper className="p-5 pt-7 flex flex-col gap-5 mt-5">
      <div className="w-full flex items-center gap-4 justify-between">
        {/* title and search or action buttons */}
        <div className="flex flex-col">
          <Typography fontweight="medium" textTransform="capitalize">
            subscription invoice
          </Typography>
          <Typography
            textTransform="first-letter-capital"
            fontweight="light"
            variant="caption"
            color="gray"
          >
            you can see all your subscription invoices
          </Typography>
        </div>
      </div>
      <Table
        tableHeads={
          <>
            {head.map((el, index) => (
              <th
                scope="col"
                className={`px-6 py-3 cursor-pointer ${el.minWidth}`}
                onClick={() => handleChangeSort(el.dataName)}
              >
                <div className="flex items-center gap-1 justify-between w-full">
                  <Typography
                    color="gray"
                    variant="caption2"
                    textTransform="uppercase"
                    fontweight="bold"
                    className="whitespace-nowrap"
                  >
                    {el.title}
                  </Typography>
                  {orderBy === el.dataName ? (
                    <Arrow
                      className={`w-3 h-3 ${
                        order === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  ) : (
                    <span className="w-3 h-3" />
                  )}
                </div>
              </th>
            ))}
            <th scope="col" className={`px-6 py-3 min-w-[100px]`}>
              {" "}
              <Typography
                color="gray"
                variant="caption2"
                textTransform="uppercase"
                fontweight="bold"
              >
                actions
              </Typography>
            </th>
          </>
        }
        tableRows={data.map((el, index) => (
          <tr
            key={index}
            className={`bg-transparent border-b-[0.5px] dark:bg-transparent dark:border-backgroundLight/20 border-backgroundDark/20 hover:bg-transparent dark:hover:bg-transparent`}
          >
            <th scope="row" className="px-6 py-4">
              <div className={`flex items-center gap-1`}>
                <USDT className="w-4 h-4" />
                <Typography
                  variant="body2"
                  className="whitespace-nowrap"
                  fontweight="medium"
                >
                  {el.priceAmount.toFixed(2)}
                </Typography>
              </div>
            </th>
            <td className="px-6 py-4">
              <Typography variant="caption" fontweight="medium">
                {el.description}
              </Typography>
            </td>
            <td className="px-6 py-4">
              <Typography
                variant="caption"
                fontweight="medium"
                textTransform="uppercase"
              >
                {el.payCurreny}
              </Typography>
            </td>
            <td className="px-6 py-4">
              <Badge
                mode="contained"
                color={invoiceStatusColor(el.invoiceStatus)}
              >
                <Typography
                  variant="caption2"
                  fontweight="bold"
                  className="whitespace-nowrap text-white"
                  textTransform="uppercase"
                >
                  {el.invoiceStatus}
                </Typography>
              </Badge>
            </td>

            <td className="px-6 py-4">
              <Typography variant="body2" fontweight="medium">
                {DateTime.fromJSDate(new Date(el.createdAt)).toFormat(
                  "dd LLL',' HH':'mm a"
                )}
              </Typography>
            </td>
            <td className="px-6 py-4">
              <Typography variant="body2" fontweight="medium">
                {DateTime.fromJSDate(new Date(el.updatedAt)).toFormat(
                  "dd LLL',' HH':'mm a"
                )}
              </Typography>
            </td>
            <td className="px-6 py-4">
              <Typography variant="caption2" fontweight="medium">
                {el.paymentId}
              </Typography>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1 dark:text-white text-black">
                {el.invoiceStatus === "finished" ? (
                  <Accept className="w-7 h-7 mx-auto" />
                ) : (
                  <>
                    <IconButton
                      variant="contained"
                      className="p-2 group text-white"
                    >
                      <Refresh className="w-4 h-4 transition-all duration-300 ease-in-out rotate-0 group-hover:rotate-[360deg]" />
                    </IconButton>
                    <Link
                      href={el.invoiceUrl}
                      //  target="_blank"
                    >
                      <Button variant="contained">
                        <Typography
                          variant="caption2"
                          textTransform="uppercase"
                          fontweight="bold"
                          className="text-white"
                        >
                          pay
                        </Typography>
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      />
      {/* pagination */}
      {showPagination && <TablePagination pageCount={5} totalCount={50} />}
    </Paper>
  );
};

export default SubscriptionInvoicesTable;
