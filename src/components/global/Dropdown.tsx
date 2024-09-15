// react
import React, { ReactNode } from "react";

// next js
import { useRouter } from "next/router";

// tailwind merge in order to merge added classes
import { twMerge } from "tailwind-merge";

// hooks
import useComponentVisible from "@src/hooks/useComponentVisible";

// components
import { useThemeStore } from "@src/zustand_stores/Theme";
import Paper from "../Paper";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  dropdownModal: ReactNode;
}

const Dropdown: React.FC<IProps> = (props) => {
  const router = useRouter();

  const { dropdownModal, children, className, ...rest } = props;
  const { isComponentVisible, ref, setIsComponentVisible } =
    useComponentVisible(false);

  console.log("asas", ref);
  return (
    <div
      className="relative z-[1]"
      ref={ref}
      onClick={() => setIsComponentVisible(true)}
    >
      {children}
      <Paper
        backgroundMode="modal-color"
        className={twMerge(
          `absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 dark:bg-gr_modal bg-backgroundLight dark:shadow-none shadow-box-shadow-black-md px-3 py-2 rounded-md ${
            isComponentVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          } transition-all duration-200 ease-in-out`,
          className
        )}
      >
        {dropdownModal}
      </Paper>
    </div>
  );
};

export default Dropdown;
