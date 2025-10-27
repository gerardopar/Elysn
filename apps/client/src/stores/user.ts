import { createStore } from "zustand-x";

import { type UserInfo } from "firebase/auth";

type UserState = {
  user: Partial<UserInfo> | null;
  hydrated: boolean;
};

export const userStore = createStore<UserState>(
  {
    user: null,
    hydrated: false,
  },
  {
    name: "user",
    devtools: true,
    persist: true,
    mutative: true,
  }
).extendActions(({ set }) => ({
  setUser: (user: Partial<UserInfo> | null) => {
    set("state", (draft) => {
      draft.user = user;
      return draft;
    });
  },
  clearUser: () => {
    set("state", (draft) => {
      draft.user = null;
      draft.hydrated = false;
      return draft;
    });
  },
  updateUser: (user: Partial<UserInfo>) => {
    set("state", (draft) => {
      draft.user = { ...draft.user, ...user };
      return draft;
    });
  },
  setHydrated: (hydrated: boolean) => {
    set("state", (draft) => {
      draft.hydrated = hydrated;
      return draft;
    });
  },
}));

export const useCurrentUser = () => {
  const user = userStore.useTracked("user");
  return { user, isLoggedIn: !!user };
};
