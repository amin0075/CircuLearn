// react
import { ReactNode, useEffect } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// i18next

// hooks
import useHasHydrated from "@src/hooks//useHasHydrated";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// hooks
import useComponentVisible from "@src/hooks/useComponentVisible";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import Navbar from "@src/layout/Navbar";
import Sidebar from "@src/layout/Sidebar";
import ThemeDrawer from "@src/layout/ThemeDrawer";
import Footer from "@src/layout/Footer";
import Chatbot from "@src/components/global/Chatbot";

interface IProps {
  children?: ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();

  const { darkMode, sidebarExpand } = useThemeStore((state) => state);
  const isHydrated = useHasHydrated();

  const { isComponentVisible, ref, setIsComponentVisible } =
    useComponentVisible(false);

  if (!isHydrated) return <></>;
  return (
    <div className={`${darkMode ? "dark" : "light"} flex flec w-full`}>
      <div
        dir="ltr"
        className={`flex w-full min-h-screen text-white dark:bg-[url('/images/dashboard-bg.png')] dark:bg-backgroundDark bg-none bg-gray-200 bg-no-repeat bg-cover font-PlusJakartaSans overflow-x-hidden`}
      >
        <Sidebar />
        <div
          className={`flex w-full flex-col pt-[75px] pr-5 transition-all duration-200 ease-in-out ${
            sidebarExpand ? "pl-[298px]" : "pl-[170px]"
          }`}
        >
          <Navbar
            isComponentVisible={isComponentVisible}
            setIsComponentVisible={setIsComponentVisible}
          />
          <div className="flex flex-col flex-1 w-full mt-5">{children}</div>
          <Footer />
        </div>
        <ThemeDrawer
          isComponentVisible={isComponentVisible}
          setIsComponentVisible={setIsComponentVisible}
          ref={ref}
        />
        <Chatbot />
      </div>
    </div>
  );
};

export default Layout;
