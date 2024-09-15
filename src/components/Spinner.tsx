import React from "react";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
}

const Spinner: React.FC<IProps> = ({ className }) => {
  const { primaryColor } = useThemeStore();

  return (
    <div role="status" className="flex items-center justify-center">
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className={twMerge(`inline w-8 h-8 animate-spin`, className)}
      >
        <g fill="#FFFFFF" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" />

          <path
            fill="#000000"
            d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Spinner;
