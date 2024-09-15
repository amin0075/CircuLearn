// react
import React, { ReactNode } from "react";

// next js
import { useRouter } from "next/router";
import Typography from "@src/components/Typography";
import { useThemeStore } from "@src/zustand_stores/Theme";
import { bgColor } from "@src/utils/colorUtils";

interface IProps {
  children?: ReactNode;
  isBot?: boolean;
  message: string;
}

const MessageBox: React.FC<IProps> = ({ isBot = false, message }) => {
  const { primaryColor } = useThemeStore((state) => state);

  return (
    <div
      className={`flex w-full ${isBot ? "bg-gray-200 self-start" : `self-end ${bgColor(primaryColor)}`} rounded-lg w-[230px] p-3 relative`}
    >
      <div
        className={`${
          isBot
            ? "bg-gray-200 left-3 right-unset"
            : `${bgColor(primaryColor)} left-unset right-3`
        } w-6 h-6 absolute bottom-0 transform rotate-45`}
      />
      <Typography
        variant="body2"
        className={`${isBot ? "text-black dark:text-black" : "text-white"} whitespace-pre-wrap`}
      >
        {message}
      </Typography>
    </div>
  );
};

export default MessageBox;
