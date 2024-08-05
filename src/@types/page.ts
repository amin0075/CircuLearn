import { NextPage } from "next";
import { ReactElement, ReactNode, ComponentType } from "react";

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};
