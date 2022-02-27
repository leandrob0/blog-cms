import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = JSON.parse(localStorage.getItem("userCMS")) || {
  username: "",
  admin: false,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("userCMS");
      state.value = {
        username: "",
        admin: false,
        token: "",
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
