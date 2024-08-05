import React, { ComponentType, useCallback, useEffect, useMemo } from "react";
import axios, { AxiosError } from "axios";
import { NextRouter, useRouter } from "next/router";
import Cookies from "js-cookie";

// zustand store
import { useUserStore } from "@src/zustand_stores/user";

// utils
import { notify } from "@src/utils/notify";

import { NextPage } from "next";
import { ROUTES_URL } from "@src/routes";

const setAxiosDefault = (router: NextRouter, logoutUser: () => void) => {
  axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_DOMAIN_API_PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN_API}`;
  axios.interceptors.request.use(
    async (config) => {
      const token = Cookies.get("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: any) => {
      if (error.isAxiosError && error.response?.status === 403) {
        Cookies.remove("token");
        logoutUser();
        notify({
          message: error?.response?.data?.error?.message,
          router: router,
          type: "error",
        });
        if (router.pathname.includes("/user")) {
          // router.push(ROUTES_URL.authRoutes.login);
        }
        throw { error };
      }
      if (error.isAxiosError && error.response?.status === 401) {
        notify({
          message: error?.response?.data?.error?.message,
          router: router,
          type: "error",
        });
        throw { error };
      }
      if (error.isAxiosError && error.response?.status === 500) {
        throw { error };
      }
      throw error;
    }
  );
};

interface IProps {
  pageProps: {
    forceLogout: boolean;
  };
}

export const withAuth = (WrappedComponent: ComponentType<any>) => {
  const AuthWrapper = (props: IProps) => {
    const router = useRouter();
    const { forceLogout } = props.pageProps;
    const { logoutUser, userState } = useUserStore((state) => state);
    setAxiosDefault(router, logoutUser);

    useEffect(() => {
      if (
        forceLogout ||
        (router.query["forceLogout"] && +router.query["forceLogout"] === 1)
      ) {
        if (userState || Cookies.get("token")) {
          logoutUser();
          Cookies.remove("token");
        }
        if (router.pathname.includes("/user")) {
          // router.push(ROUTES_URL.authRoutes.login);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceLogout, logoutUser, router]);

    useEffect(() => {
      if (router.pathname.includes("/user") && !Cookies.get("token")) {
        // router.push(ROUTES_URL.authRoutes.login);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
  return AuthWrapper;
};
