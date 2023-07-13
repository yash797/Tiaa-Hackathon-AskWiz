import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userSlice";
import filterReducer from "../feature/filterSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
  },
});




