import { createSlice } from "@reduxjs/toolkit";

export const currentUserHandler = createSlice({
  name: "currentUser",
  initialState: { currentUser: "" },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserHandler.actions;

export const selectCurrentUser = (state) => state.currentUser.currentUser;

export default currentUserHandler.reducer;
