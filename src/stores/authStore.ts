import { create } from "zustand";
import { getMeApi } from "../api/UserApi";

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  fetchMe: () => Promise<void>;
  // logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchMe: async () => {
    getMeApi()
    .then(res => {
      set({user: res, loading: false})
    })
    .catch(e => {
      console.log("getConcertDetailApi fail!!");
      console.log(e);
    });
    // try {
    //   const res = await api.get<User>("/me");
    //   set({ user: res.data, loading: false });
    // } catch {
    //   set({ user: null, loading: false });
    // }
  },

  // logout: async () => {
  //   await api.post("/logout");
  //   set({ user: null });
  // },
}));
