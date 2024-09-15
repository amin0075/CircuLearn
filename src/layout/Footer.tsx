// react
import { ReactNode } from "react";

// next js
import { useRouter } from "next/router";

// components
import Typography from "@src/components/Typography";

interface IProps {
  children?: ReactNode;
}

const Footer: React.FC<IProps> = ({}) => {
  const router = useRouter();

  return (
    <footer
      className={`w-full flex items-center justify-between gap-4 flex-wrap px-5 py-8 ltr:pr-28 rtl:pl-28`}
    >
      <Typography variant="body2">
        CircuLearn © {new Date().getFullYear()}, All Rights Reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
