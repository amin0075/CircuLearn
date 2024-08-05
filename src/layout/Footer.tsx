// react
import { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// i18next

// utils
import { bgColor, textColor } from "@src/utils/colorUtils";

// hooks
import useComponentVisible from "@src/hooks/useComponentVisible";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// routes
import { ROUTES_URL } from "@src/routes";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import IconButton from "@src/components/IconButton";
import Paper from "@src/components/Paper";
import Divider from "@src/components/Divider";
import Tooltip from "@src/components/Tooltip";

interface IProps {
  children?: ReactNode;
}

const Footer: React.FC<IProps> = ({}) => {
  const router = useRouter();

  return (
    <footer
      className={`w-full flex items-center justify-between gap-4 flex-wrap px-5 py-8 ltr:pr-28 rtl:pl-28`}
    >
      <Typography variant="body2">
        CircuLearn © {new Date().getFullYear()}, All Right Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
