// react
import { ReactNode } from "react";

// next js
import { useRouter } from "next/router";

// zustand store
import { useThemeStore } from "@src/zustand_stores/Theme";

// components
import IconButton from "@src/components/IconButton";
import Tooltip from "@src/components/Tooltip";
import { BurgerMenu, Setting } from "@src/assets/icons";
import NavLinks from "./NavLinks";

interface IProps {
  children?: ReactNode;
  setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isComponentVisible: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<IProps> = ({
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
