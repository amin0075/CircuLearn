import { ROUTES_URL } from "@src/routes";
import { GetServerSidePropsContext } from "next";

export const ssrAuthHandler = ({
  ctx,
  props,
  forceLogout = false,
}: {
  ctx: GetServerSidePropsContext;
  props: object;
  forceLogout?: boolean;
}) => {
  if (!ctx.req.cookies.token) {
    if (ctx.resolvedUrl.includes("/user")) {
      return {
        redirect: {
          permanent: false,
          // destination: `${ROUTES_URL.authRoutes.login}?forceLogout=1`,
        },
      };
    }
    return {
      props: {
        forceLogout: true,
        ...props,
      },
    };
  }
  if (forceLogout && ctx.resolvedUrl.includes("/user")) {
    return {
      redirect: {
        permanent: false,
        // destination: `${ROUTES_URL.authRoutes.login}?forceLogout=1`,
      },
    };
  }
  return {
    props: {
      forceLogout,
      ...props,
    },
  };
};
