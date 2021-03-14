import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    shippingAdress: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    setShippingInfo: (state, action) => {
      state.shippingAdress = action.payload;
    },
  },
});

export const { login, logout, setShippingInfo } = userSlice.actions;
// !selectors
export const selectUser = (state) => state.user.user;
export const selectShippingAdress = (state) => state.user.shippingAdress;

export default userSlice.reducer;
