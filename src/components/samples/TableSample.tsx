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
import { Arrow } from "@src/assets/icons";

// next-usequerystate
import { useQueryState } from "next-usequerystate";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import Paper from "../Paper";
import Table from "@src/components/Table";
import IconButton from "../IconButton";
import Select from "../Select";
import Badge from "@src/components/Badge";

interface IProps {
  children?: ReactNode;
  data: IData[];
}

interface IData {
  name: string;
  description: string;
  productName: string;
  outcomeAmount: number;
  updatedAt: string;
  referrerShare: string;
  discountAmount: number;
}

interface IHead {
  dataName: keyof IData;
  minWidth?: number | string;
  title: string;
}

const head: IHead[] = [
  { title: "name", dataName: "name", minWidth: "min-w-[120px]" },
  { title: "description", dataName: "description", minWidth: "min-w-[160px]" },
  { title: "product name", dataName: "productName", minWidth: "min-w-[120px]" },
  {
    title: "outcome amount",
    dataName: "outcomeAmount",
    minWidth: "min-w-[120px]",
  },
  {
    title: "referrer share",
    dataName: "referrerShare",
    minWidth: "min-w-[120px]",
  },
  { title: "updated at", dataName: "updatedAt", minWidth: "min-w-[120px]" },
];

const TableSample: React.FC<IProps> = ({ data }) => {
  const router = useRouter();

  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IData>("updatedAt");

  const handleChangeSort = (orderName: keyof IData) => {
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
    <Paper className="p-5 pt-7 flex flex-col gap-5">
      <div className="w-full flex items-center gap-4 justify-between">
        {/* title and search or action buttons */}
        <div className="flex flex-col">
          <Typography fontweight="medium">Referred invoices</Typography>
          <Typography fontweight="light" variant="caption" color="gray">
            Last 5 referred invoices
          </Typography>
        </div>
        <Link href="#">
          <Button variant="contained" className="text-white gap-1 group">
            <Typography variant="caption" className="text-white">
              Show more
            </Typography>
            <Arrow className="w-3 h-3 ltr:-rotate-90 rtl:rotate-90 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
          </Button>
        </Link>
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
              <Typography
                variant="body2"
                className="whitespace-nowrap"
                fontweight="medium"
              >
                {el.name}
              </Typography>
            </th>
            <td className="px-6 py-4">
              <Typography variant="body2" fontweight="medium">
                {el.description}
              </Typography>
            </td>
            <td className="px-6 py-4">
              <Typography variant="body2" fontweight="medium">
                {el.productName}
              </Typography>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-1">
                <Typography
                  variant="body2"
                  fontweight="medium"
                  className="whitespace-nowrap"
                >
                  {el.outcomeAmount} ( {el.discountAmount}% )
                </Typography>
              </div>
            </td>

            <td className="px-6 py-4">
              <Typography variant="body2" fontweight="medium">
                {el.referrerShare}%
              </Typography>
            </td>
            <td className="px-6 py-4">
              <Typography
                variant="body2"
                fontweight="medium"
                className="whitespace-nowrap"
              >
                asasa
              </Typography>
            </td>
            <td className="flex items-center px-6 py-4 gap-2">
              {/* <Badge color="red" mode="contained">
                <Typography variant="caption2">badge</Typography>
              </Badge> */}
              <Link href="#">
                <Button
                  variant="contained"
                  className="bg-primary-blue px-3 py-1"
                >
                  <Typography
                    variant="caption2"
                    className="text-white dark:text-white"
                  >
                    Edit
                  </Typography>
                </Button>
              </Link>
              <Link href="#">
                <Button
                  variant="contained"
                  className="bg-primary-red px-3 py-1"
                >
                  <Typography
                    variant="caption2"
                    className="text-white dark:text-white"
                  >
                    Delete
                  </Typography>
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      />
    </Paper>
  );
};

export default TableSample;
