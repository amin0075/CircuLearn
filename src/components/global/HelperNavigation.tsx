// react
import React, { ReactNode } from "react";

// next js
import Link from "next/link";

// components
import Typography from "@src/components/Typography";
import Button from "@src/components/Button";

interface IProps {
  children?: ReactNode;
  hasPrevious?: boolean;
  hasNext?: boolean;
  previousRoute?: string;
  previousRouteLabel?: string;
  NextRouteLabel?: string;
  nextRoute?: string;
}

const HelperNavigation: React.FC<IProps> = (props) => {
  const {
    hasPrevious = true,
    hasNext = true,
    previousRoute = "",
    previousRouteLabel = "",
    NextRouteLabel = "",
    nextRoute = "",
  } = props;

  return (
    <div
      className={`flex items-center gap-5  w-full max-w-lg mx-auto mt-6 ${!hasPrevious && hasNext ? "justify-end" : "justify-between"}`}
    >
      {hasPrevious && (
        <Link href={previousRoute}>
          <Button variant="contained">
            <Typography variant="body2">
              Previous: {previousRouteLabel}
            </Typography>
          </Button>
        </Link>
      )}

      {hasNext && (
        <Link href={nextRoute}>
          <Button variant="contained">
            <Typography variant="body2">Next: {NextRouteLabel}</Typography>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HelperNavigation;
