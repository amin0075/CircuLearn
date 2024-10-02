// react
import { ReactNode, useEffect, useState, useRef } from "react";

// next js
import { useRouter } from "next/router";
import Image from "next/image";

// i18next

// utils
import { bgColor, textColor } from "@src/utils/colorUtils";

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
import NavLinks from "./Navbar/NavLinks";
import useMediaQuery from "@src/hooks/useMediaQuery";

interface IProps {
  children?: ReactNode;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}

interface ISection {
  introduction: boolean;
  basicConcepts: boolean;
  gates: boolean;
  booleanAlgebra: boolean;
  finalStep: boolean;
  additionalResources: boolean;
}

const Sidebar: React.FC<IProps> = ({ setSidebarOpen, sidebarOpen }) => {
  const router = useRouter();

  const { sidebarTransparent, primaryColor, sidebarExpand, darkMode } =
    useThemeStore((state) => state);
  const {
    additionalResources,
    basicConcepts,
    gates,
    BooleanAlgebra,
    introduction,
    finalStep,
  } = mainRoutes;
  const LogoRef = useRef<SVGElement | null>();
  const [sections, setSections] = useState<ISection>({
    introduction: false,
    additionalResources: false,
    basicConcepts: false,
    booleanAlgebra: false,
    gates: false,
    finalStep: false,
  });
  const width = useMediaQuery();

  // function for detecting routes
  const routeDetector = () => `/${router.pathname.split("/")[1]}`;
  useEffect(() => {
    Object.keys(sections).forEach((key, index) => {
      if (
        routeDetector().replace("/", "").replace("-", "").toLowerCase() ===
        key.toString().toLowerCase()
      ) {
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
      className={`flex transition-all duration-200 ease-in-out fixed md:top-0 md:left-0 p-4 md:pr-8 h-screen md:z-[1] smd:z-20 ${sidebarOpen ? "left-0 top-0" : `${sidebarExpand ? "-left-[298px]" : "-left-[170px]"}`} ${
        sidebarExpand ? "w-[298px]" : "w-[170px]"
      }`}
    >
      <div
        className={`w-full h-full relative overflow-y-auto flex flex-col justify-between items-center rounded-20 no-scrollbar::-webkit-scrollbar no-scrollbar ${
          sidebarTransparent
            ? "bg-transparent"
            : "dark:bg-gr_card_dark dark:backdrop-blur-xl dark:shadow-none shadow-box-shadow-black-md md:bg-white/80 bg-white dark:bg-transparent"
        } ${textColor(primaryColor)}`}
      >
        <div className="w-full flex justify-end px-5 sticky top-3 md:hidden">
          <IconButton
            onClick={() => setSidebarOpen((prev) => !prev)}
            className={`${bgColor(primaryColor)} p-1 text-white`}
            aria-label="Toggle sidebar"
          >
            <Arrow
              className={`w-4 h-4 transition-all duration-300 ease-in-out ${
                sidebarOpen ? "rotate-180" : "rotate-90"
              }`}
            />
          </IconButton>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full justify-center gap-2 px-8 pt-7 pb-1">
            <Image
              src={
                darkMode ? "/images/Logo-white.svg" : "/images/Logo-black.svg"
              }
              alt="logo"
              width={120}
              height={120}
            />
          </div>
          <Divider darkcolor={!darkMode} className="w-full" />
          {/* nav link in mobile view */}
          {width < 767 && (
            <NavLinks usedInNavbar={false} className="md:hidden" />
          )}
          <Divider darkcolor={!darkMode} className="w-full md:hidden" />

          {/* pages links */}
          <div className="flex flex-col w-full px-4">
            <div className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out px-2 py-2">
              <SidebarLink data={introduction} />
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
            {/* Boolean Algebra routes */}
            <div
              onClick={() =>
                setSections((prevState) => ({
                  ...prevState,
                  booleanAlgebra: !prevState.booleanAlgebra,
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
                Boolean Algebra
              </Typography>
              <Arrow
                className={`w-4 h-4 transition-all duration-300 ease-in-out ${
                  sections.booleanAlgebra ? "rotate-[270deg]" : "rotate-90"
                }`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                sections.booleanAlgebra ? "max-h-[650px]" : "max-h-0"
              }`}
            >
              {BooleanAlgebra.map((route, index) => (
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
            {/* finalStep routes */}
            <div
              onClick={() =>
                setSections((prevState) => ({
                  ...prevState,
                  finalStep: !prevState.finalStep,
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
                Final step
              </Typography>
              <Arrow
                className={`w-4 h-4 transition-all duration-300 ease-in-out ${
                  sections.finalStep ? "rotate-[270deg]" : "rotate-90"
                }`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                sections.finalStep ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              {finalStep.map((route, index) => (
                <SidebarLink key={index} data={route} />
              ))}
            </div>
            {/* additional resources routes */}
            <div
              onClick={() =>
                setSections((prevState) => ({
                  ...prevState,
                  additionalResources: !prevState.additionalResources,
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
                  sections.additionalResources ? "rotate-[270deg]" : "rotate-90"
                }`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out px-2 ${
                sections.additionalResources
                  ? "max-h-[500px] pb-4"
                  : "max-h-0 pb-0"
              }`}
            >
              {additionalResources.map((route, index) => (
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
