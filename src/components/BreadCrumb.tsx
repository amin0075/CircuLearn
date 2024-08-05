// react
import { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";

export interface IRouteCrumb {
  name: string;
  url: string;
  isLink?: boolean;
}

interface IProps {
  children?: ReactNode;
  routesList: IRouteCrumb[];
  className?: string;
}

const BreadCrumb: React.FC<IProps> = ({ routesList, className = "" }) => {
  const router = useRouter();

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {routesList.map((route, index) => (
        <li key={index} className="flex items-center gap-2">
          {route.isLink ? (
            <Link href={route.url}>
              <Typography variant="caption">{route.name}</Typography>
            </Link>
          ) : (
            <Typography variant="caption">{route.name}</Typography>
          )}

          {routesList.length - 1 !== index && (
            <Typography fontweight="light" variant="caption">
              /
            </Typography>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BreadCrumb;
