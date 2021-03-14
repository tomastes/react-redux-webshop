import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import basketSlice from "../features/basketSlice";
import likesSlice from "../features/likesSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    basket: basketSlice,
    likes: likesSlice,
  },
});
