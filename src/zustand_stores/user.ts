// import create from "zustand";
// import { devtools, persist } from "zustand/middleware";

// // types
// import { IUser } from "@src/@types/user";

// interface BearState {
//   userState: IUser | null;
//   changeUserState: (userInfo: IUser) => void;
//   changeUserAvatar: (url: string) => void;
//   logoutUser: () => void;
// }

// const useUserStore = create<BearState>()(
//   devtools(
//     persist(
//       (set) => ({
//         userState: {
//           name: "Mahyar2",
//           phoneNumber: "+09129409232",
//           email: "malfarion.s.d@gmail.com",
//           country: "Iran",
//           whatsapp: null,
//           telegram: null,
//           referralCode: "malfarion.s.d-224844",
//           referrer: "dana.mahyar76-882756",
//           role: 2,
//           image: undefined,
//         },
//         changeUserState: (userInfo: IUser) =>
//           set((state) => ({ userState: userInfo })),
//         changeUserAvatar: (url: string) =>
//           set((state) => ({ userState: { ...state.userState!, image: url } })),
//         logoutUser: () => set((state) => ({ userState: null })),
//       }),
//       {
//         name: "user-storage",
//       }
//     )
//   )
// );

// export { useUserStore };
