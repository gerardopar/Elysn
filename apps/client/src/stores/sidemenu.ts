import { createStore } from "zustand-x";

type SideMenuState = {
  isExpanded: boolean;
};

export const sideMenuStore = createStore<SideMenuState>(
  {
    isExpanded: false,
  },
  {
    name: "side-menu",
    devtools: true,
    persist: true,
    mutative: true,
  }
).extendActions(({ set }) => ({
  setExpanded: (expanded: boolean) => {
    set("state", (draft) => {
      draft.isExpanded = expanded;
      return draft;
    });
  },
}));
