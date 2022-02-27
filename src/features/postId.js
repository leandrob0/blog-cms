import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = JSON.parse(localStorage.getItem("postIdCMS")) || { postId: "" };

export const postSlice = createSlice({
  name: "postId",
  initialState: { value: initialStateValue },
  reducers: {
    clickedPost: (state, action) => {
      state.value = action.payload;
    },
    resetClicked: (state) => {
      localStorage.removeItem("postIdCMS");
      state.value = { postId: "" };
    },
  },
});

export const { clickedPost, resetClicked } = postSlice.actions;
export default postSlice.reducer;
