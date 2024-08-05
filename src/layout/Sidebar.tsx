// react
import { ReactNode, useEffect, useState, useRef } from "react";

// next js
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// i18next

// utils
import { textColor } from "@src/utils/colorUtils";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// routes
import { mainRoutes } from "@src/routes";

// icons
import { Arrow } from "@src/assets/icons";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import Divider from "@src/components/Divider";
import IconButton from "@src/components/IconButton";
import SidebarLink from "./SidebarLink";

interface IProps {
  children?: ReactNode;
}

interface ISection {
  introduction: boolean;
  basicConcepts: boolean;
  gates: boolean;
  quiz: boolean;
  aditionalResources: boolean;
}

const Sidebar: React.FC<IProps> = () => {
  const router = useRouter();

  const { sidebarTransparent, primaryColor, sidebarExpand, darkMode } =
    useThemeStore((state) => state);
  const { aditionalResources, basicConcepts, gates, introduction, quiz } =
    mainRoutes;
  const LogoRef = useRef<SVGElement | null>();
  const [sections, setSections] = useState<ISection>({
    introduction: false,
    aditionalResources: false,
    basicConcepts: false,
    gates: false,
    quiz: false,
  });
  // function for detecting routes
  const routeDetector = () => `/${router.pathname.split("/")[1]}`;
  console.log("routeDetector:", routeDetector());
  useEffect(() => {
    Object.keys(sections).forEach((key, index) => {
      if (routeDetector().replace("/", "") === key.toString()) {
        setSections((prevState) => ({
          ...prevState,
          [key]: true,
        }));
      } else {
        setSections((prevState) => ({
          ...prevState,
          [key]: false,
        }));
      }
    });
  }, [router]);

  return (
    <div
      className={`flex transition-all duration-200 ease-in-out fixed top-0 left-0 p-4 pr-8 h-screen z-[1] ${
        sidebarExpand ? "w-[298px]" : "w-[170px]"
      }`}
    >
      <div
        className={`w-full h-full overflow-y-auto flex flex-col justify-between items-center rounded-20 no-scrollbar::-webkit-scrollbar no-scrollbar ${
          sidebarTransparent
            ? "bg-transparent"
            : "dark:bg-gr_card_dark dark:backdrop-blur-xl dark:shadow-none shadow-box-shadow-black-md bg-white/80 dark:bg-transparent"
        } ${textColor(primaryColor)}`}
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full justify-center gap-2 px-8 pt-7 pb-1">
            <Image
              src={
                darkMode ? "/images/Logo-white.svg" : "/images/Logo-black.svg"
              }
              alt="logo"
              width={120}
              height={120}
              // className="bg-white"
            />
          </div>
          <Divider darkcolor={!darkMode} className="w-full" />
          {/* pages links */}
          <div className="flex flex-col w-full px-4">
            {/* introduction routes */}
            <div
              onClick={() =>
                setSections((prevState) => ({
                  ...prevState,
                  introduction: !prevState.introduction,
                }))
              }
              className={`flex items-center justify-between cursor-pointer text-black dark:text-white mt-4 mb-2 ${
                sidebarExpand ? "px-2" : "px-0"
              }`}
            >
              <Typography
                variant={sidebarExpand ? "body2" : "caption2"}
                fontweight="bold"
                textTransform="uppercase"
              >
                Introduction
              </Typography>
              <Arrow
                className={`w-4 h-4 transition-all duration-300 ease-in-out ${
                  sections.introduction ? "rotate-[270deg]" : "rotate-90"
                }`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out px-2 ${
                sections.introduction ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {introduction.map((route, index) => (
                <SidebarLink key={index} data={route} />
              ))}
            </div>
            {/* basic concepts routes */}
            <div
              onClick={() =>
                setSections((prevState) => ({
                  ...prevState,
                  basicConcepts: !prevState.basicConcepts,
                }))
              }
              className={`flex items-center justify-between cursor-pointer text-black dark:text-white mt-4 mb-2 ${
                sidebarExpand ? "px-2" : "px-0"
              }`}
            >
              <Typography
                variant={sidebarExpand ? "body2" : "caption2"}
                fontweight="bold"
                textTransform="uppercase"
              >
                Basic Concepts
              </Typography>
              <Arrow
                className={`w-4 h-4 transition-all duration-300 ease-in-out ${
                  sections.basicConcepts ? "rotate-[270deg]" : "rotate-90"
                }`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                sections.basicConcepts ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {basicConcepts.map((route, index) => (
                <SidebarLink key={index} data={route} />
              ))}
            </div>
            {/* gates routes */}
            <div
              onClick={() =>
                setSections((prevState) => ({
                  ...prevState,
                  gates: !prevState.gates,
                }))
              }
              className={`flex items-center justify-between cursor-pointer text-black dark:text-white mt-4 mb-2 ${
                sidebarExpand ? "px-2" : "px-0"
              }`}
            >
              <Typography
                variant={sidebarExpand ? "body2" : "caption2"}
                fontweight="bold"
                textTransform="uppercase"
              >
                Gates
              </Typography>
              <Arrow
                className={`w-4 h-4 transition-all duration-300 ease-in-out ${
                  sections.gates ? "rotate-[270deg]" : "rotate-90"
                }`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                sections.gates ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {gates.map((route, index) => (
                <SidebarLink key={index} data={route} />
              ))}
            </div>
            {/* quiz routes */}
            <div
              onClick={() =>
                setSections((prevState) => ({
                  ...prevState,
                  quiz: !prevState.quiz,
                }))
              }
              className={`flex items-center justify-between cursor-pointer text-black dark:text-white mt-4 mb-2 ${
                sidebarExpand ? "px-2" : "px-0"
              }`}
            >
              <Typography
                variant={sidebarExpand ? "body2" : "caption2"}
                fontweight="bold"
                textTransform="uppercase"
              >
                Quiz
              </Typography>
              <Arrow
                className={`w-4 h-4 transition-all duration-300 ease-in-out ${
                  sections.quiz ? "rotate-[270deg]" : "rotate-90"
                }`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                sections.quiz ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {quiz.map((route, index) => (
                <SidebarLink key={index} data={route} />
              ))}
            </div>
            {/* additional resources routes */}
            <div
              onClick={() =>
                setSections((prevState) => ({
                  ...prevState,
                  aditionalResources: !prevState.aditionalResources,
                }))
              }
              className={`flex items-center justify-between cursor-pointer text-black dark:text-white mt-4 mb-2 ${
                sidebarExpand ? "px-2" : "px-0"
              }`}
            >
              <Typography
                variant={sidebarExpand ? "body2" : "caption2"}
                fontweight="bold"
                textTransform="uppercase"
              >
                Additional Resources
              </Typography>
              <Arrow
                className={`w-4 h-4 transition-all duration-300 ease-in-out ${
                  sections.aditionalResources ? "rotate-[270deg]" : "rotate-90"
                }`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out px-2 ${
                sections.aditionalResources ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {aditionalResources.map((route, index) => (
                <SidebarLink key={index} data={route} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
