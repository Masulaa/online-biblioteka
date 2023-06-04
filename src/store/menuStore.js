import { createSlice } from "@reduxjs/toolkit";

const initialMenuState = {
    isMenuOpen: false,
  };

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialMenuState,
  reducers: {
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
  },
});

  export const menuActions = menuSlice.actions;
  export default menuSlice.reducer;