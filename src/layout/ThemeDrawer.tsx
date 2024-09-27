// react
import React, { ReactNode, useEffect } from "react";

// next js
import { useRouter } from "next/router";

// i18next

// utils
import { bgGradient } from "@src/utils/colorUtils";

// icons
import {
  Close,
  ColorPalette,
  Nightmode,
  FullScreen,
  FullScreenExit,
} from "@src/assets/icons";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// types
import { IColor } from "@src/@types/color";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";
import IconButton from "@src/components/IconButton";
import Divider from "@src/components/Divider";
import Switch from "@src/components/Switch";
import LayoutIcon from "@src/components/global/LayoutIcon";
import { enterFullscreen, exitFullscreen } from "@src/utils/fullscreen";
import useMediaQuery from "@src/hooks/useMediaQuery";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: ReactNode;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isComponentVisible: boolean;
}

const colors: Array<IColor> = ["blue", "green", "orange", "purple", "red"];

// @ts-ignore
const ThemeDrawer: React.FC<IProps> = React.forwardRef((props, ref) => {
  const router = useRouter();

  const {
    changeDarkMode,
    changePrimaryColor,
    changeSidebarBg,
    changeSidebarExpantion,
    sidebarExpand,
    fullscreen,
    setFullscreen,
    primaryColor,
    sidebarTransparent,
    darkMode,
  } = useThemeStore((state) => state);
  const windowWidth = useMediaQuery();

  const { setIsComponentVisible, isComponentVisible } = props;

  const handleFullscreenToggle = () => {
    if (fullscreen) {
      exitFullscreen();
      setFullscreen(false); // Update Zustand state
    } else {
      enterFullscreen(document.body);
      setFullscreen(true); // Update Zustand state
    }
  };

  // Handle fullscreen change via system or ESC
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreen(false);
      } else {
        setFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [setFullscreen]);

  useEffect(() => {
    if (windowWidth < 767) {
      changeSidebarBg(false);
    }
  }, [windowWidth]);

  return (
    <>
      <div
        ref={ref}
        className={`max-w-[300px] fixed top-0 ltr:right-0 ltr:left-unset rtl:left-0 rtl:right-unset md:min-w-[350px] h-screen flex flex-col overflow-y-auto p-6 dark:bg-gr_card_dark dark:bg-transparent bg-backgroundLight dark:shadow-none shadow-box-shadow-black-md z-[11] backdrop-blur-xl ${
          isComponentVisible
            ? "lrt:translate-x-0 rtl:-translate-x-0 opacity-100"
            : "ltr:translate-x-[100%] rtl:-translate-x-[100%] opacity-0"
        } transition-all ease-in`}
      >
        <div className="flex justify-between">
          {/* title and close button */}
          <div className="flex flex-col">
            <Typography variant="h4" fontweight="bold">
              Theme Configurator
            </Typography>
            <Typography variant="body1">
              Transform the theme to suit your unique style.
            </Typography>
          </div>
          <IconButton
            onClick={() => setIsComponentVisible((prevState) => !prevState)}
            className="p-2 self-start"
            aria-label="Close theme configurator"
          >
            <Close className="w-9 h-9 dark:text-customGray text-black" />
          </IconButton>
        </div>
        <Divider className="my-5" darkcolor={!darkMode} />
        {/* primary color section */}
        <div className="flex flex-col gap-2">
          <Typography variant="body1">Primary Color</Typography>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color, index) => (
              <IconButton
                aria-label={`Change primary color to ${color}`}
                className={`transition-all duration-200 ease-in-out border-2 border-solid min-w-[92px] min-h-[44px] ${
                  primaryColor === color
                    ? "dark:border-white border-black scale-110"
                    : "border-none"
                } ${bgGradient(color)}`}
                noScale
                onClick={() => changePrimaryColor(color)}
                key={index}
              >
                <ColorPalette className={`w-6 h-6 [&_path]:fill-white`} />
              </IconButton>
            ))}
          </div>
        </div>
        <Divider className="my-5" darkcolor={!darkMode} />

        {/* sidebar background option */}
        {windowWidth > 767 && (
          <>
            <div className="flex flex-col">
              <Typography variant="body1">Sidebar Type</Typography>
              <Typography variant="caption" color="gray">
                Choose between 2 different sidebar type.
              </Typography>
              <div className="flex items-center gap-2 w-full pt-3">
                <Button
                  aria-label="Change sidebar background to transparent"
                  onClick={() => changeSidebarBg(true)}
                  bgMode="gradient"
                  variant={sidebarTransparent ? "contained" : "bordered"}
                  className={`px-6 py-3 flex-1`}
                >
                  <Typography variant="caption">Transparent</Typography>
                </Button>
                <Button
                  aria-label="Change sidebar background to opaque"
                  onClick={() => changeSidebarBg(false)}
                  variant={!sidebarTransparent ? "contained" : "bordered"}
                  bgMode="gradient"
                  className={`px-6 py-3 flex-1`}
                >
                  <Typography variant="caption">Opague</Typography>
                </Button>
              </div>
            </div>
            <Divider className="my-5" darkcolor={!darkMode} />
          </>
        )}

        {/* sidebar expantion */}
        <div className="flex flex-col gap-2">
          <Typography variant="body1">Sidebar Expantion</Typography>
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-1">
              <LayoutIcon
                checked={!sidebarExpand}
                onChange={() => changeSidebarExpantion(false)}
                mode="collapse"
              />
              <Typography variant="caption2">Collapse</Typography>
            </div>
            <div className="flex flex-col items-center gap-1">
              <LayoutIcon
                checked={sidebarExpand}
                onChange={() => changeSidebarExpantion(true)}
                mode="expand"
              />
              <Typography variant="caption2">Expand</Typography>
            </div>
          </div>
        </div>
        <Divider className="my-5" darkcolor={!darkMode} />

        {/* dark mode section */}
        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2">
            <Nightmode className="w-10 h-w-10 dark:text-white text-black" />
            <Typography variant="body1">Dark Mode</Typography>
          </div>
          <Switch
            aria-label="Toggle dark mode"
            checked={darkMode}
            onChange={() => changeDarkMode()}
          />
        </div>
        <Divider className="my-5" darkcolor={!darkMode} />

        {/* Fullscreen Toggle (hidden on mobile/tablet) */}
        <div className="flex justify-between items-center smd:hidden">
          <Typography variant="body1">Full screen</Typography>
          <IconButton
            aria-label="Toggle fullscreen"
            onClick={handleFullscreenToggle}
          >
            {fullscreen ? (
              <FullScreenExit className="w-8 h-8 dark:text-white text-black" />
            ) : (
              <FullScreen className="w-8 h-8 dark:text-white text-black" />
            )}
          </IconButton>
        </div>
      </div>
    </>
  );
});

export default ThemeDrawer;
