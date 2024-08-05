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
import { textColor } from "@src/utils/colorUtils";

// types
import { IRoute } from "@src/@types/route";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// utils
import { bgColor } from "@src/utils/colorUtils";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import Divider from "@src/components/Divider";
import IconButton from "@src/components/IconButton";

interface IProps {
  children?: ReactNode;
  data: IRoute;
}

const SidebarLink: React.FC<IProps> = ({ data }) => {
  const router = useRouter();

  const isSelected = router.pathname.includes(data.url);
  const { sidebarTransparent, primaryColor, sidebarExpand } = useThemeStore(
    (state) => state
  );

  return (
    <Link href={data.url}>
      <div
        className={`flex gap-3 items-center rounded-10 py-2 transition-all duration-200 ease-in-out ${
          !sidebarExpand ? "justify-center" : ""
        } ${
          isSelected
            ? "dark:bg-backgroundDark bg-backgroundLight dark:shadow-none shadow-box-shadow-black-md px-2"
            : ""
        }`}
      >
        <span
          className={`p-2 rounded-10 transition-all duration-200 ease-in-out ${
            isSelected
              ? `${bgColor(primaryColor)} text-white`
              : "dark:bg-backgroundDark bg-backgroundLight dark:shadow-none shadow-box-shadow-black-md"
          }`}
        >
          <data.icon className={`w-6 h-6`} />
        </span>
        {sidebarExpand && <Typography variant="body2">{data.name}</Typography>}
      </div>
    </Link>
  );
};

export default SidebarLink;
