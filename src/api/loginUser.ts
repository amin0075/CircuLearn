// types
import { IUser } from "@src/@types/user";
import { IFormInputs } from "@pages/auth/login";
import { NextRouter } from "next/router";

// axios
import axios, { AxiosResponse } from "axios";

// utils
import { notify } from "@src/utils/notify";

// js-cookie
import Cookies from "js-cookie";

// routes
import { ROUTES_URL } from "@src/routes";

// luxon
import { DateTime } from "luxon";

export const loginUser = async (
  data: IFormInputs,
  changeUserState: (userInfo: IUser) => void,
  router: NextRouter
) => {
  const _data = {
    identifier: data.email,
    password: data.password,
  };
  console.log(_data);

  try {
    const { status, data: receivedData }: AxiosResponse = await axios.post(
      "/auth/local",
      _data
    );
    console.log("data:", receivedData, "status: ", status);
    if (status === 200) {
      //asas
    }
  } catch (error: any) {
    console.log(error);
    notify({
      message: error.response.data.error.message,
      router,
      type: "error",
    });
  }
};
