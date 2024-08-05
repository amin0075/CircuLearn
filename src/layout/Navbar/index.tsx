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
import { useUserStore } from "@src/zustand_stores/user";

// routes
import { navRoutes, ROUTES_URL } from "@src/routes";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import IconButton from "@src/components/IconButton";
import Paper from "@src/components/Paper";
import Divider from "@src/components/Divider";
import Tooltip from "@src/components/Tooltip";
import { Close, Search, Setting } from "@src/assets/icons";
import Modal from "@src/components/Modal";

interface IProps {
  children?: ReactNode;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isComponentVisible: boolean;
}

const Navbar: React.FC<IProps> = ({
  isComponentVisible,
  setIsComponentVisible,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    primaryColor,
    hideSensitiveValue,
    changeHideSensitiveValue,
    sidebarExpand,
    darkMode,
  } = useThemeStore((state) => state);
  const { userState } = useUserStore((state) => state);

  return (
    <>
      {" "}
      <nav
        className={`${
          sidebarExpand ? " w-[calc(100%-318px)]" : " w-[calc(100%-190px)]"
        } transition-all duration-200 ease-in-out flex items-center justify-between p-3 px-5 h-[62px] backdrop-blur-xl fixed ltr:right-0 ltr:left-unset rtl:left-0 rtl:right-unset top-0 rounded-10 shadow-box-shadow-black-md bg-white/50 dark:bg-backgroundDark/60 mt-3 ltr:mr-5 rtl:ml-5 z-10`}
      >
        <div className="flex items-center gap-5">
          {navRoutes.map((route) => (
            <Link href={route.url} key={route.url}>
              <Typography
                textTransform="first-letter-capital"
                variant="base"
                fontweight="medium"
              >
                {route.name}
              </Typography>
            </Link>
          ))}
          <span
            className="cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Typography variant="base" fontweight="medium">
              User Guide
            </Typography>
          </span>
          {/* modal for user guide */}
          {isModalOpen && (
            <Modal className="max-w-[471px] relative" isOpen={isModalOpen}>
              <div className="flex flex-col gap-1 mt-4">
                <Typography variant="h4" className="text-center">
                  Welcome to CircuLearn!
                </Typography>
                <Typography variant="body2">
                  Discover and learn the fundamentals of logic circuits with my
                  interactive application. Here's a quick overview to help you
                  navigate and make the most out of your experience:
                </Typography>
                {/* main navigation */}
                <Typography variant="body2" fontweight="semiBold">
                  Main Navigation:
                </Typography>
                <ul className="flex flex-col list-disc pl-4">
                  <li>
                    <Typography variant="caption">
                      Use the sidebar or top menu to explore sections like Basic
                      Concepts, Gates, and Quiz.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption">
                      Click on each section for detailed content and interactive
                      elements.
                    </Typography>
                  </li>
                </ul>

                {/* interactive features */}
                <Typography variant="body2" fontweight="semiBold">
                  Interactive Features:
                </Typography>
                <ul className="flex flex-col list-disc pl-4">
                  <li>
                    <Typography variant="caption">
                      Simulations: Engage with circuit simulations by toggling
                      switches and observing outputs.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="caption">
                      Quizzes: Test your knowledge at the end of each section
                      with multiple-choice and interactive questions.
                    </Typography>
                  </li>
                </ul>

                {/* feedback & evaluation */}
                <Typography variant="body2" fontweight="semiBold">
                  Feedback and Evaluation:{" "}
                </Typography>
                <Typography variant="caption">
                  Participate in the final evaluation to share your thoughts and
                  help me improve the app. Your feedback is anonymous.
                </Typography>

                {/* help section */}
                <Typography variant="body2" fontweight="semiBold">
                  Need Help?
                </Typography>
                <Typography variant="caption">
                  For any questions or issues, contact me at{" "}
                  <Link href="#" className="underline">
                    2314378@chester.ac.uk
                  </Link>{" "}
                  .
                </Typography>
                <Button
                  variant="contained"
                  className="max-w-[140px] self-center mt-3"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  <Typography className="text-white" variant="body2">
                    Close
                  </Typography>
                </Button>
              </div>
              <IconButton
                onClick={() => {
                  setIsModalOpen(false);
                }}
                className="absolute top-2 right-2 p-0"
              >
                <Close className="w-8 h-8" />
              </IconButton>
            </Modal>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* search button */}
          <Tooltip className="whitespace-nowrap" title="search">
            <IconButton
              className={`p-1 group dark:text-white text-black`}
              borderRadius="full"
            >
              <Search className="w-7 h-7 group-hover:scale-110 transition-all duration-500 ease-in-out" />
            </IconButton>
          </Tooltip>
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
