// react
import { ReactNode, useEffect, useRef, useState } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// utils
import { bgColor, textColor } from "@src/utils/colorUtils";

// hooks
import useComponentVisible from "@src/hooks/useComponentVisible";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// routes
import { navRoutes, ROUTES_URL } from "@src/routes";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import IconButton from "@src/components/IconButton";
import Paper from "@src/components/Paper";
import Divider from "@src/components/Divider";
import Tooltip from "@src/components/Tooltip";
import { BurgerMenu, Close, Search, Setting } from "@src/assets/icons";
import Modal from "@src/components/Modal";
import UserGuide from "./UserGuide";
import NavLinks from "./NavLinks";

interface IProps {
  children?: ReactNode;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isComponentVisible: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<IProps> = ({
  isComponentVisible,
  setIsComponentVisible,
  setSidebarOpen,
}) => {
  const router = useRouter();
  const { sidebarExpand } = useThemeStore();

  return (
    <>
      {" "}
      <nav
        className={`${
          sidebarExpand
            ? "w-[calc(100%-40px)] md:w-[calc(100%-318px)]"
            : "w-[calc(100%-40px)] md:w-[calc(100%-190px)]"
        } transition-all duration-200 ease-in-out flex items-center justify-between p-3 px-5 h-[62px] backdrop-blur-xl fixed right-0 left-unset top-0 rounded-10 shadow-box-shadow-black-md bg-white/50 dark:bg-backgroundDark/60 mt-3 mr-5 z-10`}
      >
        <IconButton
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-1 md:hidden text-black dark:text-white bg-transparent"
        >
          <BurgerMenu className="w-7 h-7" />
        </IconButton>
        <NavLinks className="smd:hidden" />
        <div className="flex items-center gap-4">
          {/* theme setting */}
          <Tooltip className="whitespace-nowrap" title="Theme configuration">
            <IconButton
              onClick={() => setIsComponentVisible(true)}
              className={`p-1 group dark:text-white text-black`}
              borderRadius="full"
            >
              <Setting className="w-7 h-7 group-hover:rotate-180 transition-all duration-500 ease-in-out" />
            </IconButton>
          </Tooltip>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
