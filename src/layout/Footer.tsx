"use client";
// react
import { ReactNode } from "react";

// next js

// components
import { Typography } from "@/components/ui/typography";

interface IProps {
  children?: ReactNode;
}

const Footer: React.FC<IProps> = ({}) => {

  return (
    <footer
      className={`w-full flex items-center justify-between gap-4 flex-wrap px-5 py-8 ltr:pr-28 rtl:pl-28`}
    >
      <Typography variant="body-sm">
        CircuLearn © {new Date().getFullYear()}, All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
