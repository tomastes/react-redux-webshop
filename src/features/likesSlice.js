import { createSlice } from "@reduxjs/toolkit";

export const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likes: [],
  },
  reducers: {
    addToLikes: (state, action) => {
      state.likes.push(action.payload);
    },
    removeFromLikes: () => {},
  },
});

export const { addToLikes, removeFromLikes } = likesSlice.actions;
// !selectors
export const selectLikes = (state) => state.likes.likes;
export default likesSlice.reducer;
