// react
import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";

// next js
import { useRouter } from "next/router";
import Link from "next/link";

// components
import Typography from "@src/components/Typography";
import { navRoutes } from "@src/routes";
import { textColor } from "@src/utils/colorUtils";
import { useThemeStore } from "@src/zustand_stores/Theme";
import UserGuide from "./UserGuide";

interface IProps {
  children?: ReactNode;
  usedInNavbar?: boolean;
  className?: string;
}

const NavLinks: React.FC<IProps> = ({ usedInNavbar = true, className }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { primaryColor, isFirstVisit } = useThemeStore((state) => state);

  useEffect(() => {
    if (isFirstVisit) {
      setIsModalOpen(true);
    }
  }, [isFirstVisit]);

  return (
    <div
      className={`flex gap-5 ${usedInNavbar ? "gap-5 items-center flex-row" : "flex-col items-start px-7 gap-3"} ${className}`}
    >
      {navRoutes.map((route) => (
        <Link href={route.url} key={route.url}>
          <Typography
            textTransform="first-letter-capital"
            variant="base"
            fontweight="medium"
            className={`${
              router.pathname === route.url
                ? textColor(primaryColor)
                : "text-black dark:text-white"
            }`}
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
      <UserGuide isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default NavLinks;
