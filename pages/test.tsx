import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
// import { useUserStore } from "@src/zustand_stores/user";
import { NextPage, GetServerSidePropsContext } from "next";
import Image from "next/image";
// constants
// import { userType } from '@src/constants/user';
import useMediaQuery from "@src/hooks/useMediaQuery";

// utils
import { ssrAuthHandler } from "@src/utils/ssrAuthHandler";
import { notify } from "@src/utils/notify";
import { useRouter } from "next/router";
interface IProps {
  forceLogout: boolean;
  data: string;
}

interface spaceX {
  name: string;
  links: {
    patch: {
      large: string;
    };
  };
}

const getSpaceXData = async () => await (await axios.get("/an/aasas")).data;

const Test: NextPage<IProps> = ({ forceLogout, data }) => {
  // const { logoutUser, changeUserState, userState } = useUserStore(
  //   (state) => state
  // );
  const router = useRouter();

  const windowWidth = useMediaQuery();
  console.log(windowWidth);

  // const {
  //   data: spacexData,
  //   status,
  //   error,
  // } = useQuery<spaceX>("spaceX", getSpaceXData);

  // console.log("spacexData:", spacexData);
  // console.log("error:", error);
  return (
    // <div>
    //   <img src="https://www.countryflagicons.com/FLAT/64/DE.png"></img>
    //   {data}
    //   {forceLogout && <h2>you are unauthorized</h2>}
    //   <h1>token: {Cookies.get("token")}</h1>
    //   <p>user info: {JSON.stringify(userState)}</p>
    //   {spacexData?.name}
    //   {spacexData?.links.patch.large && (
    //     <img
    //       src={spacexData?.links.patch.large}
    //       alt="asas"
    //       width={500}
    //       height={500}
    //     />
    //   )}
    //   <button
    //     onClick={async () => {
    //       // changeUserState(userType.helper);
    //       Cookies.set("token", "abcd");
    //       notify({
    //         message: "welcome",
    //         router,
    //         type: "success",
    //         position: "bottom-left",
    //       });
    //     }}
    //   >
    //     login
    //   </button>
    //   <br />
    //   <button
    //     onClick={() => {
    //       // logoutUser();
    //       Cookies.remove("token");
    //     }}
    //   >
    //     logout
    //   </button>
    //   <br />
    //   <button
    //     onClick={async () => {
    //       await axios.post("/api/hello");
    //     }}
    //   >
    //     random req
    //   </button>
    //   {/* <ToastContainer /> */}
    // </div>
    <></>
  );
};

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const queryClient = new QueryClient();
//   await queryClient.fetchQuery<spaceX>('spaceX', getSpaceXData);
//   return ssrAuthHandler({
//     ctx,
//     props: { dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) },
//     forceLogout: false,
//   });
// };

export default Test;
